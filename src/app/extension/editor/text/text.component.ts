import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EditorMenu } from 'src/app/interfaces/editor-menu.interface';
import { DragService } from 'src/app/services/drag.service';
import { TextService } from './text.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.less']
})
export class TextComponent implements OnInit {
  timeout: any;
  uuid: string;
  editorMenu: EditorMenu = {
    color: true,
    stroke: false,
    fontSize: true,
    invert: true
  }

  constructor(private dragService: DragService, private textService: TextService) { }

  ngOnInit(): void {
  }

  @ViewChild('editingParent', {static: true}) parent!: ElementRef<HTMLDivElement>;
  @ViewChild('editingItem', {static: true}) el!: ElementRef<HTMLDivElement>;

  onMouseDown(event: any) {
    const rect = this.parent.nativeElement.getBoundingClientRect();
    
    if(event.target.classList.contains("resize-element")) {
      if(event.offsetX < rect.width - 12 && event.offsetY < rect.height - 12) {
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.dragService.onMouseDown(event, this.parent.nativeElement);
        }, 200);
      }
    }
  }

  onMouseUp(event: any) {
    if (this.timeout) clearTimeout(this.timeout)
  }

  onDelete(){
    this.textService.onDelete(this.uuid);
  }

  fontSizeUpdate(fontSize: any){
    this.el.nativeElement.style.fontSize = `${fontSize.size}px`;
  }
  
  onColor(color: any){
    this.el.nativeElement.style.color = color.color;
    this.invertColor();
  }

  onInvert(){
    this.el.nativeElement.classList.contains('text-inverted')
      ? this.el.nativeElement.classList.remove('text-inverted')
      : this.el.nativeElement.classList.add('text-inverted')
    this.invertColor();
  }

  invertColor(newColor? : string){
    const currentColor = this.el.nativeElement.style.color;
    let bgColor = this.el.nativeElement.style.backgroundColor;
    if (this.el.nativeElement.classList.contains('text-inverted')){
      this.el.nativeElement.style.backgroundColor = currentColor;
      this.el.nativeElement.style.color = 'white';
    } else {
      if(!bgColor || bgColor == 'transparent') bgColor = newColor;
      this.el.nativeElement.style.color = bgColor;
      this.el.nativeElement.style.backgroundColor = 'transparent';
    }
  }

}
