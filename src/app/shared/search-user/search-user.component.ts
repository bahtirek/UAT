import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { User } from 'src/app/interfaces/user.inteface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.less']
})
export class SearchUserComponent implements OnInit {

  searchQuery: string = '';
  submitInProgress: number;
  events: Event[] = [];
  eventId: number;
  userSearch = new Subject<string>();
  searchError: string;
  users: User[];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.userSearch.pipe(debounceTime(400), distinctUntilChanged())
    .subscribe(value => {
      this.searchTestCase();
    });
  }

  @Output() cancel = new EventEmitter<void>();
  @Output() userEmit = new EventEmitter<User>();

  searchTestCase(){
    this.searchError = '';
    let searchQuery = this.searchQuery;
    searchQuery = searchQuery.trim();
    if(searchQuery.length > 2) {
      this.usersService.searchUser(this.searchQuery, 0).subscribe(
        response => {
          console.log(response);
          
          this.users = response;
        }
      )
    } else {
      this.users = [];
      this.searchError = 'Search query should more than 2 characters';
    }
  }

  onFound(user: User){
    console.log(user);
    
  }

  onCancel(){
    this.cancel.emit();
  }

}
