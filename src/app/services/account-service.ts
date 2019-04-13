import { Injectable } from '@angular/core';
import {Account} from '../model/account';

@Injectable()
export class AccountService {

    constructor() { }

    public getAccount(): Account {
        return {
            name: 'Mr. Y',
            role: 'Tapper',
            address: '0x0ef16B1E0B80934b4E9fC6d51a3c08b2c2177CCA'
        };
    }
}
