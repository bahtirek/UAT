import { Component, OnInit, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-separator',
  templateUrl: './separator.component.html',
  styleUrls: ['./separator.component.less']
})
export class SeparatorComponent implements OnInit {

  private unlistener: () => void;

  constructor(private renderer2: Renderer2, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  public onMouseDown(e: MouseEvent) {
    e.preventDefault()
    document.documentElement.style.setProperty('cursor', `col-resize`);
    const screenWidth = window.innerWidth;
    const leftContainerMaxWidth = screenWidth * 40 / 100;
    this.unlistener = this.renderer2.listen("document", "mousemove", event => {
      document.documentElement.style.setProperty('--uat-left-conatiner-width', `${event.pageX}px`);
      if(event.pageX <= leftContainerMaxWidth) {
        document.documentElement.style.setProperty('--uat-right-conatiner-width', `${screenWidth - event.pageX}px`);
      }
    });
    this.renderer2.listen("document", "mouseup", event => {
      document.documentElement.style.setProperty('cursor', "");
      this.unlistener();
    });
  }
}
