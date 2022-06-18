import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PriceListListComponent } from './components/price-list-list/price-list-list.component';

const routes: Routes = [{ path: '', component: PriceListListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PriceListRoutingModule {}
