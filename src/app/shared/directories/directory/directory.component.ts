import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Directory } from 'src/app/interfaces/directory.interface';
import { MoreButtonAction } from 'src/app/interfaces/more-button-action.interface';
import { TestCaseService } from 'src/app/services/test-case.service';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.less']
})
export class DirectoryComponent implements OnInit {
  expand: boolean;
  actions: MoreButtonAction[] = [

    {
      name: 'New folder',
      action: 'addFolder',
      display: true
    },
    {
      name: 'New test case',
      action: 'addTestCase',
      display: true
    },
    {
      name: 'Edit',
      action: 'edit',
      display: true
    },
    {
      name: 'Delete',
      action: 'deleteFolder',
      display: true
    },
  ]
  isModalOn: boolean;
  isDeleteModalOn: boolean;
  projectId: number;
  parentDirectoryId: number;
  isCantDeleteModalOn: any;

  constructor(private testCaseService: TestCaseService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.expand = this.directory.expand
  }

  @Input() directory: Directory;
  @Input() directoryToEdit: Directory;
  @Input() folderType: string;

  toggleFolder(){
    this.expand = !this.expand
    this.directory.expand = this.expand;
  }

  onFolderEdit(){
    const {name, directoryId} = this.directory;
    this.directoryToEdit = {name:  name, directoryId: directoryId};
    this.toggleAddDirectoryModal();
  }

  onFolderAdd(){
    if(this.directory.isProject) {
      this.parentDirectoryId = this.directory.directoryId
      this.projectId = this.directory.directoryId
    } else {
      this.parentDirectoryId = this.directory.directoryId
      this.projectId = this.directory.projectId
    }

    this.toggleAddDirectoryModal()
  }

  onTestCaseAdd() {
    let projectId;
    if(this.directory.isProject) {
      projectId = this.directory.directoryId
    } else {
      projectId = this.directory.projectId
    }
    this.testCaseService.testCaseDetails = {};
    this.testCaseService.directory = {directoryId: this.directory.directoryId, name: this.directory.name, projectId: projectId};
    this.router.navigate(['test-case/create'], { skipLocationChange: true });
  }

  onAction(event: string){
    switch (event) {
      case 'edit': this.onFolderEdit(); break;
      case 'addFolder': this.onFolderAdd(); break;
      case 'deleteFolder': this.onFolderDelete(); break;
      case 'addTestCase': this.onTestCaseAdd(); break;
    }
  }
  onFolderDelete() {
    if(this.directory.childDirectories.length == 0 && this.directory.testCases.length == 0){
      this.toggleDeleteModal()
    } else {
      this.toggleCantDeleteModal()
    }
  }

  onCreateCancel(){
    this.directoryToEdit = null;
    this.toggleAddDirectoryModal();
  }

  onDirectorySaved(){
    this.directoryToEdit = null;
    this.toggleAddDirectoryModal();
  }

  toggleAddDirectoryModal(){
    this.isModalOn = !this.isModalOn;
  }
  toggleDeleteModal(){
    this.isDeleteModalOn = !this.isDeleteModalOn
  }
  toggleCantDeleteModal(){
    this.isCantDeleteModalOn = !this.isCantDeleteModalOn
  }
  deleteFolder(){

  }
}
