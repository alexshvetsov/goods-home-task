import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { PriceListModel } from 'src/app/utilitis/models/priceListModel';

@Component({
  selector: 'app-price-list-edit',
  templateUrl: './price-list-edit.component.html',
  styleUrls: ['./price-list-edit.component.scss'],
})
export class PriceListEditComponent implements OnInit {
  @ViewChild('editForm') editForm!: NgForm;
  @Input() priceList!: PriceListModel;
  @Output() completedForm: EventEmitter<NgForm> = new EventEmitter();
  @Output() cancelEdit: EventEmitter<void> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  submitForm() {
    this.completedForm.emit(this.editForm!);
  }

  onCancelEdit() {
    this.cancelEdit.emit();
  }
}
