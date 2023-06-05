import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { EventsDashComponent } from './events-dash/events-dash.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { CreateEventModule } from './create-event/create-event.module';
import { RouterModule, Routes } from '@angular/router';

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
        path: 'create', loadChildren: () => CreateEventModule,
      },
    ]
  }
];

@NgModule({
  declarations: [
    EventsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class EventsModule { }
