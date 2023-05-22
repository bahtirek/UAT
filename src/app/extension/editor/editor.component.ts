import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, ComponentRef, } from '@angular/core';
import * as htmlToImage from 'html-to-image';
import { EditorService } from 'src/app/services/editor.service';
import { CircleComponent } from './circle/circle.component';
import { CircleService } from './circle/circle.service';
import { HighlightComponent } from './highlight/highlight.component';
import { HighlightService } from './highlight/highlight.service';
import { LineComponent } from './line/line.component';
import { LineService } from './line/line.service';
import { RectangleComponent } from './rectangle/rectangle.component';
import { RectangleService } from './rectangle/rectangle.service';
import { TextComponent } from './text/text.component';
import { TextService } from './text/text.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less']
})
export class EditorComponent implements OnInit {

  showHide: boolean = true;
  editorClass: string = '';

  constructor(
    private circleService: CircleService,
    private rectangleService: RectangleService,
    private textService: TextService,
    private editorService: EditorService,
    private lineService: LineService,
    private highlightService: HighlightService,
  ) { }

  ngOnInit(): void {
    this.editorService.activeBtnSubject.subscribe(btn => this.action(btn))
    this.editorService.onDeleteSubject.subscribe(component => this.onDelete(component))
  }

  onDelete(componentRef: ComponentRef<any>){
    let vcrIndex: number = this.vcr.indexOf(componentRef.hostView);
    this.vcr.remove(vcrIndex);
  }

  @ViewChild('downloadImage', {static: true}) downloadImage!: ElementRef<HTMLAnchorElement>;
  @ViewChild('canvas', {static: true}) canvasEl!: ElementRef<HTMLImageElement>;
  @ViewChild("viewContainerRef", { read: ViewContainerRef }) vcr!: ViewContainerRef;

  action(btn: string) {

    switch (btn) {
      case 'ui-br-ext-square-button': this.rectangleService.addComponent(this.vcr.createComponent(RectangleComponent)); break;
      case 'ui-br-ext-circle-button': this.circleService.addComponent(this.vcr.createComponent(CircleComponent)); break;
      case 'ui-br-ext-text-button': this.textService.addComponent(this.vcr.createComponent(TextComponent)); break;
      case 'ui-br-ext-line-button': this.lineService.addComponent(this.vcr.createComponent(LineComponent)); break;
      case 'ui-br-ext-highlight-button': this.highlightService.addComponent(this.vcr.createComponent(HighlightComponent)); break;
      case 'ui-br-ext-save-button': this.getImage(); break;

      default: return false; break;
    }
  }

  async getImage(){
    const canvasWidth = this.canvasEl.nativeElement.scrollWidth
    const canvasHeight = this.canvasEl.nativeElement.scrollHeight

    const dataUrl = await htmlToImage.toPng(this.canvasEl.nativeElement, {width: canvasWidth, height: canvasHeight})
    this.saveAs(dataUrl, 'my-node.png');
  }

  saveAs (blob: string, fileName: string){
    this.downloadImage.nativeElement.href = blob
    this.downloadImage.nativeElement.download = fileName;
    if (typeof this.downloadImage.nativeElement.click === 'function') {
      this.downloadImage.nativeElement.click();
    } else {
      this.downloadImage.nativeElement.target = '_blank';
      this.downloadImage.nativeElement.dispatchEvent(new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      }));
    }
    URL.revokeObjectURL(this.downloadImage.nativeElement.href);
  }

}
