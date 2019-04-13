import { Component, OnInit } from '@angular/core';
import {ContractsService} from '../services/contracts-service';
import {Contract} from '../model/contract';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-contracts',
  templateUrl: 'contracts.page.html',
  styleUrls: ['contracts.page.scss']
})
export class ContractsPage implements OnInit {

  public contracts: Contract[];
  constructor(private contractsService: ContractsService,
              public route: ActivatedRoute,
              public router: Router
              ) {}

  ngOnInit() {
    this.contractsService.getAllContracts().then(rs => this.contracts = rs );
  }


  navigateTo(id) {
    this.router.navigate( [ '/contract/' + id]);
  }

  delete(id) {
   this.contractsService.deleteContract(id);
    this.router.navigate( [ '/contracts']);
  }
}
