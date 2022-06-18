import { TestBed } from '@angular/core/testing';

import { ErpLogisticSiteService } from './erp-logistic-site.service';

describe('ErpLogisticSiteService', () => {
  let service: ErpLogisticSiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErpLogisticSiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
