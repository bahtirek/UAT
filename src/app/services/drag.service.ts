import { Injectable } from '@angular/core';
import { Position } from '../interfaces/position.interface';

@Injectable({
  providedIn: 'root'
})
export class DragService {

  onMouseUp(event: any, nativeElement: HTMLDivElement) {
    document.onmouseup = this.closeDragElement
  }

    element: HTMLDivElement;

  constructor() { }

  positions: Position = {
    clientX: 0,
    clientY: 0,
    movementX: 0,
    movementY: 0
  }

  onMouseDown (event: MouseEvent, el: HTMLDivElement) {
    this.element = el;
    event.preventDefault();
    // get the mouse cursor position at startup:
    this.positions.clientX = event.clientX
    this.positions.clientY = event.clientY
    document.onmousemove = this.elementDrag
    document.onmouseup = this.closeDragElement
  }

  elementDrag = (event: MouseEvent) => {
      event.preventDefault();


      this.positions.movementX = this.positions.clientX - event.clientX
      this.positions.movementY = this.positions.clientY - event.clientY
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      // set the element's new position:
      if (event.clientY > 0 && event.clientY < window.innerHeight) {
          this.element!.style.top = (this.element!.offsetTop - this.positions.movementY) + 'px'
      }
      if (event.clientX > 0 && event.clientX < window.innerWidth){
          this.element!.style.left = (this.element!.offsetLeft - this.positions.movementX) + 'px'
      }
  }

  closeDragElement () {
      document.onmouseup = null
      document.onmousemove = null
      document.ontouchend = null
      document.ontouchmove = null
  }
}
