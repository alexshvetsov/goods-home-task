import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ListItemComponent } from 'src/app/components/list-item/list-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListItemComponent],
  imports: [CommonModule, FlexLayoutModule, ReactiveFormsModule, FormsModule],
  exports: [
    ListItemComponent,
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class CoreModule {}
