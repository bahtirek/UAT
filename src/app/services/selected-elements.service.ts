import { Injectable } from '@angular/core';
import { BugElement } from '../interfaces/bug-element.interface';
import { UnsavedBugStorageService } from './unsaved-bug-storage.service';
import { XpathService } from './xpath.service';

@Injectable({
  providedIn: 'root'
})
export class SelectedElementsService {

  constructor(private xpath: XpathService, private unsavedBugStorage: UnsavedBugStorageService) { }

  elements: BugElement[] = [];

  lastSelectedElement: any;

  completeElementSelection(label: string){
    let dataLabel = `${Date.now()}--${label.replace(/\s+/g, '-').toLowerCase()}`;
    if(!label) dataLabel = `${Date.now()}--no-label`;
    if(this.lastSelectedElement){
      const xPath: any = this.xpath.getElementXpath(this.lastSelectedElement);
      const outline = this.getOutlineClass();
      this.lastSelectedElement.classList.remove('ui-br-ext-outlined-element');
      this.lastSelectedElement.classList.add('ui-br-ext-outlined-element-selected');
      this.lastSelectedElement.setAttribute('ez-bug-selected-label', dataLabel);
      this.elements.push(new BugElement(label, xPath, dataLabel, outline));
      this.unsavedBugStorage.addSelectedElements(this.elements);
      this.positionLabel(label, dataLabel);
      return true;
    } else {
      return false;
    }
  }

  resetSelectedElement(){
    this.lastSelectedElement = null;
  }

  positionLabel(label: string, dataLabel: string, element?: any){
    if(!element) element = this.lastSelectedElement;
    const position = this.getPosition(element);
    const elementLabel = `<div class="ez-bug-element-label" data-ez-bug-element-label="${dataLabel}" style="top:${position.top-19}px; left:${position.left-3}px">${label}</div>`
    
    document.body.insertAdjacentHTML('beforeend', elementLabel);
  }

  getPosition(element: any) {
    var clientRect = element.getBoundingClientRect();
    return {left: clientRect.left + document.body.scrollLeft, top: clientRect.top + document.body.scrollTop};
  }

  removeSelection(dataLabel: any) {
    this.elements = this.elements.filter(element => element.dataLabel != dataLabel);
    this.unsavedBugStorage.addSelectedElements(this.elements);
    const elements = document.querySelectorAll(`[ez-bug-selected-label="${dataLabel}"]`);
    elements[0].classList.remove('ui-br-ext-outlined-element-selected', 'ui-br-ext-selected-element-outline-red');

    const labelElements = document.querySelectorAll(`[data-ez-bug-element-label="${dataLabel}"]`);
    labelElements[0].remove();
    return this.elements;
  }

  displayAllSelectedElements() {
    if(this.elements && this.elements.length == 0) this.elements = this.unsavedBugStorage.bugReport.elements!;
    
    if(this.elements) {
      this.elements.forEach(elementData => {
        let element: any;
        try {
          element = document.evaluate(elementData.xPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
        } catch(e) {
            console.log(e)
        }
  
        element.classList.add('ui-br-ext-outlined-element-selected', elementData.outline, 'ui-br-ext-selected-element-outline-red');
        element.setAttribute('ez-bug-selected-label', elementData.dataLabel);
  
        this.positionLabel(elementData.label, elementData.dataLabel, element);
      });
    }
  }

  getOutlineClass (){
    let outlineClass = '';
    this.lastSelectedElement.classList.forEach((elClass: string) => {
      if(elClass.includes('ui-br-ext-outline-offset-')) {
        outlineClass = elClass;
      }
    })
    return outlineClass;
  }

  getElements(){
    return this.elements;
  }
}
