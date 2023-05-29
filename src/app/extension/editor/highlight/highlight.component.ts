import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EditorMenu } from 'src/app/interfaces/editor-menu.interface';
import { DragService } from 'src/app/services/drag.service';
import { HighlightService } from './highlight.service';

@Component({
  selector: 'app-highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.less']
})
export class HighlightComponent implements OnInit {
  uuid: string;

  editorMenu: EditorMenu = {
    color: true,
  }

  constructor(private dragService: DragService, private highlightService: HighlightService) { }

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
    this.highlightService.onDelete(this.uuid);
  }
  
  onColor(color: any){
    this.el.nativeElement.style.backgroundColor = color.color;
  }

}
