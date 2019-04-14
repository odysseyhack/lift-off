import { Component, OnInit } from '@angular/core';
import {ContractsService} from '../services/contracts-service';
import {Contract} from '../model/contract';
import { FormBuilder } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../services/account-service';
import {AppTruffleService} from "../services/app-truffle-service";

@Component({
  selector: 'app-contract',
  templateUrl: './contract.page.html',
  styleUrls: ['./contract.page.scss'],
})
export class ContractPage implements OnInit {

  public contract: Contract;

  constructor(private contractsService: ContractsService,
              private formBuilder: FormBuilder,
              public route: ActivatedRoute,
              public router: Router,
              private accountService: AccountService,
              private appTruffleService: AppTruffleService) { }

  ngOnInit() {
    this.contractsService.getAllContracts()
        .then((rs) => {
          this.contract = rs[this.route.snapshot.paramMap.get('id') ];
          this.appTruffleService.fetchContract(this.contract);
        });
  }

  public navigateTransaction() {
      this.router.navigate( [ '/addtransaction/' + this.contract.id]);
  }

}
