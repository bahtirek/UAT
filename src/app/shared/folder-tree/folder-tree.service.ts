import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Folder } from 'src/app/interfaces/folder.interface';

@Injectable({
  providedIn: 'root'
})
export class FolderTreeService {

  constructor() { }

  folderSource = new Subject<Folder>();

}
