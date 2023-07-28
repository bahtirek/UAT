import { Injectable } from '@angular/core';
import { Environment, ServerResponse } from '../interfaces/environment.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject, map } from 'rxjs';
import { api } from '../data/api-url';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  url = api.url;
  environment: Environment;

  constructor(private http: HttpClient) { }

  environmentSource = new Subject<Environment>()

  getAllEnvironments(){
    return this.http.get<any>(this.url + '/environment-list')
    .pipe(map(response => response?.result))
  }

  getEnvironmentById(id: number) {
    const params = new HttpParams().set('environmentId', id);
    return this.http.get<ServerResponse<Environment>>(this.url + '/environment', {params})
    .pipe(map(response => response?.result))
  }

  addEnvironment(environment: Environment) {
    return this.http.post<ServerResponse<Environment>>(this.url + '/environment', environment)
    .pipe(map(response => response?.result))
  }

  updateEnvironment(environment: Environment) {
    return this.http.patch<ServerResponse<Environment>>(this.url + '/environment', environment)
    .pipe(map(response => response?.result))
  }

  deleteEnvironment(environmentId: number) {
    const params = new HttpParams()
    .set('environmentId', environmentId)
    return this.http.delete<ServerResponse<Environment>>(this.url + '/environment', {params: params})
    .pipe(map(response => response?.result))
  }
}
