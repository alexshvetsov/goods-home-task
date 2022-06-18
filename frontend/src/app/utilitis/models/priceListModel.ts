export class PriceListModel{
    priceListID:number;
    priceListName:string;
    extErpPriceListID?:number|null;

    constructor(options:{priceListID:number,priceListName:string,extErpPriceListID?:number}){
        this.priceListID=options.priceListID
        this.priceListName=options.priceListName
        this.extErpPriceListID=options.extErpPriceListID || null
    }
}