import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less']
})
export class ModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() propClass = '';

  @Output() closeModal = new EventEmitter<boolean>()

  onCloseBtnClick(){
    this.closeModal.emit(false);
  }

}
