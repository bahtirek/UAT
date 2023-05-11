import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ToasterService } from '../toaster.service';
import { Toast } from 'src/app/interfaces/toast.interface';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.less'],
  animations: [
    trigger('toasterState', [
      state('inactive', style({
        opacity: 0
      })),
      state('active', style({
        opacity: 1
      })),
      transition('inactive => active', animate('500ms ease-in')),
      transition('active => inactive', animate('500ms ease-out'))
    ])
  ]
})
export class ToasterComponent  {

  @Input() toast: Toast;
  @Input() i: number;

  @Output() remove = new EventEmitter<number>();

}

