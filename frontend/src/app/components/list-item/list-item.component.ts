import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @Input() value!: string | number;
  @Input() clickable!: boolean;

  @Output() listItemCLicked: EventEmitter<number | string> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onListItemClicked():void {
    if (this.clickable) {
      this.listItemCLicked.emit(this.value);
    }
  }
}
