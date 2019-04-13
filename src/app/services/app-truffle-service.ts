import { Injectable } from '@angular/core';
import Web3 from 'web3';
var contract = require("truffle-contract");

// @ts-ignore
import * as secureSilviCulture   from '../../../build/contracts/SecureSilviCulture.json';
import {Contract} from "../model/contract";
import {AccountService} from "./account-service";

@Injectable()
export class AppTruffleService {

    private web_3: any;
    private web3Provider: any;
    private contracts: any;

    constructor(private accountService: AccountService) {
        //this.initWeb3();
    }

    public initWeb3() {
        // Specify default instance if no web3 instance provided
        this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        this.web_3 = new Web3(this.web3Provider);
        return this.initContract();
    }

    private initContract() {
        this.contracts = {};
        this.contracts.SecureSilviCulture = contract(secureSilviCulture['default']);
        this.contracts.contracts = [];

            // Connect provider to interact with contract
        this.contracts.SecureSilviCulture.setProvider(this.web3Provider);

        // this.listenForEvents();

        // return this.render();
    }

    // Listen for events emitted from the contract
    public listenForEvents() {
        this.contracts.Election.deployed().then(function (instance) {
            // Restart Chrome if you are unable to receive this event
            // This is a known issue with Metamask
            // https://github.com/MetaMask/metamask-extension/issues/2393
            instance.votedEvent({}, {
                fromBlock: 0,
                toBlock: 'latest'
            }).watch(function (error, event) {
                console.log("event triggered", event)
                // Reload when a new vote is recorded
                // this.render();
            });
        });
    }

    // public render() {
    //     var electionInstance;
    //     var loader = $("#loader");
    //     var content = $("#content");
    //
    //     loader.show();
    //     content.hide();
    //
    //     // Load account data
    //     this.web_3.eth.getCoinbase(function (err, account) {
    //         if (err === null) {
    //             App.account = account;
    //             // $("#accountAddress").html("Your Account: " + account);
    //         }
    //     });
    //
    //     // Load contract data
    //     this.contracts.Election.deployed().then(function (instance) {
    //         electionInstance = instance;
    //         return electionInstance.candidatesCount();
    //     }).then(function (candidatesCount) {
    //         var candidatesResults = $("#candidatesResults");
    //         candidatesResults.empty();
    //
    //         var candidatesSelect = $('#candidatesSelect');
    //         candidatesSelect.empty();
    //
    //         for (var i = 1; i <= candidatesCount; i++) {
    //             electionInstance.candidates(i).then(function (candidate) {
    //                 var id = candidate[0];
    //                 var name = candidate[1];
    //                 var voteCount = candidate[2];
    //
    //                 // Render candidate Result
    //                 var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
    //                 candidatesResults.append(candidateTemplate);
    //
    //                 // Render candidate ballot option
    //                 var candidateOption = "<option value='" + id + "' >" + name + "</ option>"
    //                 candidatesSelect.append(candidateOption);
    //             });
    //         }
    //         return electionInstance.voters(App.account);
    //     }).then(function (hasVoted) {
    //         // Do not allow a user to vote
    //         if (hasVoted) {
    //             $('form').hide();
    //         }
    //         loader.hide();
    //         content.show();
    //     }).catch(function (error) {
    //         console.warn(error);
    //     });
    // }
    //
    // public castVote() {
    //     var candidateId = $('#candidatesSelect').val();
    //     this.contracts.Election.deployed().then(function (instance) {
    //         return instance.vote(candidateId, {from: App.account});
    //     }).then(function (result) {
    //         // Wait for votes to update
    //         $("#content").hide();
    //         $("#loader").show();
    //     }).catch(function (err) {
    //         console.error(err);
    //     });
    // }

    public createNewContract(contract: Contract) { // : Promise<any>
        const account = this.accountService.getAccount();
        const contractParams = {
            carrier: '0x78AB57D0C18E1914d2574276d63421EC8Ef2aAde', // contract.to,
            beneficiary: account.address,
            key: contract.password
        };
        this.contracts.SecureSilviCulture.new([contractParams.carrier,
            contractParams.carrier, contractParams.key]).then(rs => {
            this.contracts.contracts[contract.id] = rs.address;
        });
    }

    public fetchContract(contract: Contract) {
        this.contracts.SecureSilviCulture.at({address: contract.address}).then(rs => {
            this.contracts.contracts[contract.id] = rs;
        });
    }
}
