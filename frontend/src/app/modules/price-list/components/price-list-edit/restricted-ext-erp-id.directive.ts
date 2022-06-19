import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { PriceListModel } from 'src/app/utilitis/models/priceListModel';
import { PriceListService } from 'src/app/utilitis/services/price-list-service/price-list.service';

@Directive({
  selector: '[appRestrictedExtErpId]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: RestrictedExtErpIdDirective,
      multi: true,
    },
  ],
})
export class RestrictedExtErpIdDirective implements Validator {
  priceLists!: PriceListModel[];
  constructor(private priceListService: PriceListService) {
//    here i would add a http post req with the value in he body and check it with the data base pricelistIDS
    this.priceLists = this.priceListService.getPriceLists();
  }

  validate(control: AbstractControl): { [key: string]: any } | null {
    const isValid = this.priceLists.findIndex(
      (priceList) => priceList.priceListID === control.value
    );
    return isValid >= 0
      ? {
          restricted:
            'Please make sure the value is not equal to any ot the Price List ID',
        }
      : null;
  }
}
