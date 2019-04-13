import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Transaction } from '../model/transaction';

const STORAGE_KEY = 'transactionsKey';

// TODO: fix proper indexing

@Injectable()
export class TransactionsService {

    constructor(public storage: Storage) { }


    addTransaction(transaction: Transaction) {
        return this.getAllTransactions().then(result => {
            if (result) {
                result.push(transaction);
                return this.storage.set(STORAGE_KEY, result);
            } else {
                return this.storage.set(STORAGE_KEY, [transaction]);
            }
        });
    }

    deleteTransaction(id) {
        return this.getAllTransactions().then(result => {
            if (result) {
                result.splice(id, 1);
                return this.storage.set(STORAGE_KEY, result);
            }
        });
    }

    getAllTransactions() {
        return this.storage.get(STORAGE_KEY);
    }

}
