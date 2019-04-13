import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Transaction} from '../model/transaction';
import {TransactionsService} from '../services/transactions-service';

@Component({
  selector: 'app-transactions',
  templateUrl: 'transactions.page.html',
  styleUrls: ['transactions.page.scss']
})
export class TransactionsPage implements OnInit {

  public transactions: Transaction[];
  constructor(private transactionsService: TransactionsService,
              public route: ActivatedRoute,
              public router: Router
              ) {}

  ngOnInit() {
    this.transactionsService.getAllTransactions().then(rs => this.transactions = this.transactions = rs );
  }

  delete(id) {
    this.transactionsService.deleteTransaction(id);
    this.router.navigate( [ '/transactions']);
  }
}
