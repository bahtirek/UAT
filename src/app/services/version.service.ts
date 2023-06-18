import { Injectable } from '@angular/core';
import { api } from '../data/api-url';
import { ServerResponse, Version } from '../interfaces/version.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  url = api.url;
  version: Version;
  productId: number;

  constructor(private http: HttpClient) { }


  versionSource = new Subject<Version>()

  getAllVersions(){
    const params = new HttpParams().set('productId', this.productId);
    return this.http.get<any>(this.url + '/version-list', {params})
    .pipe(map(response => response?.result))
  }

  getVersionById(id: number) {
    const params = new HttpParams().set('versionId', id);
    return this.http.get<ServerResponse<Version>>(this.url + '/version', {params})
    .pipe(map(response => response?.result))
  }

  addVersion(version: Version) {
    version.productId = this.productId
    return this.http.post<ServerResponse<Version>>(this.url + '/version', version)
    .pipe(map(response => response?.result))
  }

  updateVersion(version: Version) {
    version.productId = this.productId
    return this.http.patch<ServerResponse<Version>>(this.url + '/version', version)
    .pipe(map(response => response?.result))
  }

  deleteVersion(versionId: number) {
    const params = new HttpParams()
    .set('versionId', versionId)
    return this.http.delete<ServerResponse<Version>>(this.url + '/version', {params: params})
    .pipe(map(response => response?.result))
  }
}
