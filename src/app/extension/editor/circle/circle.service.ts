import { ComponentRef, Injectable } from '@angular/core';
import { CircleComponent } from './circle.component';
import { v4 as uuidv4 } from 'uuid';
import { EditorService } from 'src/app/services/editor.service';

@Injectable({
  providedIn: 'root'
})
export class CircleService {

  constructor(private editorService: EditorService) { }

  components: Array<ComponentRef<CircleComponent>> = [];


  addComponent(componentRef: ComponentRef<CircleComponent>) {
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
