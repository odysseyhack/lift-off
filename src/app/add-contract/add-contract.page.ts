import { Component, OnInit } from '@angular/core';
import {ContractsService} from '../services/contracts-service';
import {Contract} from '../model/contract';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../services/account-service';
import {AppTruffleService} from "../services/app-truffle-service";

@Component({
  selector: 'app-contract',
  templateUrl: './add-contract.page.html',
  styleUrls: ['./add-contract.page.scss'],
})
export class AddContractPage implements OnInit {

  public contractForm: FormGroup;
  public name: string;
  public to: string;
  public password: string;

  constructor(private contractsService: ContractsService,
              private formBuilder: FormBuilder,
              public route: ActivatedRoute,
              public router: Router,
              private accountService: AccountService,
              private appTruffleService: AppTruffleService) { }

  ngOnInit() {

    this.contractForm = this.formBuilder.group({
      'name' : [null], 'to': [null], 'password': [null]
    });
  }

  onFormSubmit(form: NgForm) {

    const contract: Contract = { id: '1', name: form[name],
      from: this.accountService.getAccount().address,
      to: form['to'],
      password: form['password']};

    this.appTruffleService.createNewContract(contract);
    this.router.navigate([ 'contracts' ]);
  }

}
