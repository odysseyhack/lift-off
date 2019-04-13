// FARMER creates/has account A
// CARRIER creates/has account B
// EXPORTER creates/has account C

// Contract: 
// 1) A and B make a contract.
// 2) A sets a secure key.
// 3) C puts in a value, now a fair share to B paid for its work (driving) and the money is transfered to A.
// 4) A can check with the given keyhash (some key + amount) of B if the negotiated price is deposited by C.
// 5) A can withdraw money if satellite images show no deforestation.

pragma solidity 0.4.25;

contract SecureSilviCulture {
    address public beneficiary;
    address public funder;
    address public carrier;
    string public good;
    uint public amount; 
    uint private value;
    uint private value_carrier;
    uint private balance;
    uint private balance_carrier;
    uint256 private keyhash;
    uint256 private return_keyhash;
    string private key;

    mapping(address => uint) satellite_check;
    mapping(address => Transaction) transactions;
    address[] public transactionhistory; 
    
   struct Transaction {
       //address msg.transaction;
       address funder;
       string good;
       uint amount;
       uint256 keyhash;
       string status;
   }
   
    constructor(
            address _beneficiary,
            address _carrier,
            string _key
        ) public {
            beneficiary = _beneficiary;
            carrier = _carrier;
            key = _key;
    }
    
    function storeTransaction(address _funder, string _good, uint _amount, uint256 _keyhash, string _status) public {
        Transaction storage txn = transactions[_funder];
        txn.good = _good;
        txn.amount = _amount;
        txn.keyhash = _keyhash;
        txn.status = _status;
        transactionhistory.push(_funder) -1;
    }
    
    function getTransactions() view public returns(address[]){
        return transactionhistory;
    }
    
    function getTransaction(address _funder) view public returns(string, uint, uint256, string){
        return(transactions[_funder].good, transactions[_funder].amount, transactions[_funder].keyhash, transactions[_funder].status);
    }

    function confirmTransaction(uint256 _keyhash, string _good) public payable returns(uint _amount, uint _amount_carrier, uint256 _return_keyhash){
        require(bytes(key).length > 0, "Beneficiary key not yet set.");
        require(msg.value > 0, "Value must be greater than zero");
        require(_keyhash == uint256(keccak256(amount, key)), "Provided values dont match keyhash");
        return_keyhash = uint256(keccak256(key, amount));
        storeTransaction(msg.sender, _good, amount, _keyhash, "confirmed");
        funder = msg.sender;
        value_carrier = msg.value / 10;
        value = msg.value - value_carrier;
        balance += value;
        balance_carrier += value_carrier;
        return (value, value_carrier, return_keyhash);
    }

    function withdrawBeneficiary(uint _value) public {
        require(msg.sender == beneficiary, "Sender not authorized.");
        require(balance >= _value, "Insufficient funds");
        require(satellite_check[msg.sender] > 0, "Waiting for satellite validation");
        if (bytes32(_value).length == 0) {
            beneficiary.transfer(balance);
            balance == 0;
        }
        else {
            beneficiary.transfer(_value);
            balance -= _value;
        }
    }
    
    function withdrawCarrier(uint _value) public{
        require(msg.sender == carrier, "Sender not authorized.");
        require(balance_carrier >= _value, "Insufficient funds");
        if (bytes32(_value).length == 0) {
            carrier.transfer(balance_carrier);
            balance_carrier == 0;
        }
        else {
            carrier.transfer(_value);
            balance_carrier -= _value;
        }
    }
    
    function getBalanceBeneficiary() view public returns(uint){
        return balance;
    }
    
    function getBalanceCarrier() view public returns(uint){
        return balance_carrier;
    }
    
    function satelliteCheck(address _beneficiary) public{
        // SET TIMER
        require(msg.sender == 0x00ca35b7d915458ef540ade6068dfe2f44e8fa733c, "Sender not authorized.");
        satellite_check[_beneficiary] += 1;
    }
    
    function editKey(string _key) public returns(bool){
        require(msg.sender == beneficiary, "Sender not authorized.");
        key = _key;
        return true;
    }
    
    function getKeyhash(uint _amount) public returns(uint256 _keyhash){
        require(bytes32(_amount).length > 0, "Invalid amount");
        keyhash = uint256(keccak256(_amount, key));
        amount = _amount;
        return (keyhash);
    }

    function getReturnKeyhash(uint _amount) public returns (uint256 _return_keyhash){
        require(msg.sender == beneficiary, "Sender not authorized.");
        keyhash = uint256(keccak256(key, _amount));
        return (_return_keyhash);
    }
    
    function checkKeyhash(uint _amount, uint256 _keyhash) view public returns(bool){
        if (bytes32(_keyhash).length == 0){
            require(keyhash == uint256(keccak256(_amount, key)), "Provided values dont match keyhash");
            return true;
        }
        else{
            require(_keyhash == uint256(keccak256(_amount, key)), "Provided values dont match internal keyhash");
            return true;
        }
    }

    function checkReturnKeyhash(string _key, uint _amount, uint256 _return_keyhash) view public returns(bool){
        if (bytes32(_return_keyhash).length == 0){
            require(return_keyhash == uint256(keccak256(_key, _amount)), "Provided values dont match keyhash");
            return true;
        }
        else{
            require(_return_keyhash == uint256(keccak256(_key, _amount)), "Provided values dont match internal keyhash");
            return true;
        }
    }
}