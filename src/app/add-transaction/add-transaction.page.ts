import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../services/account-service';
import {Transaction} from '../model/transaction';
import {TransactionsService} from '../services/transactions-service';

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

  constructor(private transactionsService: TransactionsService,
              private formBuilder: FormBuilder,
              public route: ActivatedRoute,
              public router: Router) { }

  ngOnInit() {

    this.contractForm = this.formBuilder.group({
      name : [null], amount: [null], asset: [null], hash: [null]
    });
  }

  onFormSubmit(form: NgForm) {

  const transaction: Transaction = { name: form['name'],
    date: new Date(), amount: form['amount'], asset: form['asset'], hash: form['hash'] };
    this.transactionsService.addTransaction(transaction);
    this.router.navigate([ 'transactions' ]);
  }

}
