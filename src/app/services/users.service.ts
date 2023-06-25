import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { api } from '../data/api-url';
import { User } from '../interfaces/user.inteface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = api.url;
  userId: number;

  constructor(private http: HttpClient) { }

  usersSource = new Subject<Event>();

  pushEvent(event: Event){
    this.usersSource.next(event)
  }

  searchUser(event: string, includeDeleted: number) {
    const params = new HttpParams()
      .set('title', event)
      .set('includeDeleted', includeDeleted);
      return this.http.get<User[]>(this.url + '/test-case-search', {params})

  }

  setEvent(event: Event){

    this.usersSource.next(event)
  }
  updateEvent(event: Event){

  }
  addEvent(event: Event){

  }
}
