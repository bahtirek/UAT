import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { Event, ServerResponse } from '../../interfaces/event.interface';

@Component({
  selector: 'app-search-event',
  templateUrl: './search-event.component.html',
  styleUrls: ['./search-event.component.less']
})
export class SearchEventComponent implements OnInit {

  title: string = '';
  submitInProgress: number;
  events: Event[] = [];
  eventId: number;
  titleSearch = new Subject<string>();
  searchError: string;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventId = this.eventService.event?.eventId;
  }

  ngAfterViewInit(){
    this.titleSearch.pipe(debounceTime(400), distinctUntilChanged())
    .subscribe(value => {
      this.searchTestCase();
    });
  }

  @Input() stepIndex: number;

  @Output() cancel = new EventEmitter<void>();
  @Output() testCaseEmit = new EventEmitter<Event>();

  searchTestCase(){
    this.searchError = '';
    let searchQuery = this.title;
    searchQuery = searchQuery.trim();
    if(searchQuery.length > 2) {
      this.eventService.searchEvent(this.title, 0).subscribe(
        response => {
          console.log(response);
          
          this.events = response;
        }
      )
    } else {
      this.events = [];
      this.searchError = 'Search query should more than 2 characters';
    }
  }

  onFound(event: Event){
    console.log(event);
    
  }

  onCancel(){
    this.cancel.emit();
    this.stepIndex = null;
  }

}
