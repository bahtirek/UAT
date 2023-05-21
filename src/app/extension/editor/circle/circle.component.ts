import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EditorMenu } from 'src/app/interfaces/editor-menu.interface';
import { DragService } from 'src/app/services/drag.service';
import { CircleService } from './circle.service';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.less']
})
export class CircleComponent implements OnInit {

  uuid: string;
  editorMenu: EditorMenu = {
    color: true,
    stroke: true,
    fontSize: false,
    invert: false,
    borderStyle: true
  }

  constructor(private dragService: DragService, private circleService: CircleService) { }

  ngOnInit(): void {
  }

  @ViewChild('editingParent', {static: true}) parent!: ElementRef<HTMLDivElement>;
  @ViewChild('editingItem', {static: true}) el!: ElementRef<HTMLDivElement>;

  onMouseDown(event: MouseEvent) {
    const rect = this.parent.nativeElement.getBoundingClientRect();
    if(event.offsetX < rect.width - 16 && event.offsetY < rect.height - 16) {
      this.dragService.onMouseDown(event, this.parent.nativeElement);
    } 
  }

  onMouseUp(event: any) {
    const rect = this.parent.nativeElement.getBoundingClientRect();
    this.dragService.onMouseUp(event, this.parent.nativeElement);
  }

  onDelete(){
    this.circleService.onDelete(this.uuid);
  }

  strokeUpdate(stroke: any){
    this.el.nativeElement.style.borderWidth = stroke.width;
  }
  
  onColor(color: any){
    this.el.nativeElement.style.borderColor = color.color;
  }
  
  onBorder(style: string){
    this.el.nativeElement.style.borderStyle = style;
  }

}
