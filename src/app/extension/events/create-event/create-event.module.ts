import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDescriptionComponent } from './event-description/event-description.component';
import { EventParticipantComponent } from './event-participant/event-participant.component';
import { ParticipantDetailsComponent } from './event-participant/participant-details/participant-details.component';
import { CreateParticipantComponent } from './event-participant/create-participant/create-participant.component';
import { CreateEventComponent } from './create-event.component';
import { MoreButtonMenuModule } from 'src/app/shared/more-button-menu/more-button-menu.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'src/app/shared/modal/modal.module';
import { DescriptionFormComponent } from './event-description/description-form/description-form.component';



@NgModule({
  declarations: [
    CreateEventComponent,
    EventParticipantComponent,
    ParticipantDetailsComponent,
    CreateParticipantComponent,
    DescriptionFormComponent,
    EventDescriptionComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MoreButtonMenuModule,
    ModalModule
  ],
  exports: [
    CreateEventComponent,
  ]
})
export class CreateEventModule { }
