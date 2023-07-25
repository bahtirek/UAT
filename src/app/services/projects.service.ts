import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';

import { api } from '../data/api-url';
import { Directory, ServerResponse } from '../interfaces/directory.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  url = api.url;

  constructor(private http: HttpClient) { }

  postProject(project: Directory){
    return this.http.post<string>(this.url + '/project', project)
  }

  getAllProjects(){
    return this.http.get<any>(this.url + '/projects')
    .pipe(map(response => response?.result))
  }

}
