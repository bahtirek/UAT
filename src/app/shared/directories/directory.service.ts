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

  postProject(project: Directory){
    return this.http.post<string>(this.url + '/project', project)
  }

  postDirectory(directory: Directory){
    return this.http.post<Directory>(this.url + '/directory', directory)
  }

  getAllDirectories(){
    return this.http.get<any>(this.url + '/project-directories')
  }

  setDirectories(directoryId?: number, projectId?: number) {
    this.getAllDirectories().subscribe({
      next: (response) => {
        if(directoryId){
          const childDir = response.find((dir: Directory) => dir.directoryId == projectId);
          let result = this.expand(childDir, directoryId);
          if(result){
            childDir.expand = true;
          }
        }
        this.directoriesSource.next(response);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  expand(directory: Directory, directoryId: number){
    if(directory && directory.directoryId === directoryId) {
      directory.expand = true;
      return true;
    }
    if(directory && directory.childDirectories && directory.childDirectories.length > 0) {
      for (let i = 0; i < directory.childDirectories.length; i++) {
        const childDir = directory.childDirectories[i];
        let result = this.expand(childDir, directoryId);
        if(result){
          childDir.expand = true;
          return true;
        }
      }
    }
  }

  directoriesSource = new Subject<Directory[]>();

}
