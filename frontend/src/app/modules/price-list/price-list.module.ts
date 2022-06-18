import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PriceListRoutingModule } from './price-list-routing.module';
import { PriceListListComponent } from './components/price-list-list/price-list-list.component';
import { PriceListEditComponent } from './components/price-list-edit/price-list-edit.component';
import { CoreModule } from '../core/core.module';
import { RestrictedExtErpIdDirective } from './components/price-list-edit/restricted-ext-erp-id.directive';

@NgModule({
  declarations: [
    PriceListListComponent,
    PriceListEditComponent,
    RestrictedExtErpIdDirective,
  ],
  imports: [CommonModule, PriceListRoutingModule, CoreModule],
})
export class PriceListModule {}
