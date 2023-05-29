import { ComponentRef, Injectable } from '@angular/core';
import { EditorService } from 'src/app/services/editor.service';
import { v4 as uuidv4 } from 'uuid';
import { TextComponent } from './text.component';

@Injectable({
  providedIn: 'root'
})
export class TextService {

  constructor(private editorService: EditorService) { }

  components: Array<ComponentRef<TextComponent>> = [];


  addComponent(componentRef: ComponentRef<TextComponent>) {
    let component = componentRef.instance;
    
    component.uuid = uuidv4();

    this.components.push(componentRef);
  }

  onDelete(uuid: string): void {

    let componentRef = this.components.find(
      component => component.instance.uuid == uuid
    );

    this.editorService.onDeleteSubject.next(componentRef)

    // removing component from the list
    this.components = this.components.filter(
      component => component.instance.uuid !== uuid
    );
  }
}
