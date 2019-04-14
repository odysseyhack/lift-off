import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Transaction} from '../model/transaction';
import {TransactionsService} from '../services/transactions-service';
import {ContractsService} from "../services/contracts-service";
import {Contract} from "../model/contract";
import {AppTruffleService} from "../services/app-truffle-service";

@Component({
  selector: 'app-contract',
  templateUrl: './add-transaction.page.html',
  styleUrls: ['./add-transaction.page.scss'],
})
export class AddTransactionPage implements OnInit {

  public contractForm: FormGroup;
  public name: string;
  public amount: string;
  public asset: string;
  public hash: string;
  public contract: Contract;

  constructor(private transactionsService: TransactionsService,
              private formBuilder: FormBuilder,
              public route: ActivatedRoute,
              public router: Router,
              private contractsService: ContractsService,
              private appTruffleService: AppTruffleService) { }

  ngOnInit() {

    this.contractsService.getAllContracts()
        .then((rs) => {
          this.contract = rs[this.route.snapshot.paramMap.get('id') ];
        });

    this.contractForm = this.formBuilder.group({
      name : [null], amount: [null], asset: [null], quality: [null]
    });
  }

  onFormSubmit(form: NgForm) {

    const smartContract = this.appTruffleService.getContract(this.contract.id);

    const amount = this.appTruffleService.web_3.utils.toBN(form['amount']);
    smartContract.createKeyhash(amount, { from: this.contract.from }).then( rs => {
      console.log(rs);
      smartContract.getKeyhash().then(rs => {
        const keyhash = rs;
        const value = this.appTruffleService.web_3.utils.toBN(1000000000000000000);
        smartContract.confirmTransaction(keyhash, form['asset'], { from: this.contract.from, value: value }).then( rs => {
          console.log(rs);
          const valueWithDraw = this.appTruffleService.web_3.utils.toBN(100000000000);
          smartContract.withdrawCarrier(valueWithDraw, { from: '0x78AB57D0C18E1914d2574276d63421EC8Ef2aAde' }).then(rs => {
            console.log(rs);
          })
        })
      });
    });



    const transaction: Transaction = { name: form['name'],
      date: new Date(), amount: form['amount'], asset: form['asset'], hash: form['hash'] };

      this.transactionsService.addTransaction(transaction);
      this.router.navigate([ 'transactions' ]);
    }

}
