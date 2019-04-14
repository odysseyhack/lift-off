import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Contract} from '../model/contract';

const STORAGE_KEY = 'contractsKey';

@Injectable()
export class ContractsService {

    constructor(public storage: Storage) { }


    addContract(contract: Contract) {
        return this.getAllContracts().then(result => {
            if (result) {
                result.push(contract);
                return this.storage.set(STORAGE_KEY, result);
            } else {
                return this.storage.set(STORAGE_KEY, [contract]);
            }
        });
    }

    deleteContract(id) {
        return this.getAllContracts().then(result => {
            if (result) {
                result.splice(id, 1);
                return this.storage.set(STORAGE_KEY, result);
            }
        });
    }

    getAllContracts() {
        return this.storage.get(STORAGE_KEY);
    }

}
