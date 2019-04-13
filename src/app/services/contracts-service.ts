import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Contract} from '../model/contract';
import {AppTruffleService} from "./app-truffle-service";

const STORAGE_KEY = 'contractsKey';

// TODO: fix proper indexing

@Injectable()
export class ContractsService {

    constructor(public storage: Storage,
                private appTruffleService: AppTruffleService) { }


    addContract(contract: Contract) {

        this.appTruffleService.createNewContract(contract);
        // .then(
        //     rs => {console.log(rs)}
        // );


        // return this.getAllContracts().then(result => {
        //     if (result) {
        //         result.push(contract);
        //         return this.storage.set(STORAGE_KEY, result);
        //     } else {
        //         return this.storage.set(STORAGE_KEY, [contract]);
        //     }
        // });
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
