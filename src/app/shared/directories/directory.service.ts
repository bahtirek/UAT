import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { api } from '../../data/api-url';
import { Directory } from '../../interfaces/directory.interface';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {

  url = api.url;

  constructor(private http: HttpClient) { }

  getAllDirectories(){
    return this.http.get<any>(this.url + '/project-directories')
  }

  directorySource = new Subject<Directory>();

}
