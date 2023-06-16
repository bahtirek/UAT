import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/interfaces/event.interface';
import { MoreButtonAction } from 'src/app/interfaces/more-button-action.interface';

@Component({
  selector: 'app-event-description',
  templateUrl: './event-description.component.html',
  styleUrls: ['./event-description.component.less']
})
export class EventDescriptionComponent implements OnInit {

  actions: MoreButtonAction[] = [
    {
      name: 'Edit',
      action: 'edit',
      display: true
    },
  ]
  event: Event;
  descriptionToEdit: Event;
  isDescriptionModalOn: boolean

  constructor() { }


  ngOnInit(): void {
  }

  onCreateCancel(){
    this.toggleDescriptionFormModal()
  }

  onDescriptionSaved(description: Event){

  }

  toggleDescriptionFormModal(){
    this.isDescriptionModalOn = !this.isDescriptionModalOn
  }

  onAction(event: string){
    switch (event) {
      case 'edit': this.onEventDescriptionEdit(); break;
    }
  }
  onEventDescriptionEdit() {
    this.toggleDescriptionFormModal()
  }

}
