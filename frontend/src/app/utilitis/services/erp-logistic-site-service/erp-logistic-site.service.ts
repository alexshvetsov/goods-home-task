import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErpLogisticSiteService {
  eRPCompanyIds: number[] = [1, 2, 3, 4, 5, 6];
  eRPCompanyIds$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([
    1, 2, 3, 5, 6,
  ]);

  constructor() {
    setTimeout(() => this.setERPCompanyIds([1]), 2000);
  }

  getErps(): number[] {
    return [...this.eRPCompanyIds];
  }

  getERPCompanyIdsAsObs(): Observable<number[]> {
    return this.eRPCompanyIds$.asObservable();
  }

  setERPCompanyIds(value: number[]): void {
    this.eRPCompanyIds$.next(value);
  }
}
