import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { PriceListModel } from '../../models/priceListModel';

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

  baseUrl: string = 'http://localhost:5000/price-list';

  priceListsByKey$: BehaviorSubject<PriceListsByKey> =
    new BehaviorSubject<PriceListsByKey>({
      priceListName: [],
      extErpPriceListID: [],
      priceListID: [],
    });

  constructor(private httpClient: HttpClient) {}

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

}
