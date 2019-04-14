import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Contract} from '../model/contract';

const STORAGE_KEY = 'contractsKey2';

@Injectable()
export class ContractsService {

    constructor(public storage: Storage) { }


    addContract(contract: Contract) {
        this.storage.get(STORAGE_KEY).then(result => {
            if (result) {
                result[contract.id] = contract;
                return this.storage.set(STORAGE_KEY, result);
            } else {
                const container = {};
                container[contract.id] = contract;
                return this.storage.set(STORAGE_KEY, container);
            }
        });
    }

    deleteContract(id) {
        this.storage.get(STORAGE_KEY).then(result => {
            delete result[id];
            return this.storage.set(STORAGE_KEY, result);
        });
    }

    getAllContracts() {
        return this.storage.get(STORAGE_KEY);
    }

}
