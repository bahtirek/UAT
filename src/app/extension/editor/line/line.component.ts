import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EditorMenu } from 'src/app/interfaces/editor-menu.interface';
import { DragService } from 'src/app/services/drag.service';
import { LineService } from './line.service';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.less']
})
export class LineComponent implements OnInit {

  uuid: string;
  rotate: number = 0;
  side : string = '';

  editorMenu: EditorMenu = {
    color: true,
    stroke: true,
    fontSize: false,
    invert: false,
    rotate: true,
    arrow: true
  }

  constructor(private dragService: DragService, private lineService: LineService) { }

  ngOnInit(): void {
  }

  @ViewChild('editingParent', {static: true}) parent!: ElementRef<HTMLDivElement>;
  @ViewChild('editingItem', {static: true}) el!: ElementRef<HTMLDivElement>;
  @ViewChild('chevronRight', {static: true}) chevronRight!: ElementRef<HTMLDivElement>;
  @ViewChild('chevronLeft', {static: true}) chevronLeft!: ElementRef<HTMLDivElement>;
  @ViewChild('lineContainer', {static: true}) lineContainer!: ElementRef<HTMLDivElement>;

  onMouseDown(event: any) {
    const rect = this.parent.nativeElement.getBoundingClientRect();
    if(event.target.classList.contains("resize-element")) {
      if(event.offsetX < rect.width - 20 && event.offsetY < rect.height - 16) {
        this.dragService.onMouseDown(event, this.parent.nativeElement);
      } 
    }
  }

  onMouseUp(event: any) {
    const rect = this.parent.nativeElement.getBoundingClientRect();
    this.dragService.onMouseUp(event, this.parent.nativeElement);
  }

  onDelete(){
    this.lineService.onDelete(this.uuid);
  }

  strokeUpdate(stroke: any){
    this.el.nativeElement.style.height = stroke.width;
    this.chevronLeft.nativeElement.style.strokeWidth = stroke.width;
    this.chevronRight.nativeElement.style.strokeWidth = stroke.width;
  }
  
  onColor(color: any){
    console.log(color);
    
    this.el.nativeElement.style.backgroundColor = color.color;
    this.chevronRight.nativeElement.style.stroke = color.color;
    this.chevronLeft.nativeElement.style.stroke = color.color;
  }

  onRotate(to: string){
    this.rotate = to == 'right' ? this.rotate + 5 : this.rotate - 5;
    this.lineContainer.nativeElement.style.transform = `rotate(${this.rotate}deg)`; 
  }

  onArrow(side: string) {
    if(side == 'left' && this.side !="left"){
      this.chevronRight.nativeElement.style.display = 'none';
      this.chevronLeft.nativeElement.style.display = 'block';
      this.side = side;
    } else if(side == 'right' && this.side != 'right') {
      this.chevronRight.nativeElement.style.display = 'block';
      this.chevronLeft.nativeElement.style.display = 'none';
      this.side = side;
    } else {
      this.chevronRight.nativeElement.style.display = 'none';
      this.chevronLeft.nativeElement.style.display = 'none';
      this.side = '';
    }
  }

}
