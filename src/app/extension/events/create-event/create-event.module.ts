import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDescriptionComponent } from './event-description/event-description.component';
import { EventParticipantComponent } from './event-participant/event-participant.component';
import { ParticipantDetailsComponent } from './event-participant/participant-details/participant-details.component';
import { CreateParticipantComponent } from './event-participant/create-participant/create-participant.component';
import { CreateEventComponent } from './create-event.component';



@NgModule({
  declarations: [
    CreateEventComponent,
    EventDescriptionComponent,
    EventParticipantComponent,
    ParticipantDetailsComponent,
    CreateParticipantComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CreateEventComponent
  ]
})
export class CreateEventModule { }
