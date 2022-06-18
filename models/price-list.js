export class PriceList{
   constructor(priceListID,priceListName,extErpPriceListID){
    this.priceListID=priceListID
    this.priceListName=priceListName
    this.extErpPriceListID= extErpPriceListID ||undefined
   }
}