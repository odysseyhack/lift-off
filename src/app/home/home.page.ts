import {Component, OnInit} from '@angular/core';
import {AccountService} from '../services/account-service';
import {Account} from '../model/account';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public account: Account;

  constructor(private accountSerice: AccountService) {}

  ngOnInit() {
    this.account = this.accountSerice.getAccount();
  }

}
