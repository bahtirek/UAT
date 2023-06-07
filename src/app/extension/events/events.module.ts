import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { EventsDashComponent } from './events-dash/events-dash.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { RouterModule, Routes } from '@angular/router';
import { CreateEventComponent } from './create-event/create-event.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateEventModule } from './create-event/create-event.module';

const routes: Routes = [
  {
    path: '', component: EventsComponent,
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: 'dashboard', component: EventsDashComponent
      },
      {
        path: 'details', component: EventDetailsComponent
      },
      {
        path: 'create', component: CreateEventComponent,
      },
    ]
  }
];

@NgModule({
  declarations: [
    EventsComponent,
  ],
  imports: [
    CommonModule,
    CreateEventModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class EventsModule { }
