export interface Transaction {

    name: string;
    type?: string;
    contractId?: string;
    asset: any;
    amount: string;
    date: Date;
    hash: string;
}
