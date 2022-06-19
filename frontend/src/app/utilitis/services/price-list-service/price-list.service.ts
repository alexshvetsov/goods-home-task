import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { PriceListModel } from '../../models/priceListModel';
import {environment} from '../../../../environments/environment'

export interface PriceListsByKey {
  priceListID: number[];
  extErpPriceListID: any[];
  priceListName: string[];
}

@Injectable({
  providedIn: 'root',
})
export class PriceListService {
  priceLists!: PriceListModel[];

  baseUrl: string = `${environment.baseUrl}/price-list`;

  priceListsByKey$: BehaviorSubject<PriceListsByKey> =
    new BehaviorSubject<PriceListsByKey>({
      priceListName: [],
      extErpPriceListID: [],
      priceListID: [],
    });

  errorMsg$: BehaviorSubject<string>=new BehaviorSubject<string>('')

  constructor(
    private httpClient: HttpClient,
  ) {}

  getPriceListsAsObs(
    eRPCompanyIds: number[],
    searchTerm: string
  ): Observable<PriceListsByKey> {
    return this.httpClient
      .post<{ success: boolean; priceLists: PriceListModel[] }>(
        this.baseUrl,
        { eRPCompanyIds: eRPCompanyIds, searchTerm: searchTerm },
        {
          observe: 'body',
          headers: new HttpHeaders().append('Content-Type', 'application/json'),
        }
      )
      .pipe(
        map((priceLists) => {
          this.priceLists = priceLists.priceLists;
          const priceListsByKey = this.orderPriceListBykey(
            priceLists.priceLists
          );
          this.priceListsByKey$.next(priceListsByKey);
          this.setErrorMsg('');

          return priceListsByKey;
        })
      );
  }

  updatePriceList(newPriceList: PriceListModel) {
    this.httpClient
      .put<{ priceList: PriceListModel }>(
        `${this.baseUrl}/${newPriceList.priceListID}`,
        {
          newPriceList,
        }
      )
      .subscribe((newPriceList) => {
        let index = this.priceLists.findIndex(
          (priceList) =>
            priceList.priceListID === newPriceList.priceList.priceListID
        );

        this.priceLists.splice(index, 1, newPriceList.priceList);
        const priceListsByKey = this.orderPriceListBykey(this.priceLists);
        this.setErrorMsg('');

        this.priceListsByKey$.next(priceListsByKey);
      });
  }

  getPriceLists(): PriceListModel[] {
    return [...this.priceLists];
  }

 

  getPriceListToEdit(id: number): PriceListModel {
    return this.priceLists.find((priceList) => priceList.priceListID === id)!;
  }

  orderPriceListBykey(priceLists: PriceListModel[]): PriceListsByKey {
    
    let priceListsByKey: PriceListsByKey = {
      priceListName: [],
      extErpPriceListID: [],
      priceListID: [],
    };

    priceListsByKey = priceLists.reduce((pre, cur) => {
      pre.priceListName.push(cur.priceListName);
      pre.extErpPriceListID.push(cur.extErpPriceListID || null || undefined);
      pre.priceListID.push(cur.priceListID);
      return pre;
    }, priceListsByKey);
    return priceListsByKey;
  }
  
  getErrorMsg(): Observable<string> {
    return this.errorMsg$.asObservable();
  }
  setErrorMsg(value: string) {
    this.errorMsg$.next(value.toString());
  }
}
