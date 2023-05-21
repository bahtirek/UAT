import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { EditorMenu } from 'src/app/interfaces/editor-menu.interface';

@Component({
  selector: 'app-editor-menu',
  templateUrl: './editor-menu.component.html',
  styleUrls: ['./editor-menu.component.less']
})
export class EditorMenuComponent implements OnInit {

  showMenu: boolean = false;
  align: string[] = [];
  mouseLeaveTimer: any;
  colors: any[] = [
    {
      color: 'white'
    },
    {
      color: 'black'
    },
    {
      color: 'red'
    },
    {
      color: 'green'
    },
    {
      color: 'blue'
    },
    {
      color: 'yellow'
    },
    {
      color: 'purple'
    },
  ]

  strokes: any[] = [
    {
      style: 'border-width: 2px',
      width: '2px'
    },
    {
      style: 'border-width: 4px',
      width: '4px'
    },
    {
      style: 'border-width: 6px',
      width: '6px'
    },
  ]

  borders: any[] = [
    {
      style: 'solid',
      width: '6px'
    },
    {
      style: 'dashed',
      width: '2px'
    },
    {
      style: 'dotted',
      width: '4px'
    },
  ]

  fontSizes: any[] = [
    {
      size: '15'
    },
    {
      size: '17'
    },
    {
      size: '19'
    },
    {
      size: '21'
    },
    {
      size: '25'
    },
  ]

  defaultEditorMenu: EditorMenu = {
    color: true,
    stroke: true,
    fontSize: false,
    invert: false,
    rotate: false,
    arrow: false,
    borderStyle: false
  };

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('moreButton') moreButton: ElementRef;
  @Input() editorMenu: EditorMenu = this.defaultEditorMenu;
  @Output() onDelete = new EventEmitter<boolean>();
  @Output() onColor = new EventEmitter<any>();
  @Output() onStroke = new EventEmitter<any>();
  @Output() onFontSize = new EventEmitter<any>();
  @Output() onInvert = new EventEmitter<any>();
  @Output() onRotate = new EventEmitter<any>();
  @Output() onArrow = new EventEmitter<string>();
  @Output() onBorder = new EventEmitter<string>();

  onDeleteClick() {
    this.onDelete.emit(true);
  }

  onStrokeClick(stroke: any) {
    this.onStroke.emit(stroke);
  }

  onColorClick(color: any) {
    this.onColor.emit(color);
  }

  onFontSizeClick(fontSize: any) {
    this.onFontSize.emit(fontSize)
  }

  onInvertClick(){
    this.onInvert.emit()
  }

  onRotateClick(to: string){
    this.onRotate.emit(to)
  }

  onBorderClick(style: string){
    this.onBorder.emit(style)
  }

  onArrowClick(val: string){
    this.onArrow.emit(val)
  }


  onButtonClick(event: Event){
    this.align = [];
    if (!this.showMenu) {
      this.moreButton.nativeElement.addEventlistener
      const windowHieght = window.innerHeight;
      const windowWidth = window.innerWidth;
      const menuPosition = this.moreButton.nativeElement.getBoundingClientRect();
      const menuHeight = this.colors.length * 35;
      if(menuPosition.y < windowWidth / 2) {
        this.align.push('left')
      }
      if(windowHieght + menuPosition.x < menuHeight + 100) {
        this.align.push('top')
      }
      this.showMenu = true;
    } else {
      this.showMenu = false;
    }
  } 

  onMouseLeave(){
    this.mouseLeaveTimer = setTimeout(()=>{
      this.showMenu = false
    }, 500)
  }
  
  onMouseEnter = () => {
    clearTimeout(this.mouseLeaveTimer)
  }
  
  toggleMenu(){
    this.showMenu = !this.showMenu
  }

}
