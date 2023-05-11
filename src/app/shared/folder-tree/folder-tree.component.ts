import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import {
  Folder
} from 'src/app/interfaces/folder.interface';
import { MoreButtonAction } from 'src/app/interfaces/more-button-action.interface';
import { FolderTreeService } from './folder-tree.service';

@Component({
  selector: 'app-folder-tree',
  templateUrl: './folder-tree.component.html',
  styleUrls: ['./folder-tree.component.less']
})
export class FolderTreeComponent implements OnInit, OnDestroy {
  
  folderPath: String;
  actions: MoreButtonAction[] = [
    {
      name: 'Edit',
      action: 'edit',
      display: true
    },
  ]

  //showFolders: boolean = false;
  folder: Folder;
  folderToSave: Folder;
  folderSubscription: Subscription;

  @Input() showFolders: boolean = false;
  @Output() folderSaved = new EventEmitter<Folder>();

  constructor(private folderService: FolderTreeService) {}

  ngOnInit(): void {
    this.folderSubscription = this.folderService.folderSource.subscribe(folder => {
      this.folderToSave = folder
    })
  }

  onFolderEdit(){
    this.showFolders = true;
  }

  onAction(event: string){
    switch (event) {
      case 'edit': this.onFolderEdit(); break;
    }
  }

  onSaveFolder(){
    this.folder = this.folderToSave;
    this.folderSaved.emit(this.folder);
    this.showFolders = false;
  }

  onCancel(){
    this.showFolders = false;
  }

  ngOnDestroy(): void {
    this.folderSubscription.unsubscribe();
  }

  folders: Folder[] = [{
      name: 'folder 1',
      folderId: 1,
      state: false,
      subFolders: [{
          name: 'folder 1 of 1',
          folderId: 2,
          state: false
        },
        {
          name: 'folder 2 of 1',
          folderId: 3,
          state: false
        },
        {
          name: 'folder 3 of 1',
          folderId: 4,
          state: false,
          subFolders: [{
              name: 'folder 1 of 3 of 1',
              folderId: 5,
              state: false,
            },
            {
              name: 'folder 2 of 3 of 1',
              folderId: 6,
              state: false,
            },
            {
              name: 'folder 3 of 3 of 1',
              folderId: 7,
              state: false,
            },
          ]
        },
      ],
    },
    {
      name: 'folder 2',
      folderId: 8,
      state: false,
    },
    {
      name: 'folder 3',
      folderId: 9,
      state: false,
    },
    {
      name: 'folder 4',
      folderId: 10,
      state: false,
    },
  ]

}
