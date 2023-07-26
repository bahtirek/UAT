import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MoreButtonAction } from 'src/app/interfaces/more-button-action.interface';

@Component({
  selector: 'app-more-button-menu',
  templateUrl: './more-button-menu.component.html',
  styleUrls: ['./more-button-menu.component.less']
})
export class MoreButtonMenuComponent implements OnInit {
  showMenu: boolean = false;
  align: string[] = [];
  mouseLeaveTimer: any;

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('moreButton') moreButton: ElementRef;
  @Input() actions: MoreButtonAction[] = [];
  @Output() onAction = new EventEmitter<string>();

  onActionClick(i: number){
    const action = this.actions[i];
    this.onAction.emit(action.action);
    this.showMenu = false;
  }

  onButtonClick(event: Event){
    this.align = [];
    if (!this.showMenu) {
      this.moreButton.nativeElement.addEventlistener
      const windowHieght = window.innerHeight;
      const windowWidth = window.innerWidth;
      const menuPosition = this.moreButton.nativeElement.getBoundingClientRect();
      const menuHeight = this.actions.length * 35;
      if(menuPosition.y < windowWidth / 2) {
        this.align.push('right')
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
