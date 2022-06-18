import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'price-list',
    loadChildren: () =>
      import('./modules/price-list/price-list.module').then(
        (m) => m.PriceListModule
      ),
  },
  {
    path: '',
    redirectTo: 'price-list',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
