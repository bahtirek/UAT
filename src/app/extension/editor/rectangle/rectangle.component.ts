import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EditorMenu } from 'src/app/interfaces/editor-menu.interface';
import { DragService } from 'src/app/services/drag.service';
import { RectangleService } from './rectangle.service';

@Component({
  selector: 'app-rectangle',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.less']
})
export class RectangleComponent implements OnInit {

  uuid: string;
  editorMenu: EditorMenu = {
    color: true,
    stroke: true,
    fontSize: false,
    invert: false,
    borderStyle: true
  }

  constructor(private dragService: DragService, private rectangleService: RectangleService) { }

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
    this.rectangleService.onDelete(this.uuid);
  }

  strokeUpdate(stroke: any){
    this.el.nativeElement.style.borderWidth = stroke.width;
  }
  
  onColor(color: any){
    console.log(color);
    this.el.nativeElement.style.borderColor = color.color;
  }

  onBorder(style: string){
    this.el.nativeElement.style.borderStyle = style;
  }
}
