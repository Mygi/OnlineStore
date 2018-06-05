// 3rd party decorator
import { JsonObject, JsonProperty } from 'json2typescript';

export class BankServiceModel {
    @JsonProperty('bankID')
    bankID: number;

    @JsonProperty('name')
    name: string;
}

export class BanksData {
    @JsonProperty('data', [BankServiceModel])
    data: BankServiceModel[];
}

export class BankingServiceModel {
    @JsonProperty('bankAccountID')
    id: number;

    @JsonProperty('shopID')
    shopID: number;

    @JsonProperty('accountName')
    accountName: string;

    @JsonProperty('bsb')
    bsb: number;

    @JsonProperty('bank', {data: BankServiceModel} )
    bank: {data: BankServiceModel} = { data: new BankServiceModel() };

    @JsonProperty('accountNumber')
    accountNumber: number;
}
export class BankingServiceData {
    @JsonProperty('data', BankingServiceModel)
    data: BankingServiceModel;

}
export class Banking {
    @JsonProperty('id')
    id: number;

    @JsonProperty('shopId')
    shopId: number;

    @JsonProperty('accountName')
    accountName: string;

    @JsonProperty('bsb')
    bsb: number;

    // @JsonProperty('bankName')
    // bankName: string;

    @JsonProperty('bankID')
    bankID = 0;

    @JsonProperty('accountNumber')
    accountNumber: number;

    constructor() {}

    bridgeFrom(model: BankingServiceModel) {
        // console.log(model);
        this.id = model.id;
        this.shopId = model.shopID;
        this.accountName = model.accountName;
        this.accountNumber = model.accountNumber;
        this.bsb = model.bsb;
        // this.bankName = model.bank.data.name;
        if (model.bank !== undefined) {
            this.bankID = model.bank.data.bankID;
        } else {
            this.bankID = 0;
        }
    }
}
