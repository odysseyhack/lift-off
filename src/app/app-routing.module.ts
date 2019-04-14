import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'contracts',
    loadChildren: './contracts/contracts.module#ContractsPageModule'
  },
  { path: 'contract/:id', loadChildren: './contract/contract.module#ContractPageModule' }
  ,
  { path: 'addcontract', loadChildren: './add-contract/add-contract.module#AddContractPageModule' }
  ,
  {
    path: 'transactions',
    loadChildren: './transactions/transactions.module#TransactionsPageModule'
  },
  { path: 'addtransaction/:id', loadChildren: './add-transaction/add-transaction.module#AddTransactionPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
