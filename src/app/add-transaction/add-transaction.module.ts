import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddTransactionPage } from './add-transaction.page';

const routes: Routes = [
  {
    path: '',
    component: AddTransactionPage
  }
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CommonModule
  ],
  declarations: [AddTransactionPage]
})
export class AddTransactionPageModule {}
