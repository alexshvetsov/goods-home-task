import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  merge,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { ErrorHandlerInterceptor } from 'src/app/utilitis/interceptors/error-handler.interceptor';
import { PriceListModel } from 'src/app/utilitis/models/priceListModel';
import { ErpLogisticSiteService } from 'src/app/utilitis/services/erp-logistic-site-service/erp-logistic-site.service';
import {
  PriceListsByKey,
  PriceListService,
} from 'src/app/utilitis/services/price-list-service/price-list.service';

const EMPTY_QUERY_STRING = '';

@Component({
  selector: 'app-price-list-list',
  templateUrl: './price-list-list.component.html',
  styleUrls: ['./price-list-list.component.scss'],
})
export class PriceListListComponent implements OnInit {
  search: FormControl = new FormControl();
  priceListToEdit!: PriceListModel | undefined;
  eRPCompanyIds!: number[];
  priceLists$!: Observable<PriceListsByKey>;
  eRPCompanyIds$!: Observable<number[]>;
  errorMsg$!: Observable<string>;
  
  priceListHeadlines: { [key: string]: string } = {
    priceListID: 'Price List ID',
    extErpPriceListID: 'Ext Erp Price List ID',
    priceListName: 'Price List Name',
  };

  constructor(
    private priceListService: PriceListService,
    private ERPLogisticSiteService: ErpLogisticSiteService
  ) {}

  ngOnInit(): void {
    this.eRPCompanyIds = this.ERPLogisticSiteService.getErps();
    this.priceLists$ = this.initPriceLists();
    this.errorMsg$ = this.priceListService.getErrorMsg();
  }

  initPriceLists(): Observable<PriceListsByKey> {
    return merge(
      this.onSearchChanged(),
      this.priceListService.getPriceListsAsObs(this.eRPCompanyIds, EMPTY_QUERY_STRING),
      this.priceListService.priceListsByKey$,
      this.getERPCompanyIdsObs()
    );
  }

  getERPCompanyIdsObs(): Observable<PriceListsByKey> {
    return this.ERPLogisticSiteService.getERPCompanyIdsAsObs().pipe(
      switchMap((value) => this.priceListService.getPriceListsAsObs(value, EMPTY_QUERY_STRING))
    );
  }

  onSearchChanged(): Observable<PriceListsByKey> {
    return this.search.valueChanges.pipe(
      map((search) => search.trim()),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((search) => {
        return this.priceListService.getPriceListsAsObs(
          this.eRPCompanyIds,
          search
        );
      })
    );
  }

  onFormSubmitted(form: NgForm): void {
    const newPriceList = new PriceListModel({
      priceListID: this.priceListToEdit!.priceListID,
      priceListName: form.form.value.priceListName,
      extErpPriceListID: form.form.value.extErpPriceListID,
    });
    this.priceListToEdit = undefined;
    this.priceListService.updatePriceList(newPriceList);
  }

  onListItemClicked(priceListID: number): void {
    this.priceListToEdit =
      this.priceListService.getPriceListToEdit(priceListID);
  }

  onCancelEdit(): void {
    this.priceListToEdit = undefined;
  }
}
