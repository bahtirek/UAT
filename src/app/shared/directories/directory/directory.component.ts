import { Component, Input, OnInit } from '@angular/core';
import { Directory } from 'src/app/interfaces/directory.interface';
import { MoreButtonAction } from 'src/app/interfaces/more-button-action.interface';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.less']
})
export class DirectoryComponent implements OnInit {
  expand: boolean;
  actions: MoreButtonAction[] = [
    {
      name: 'Edit',
      action: 'edit',
      display: true
    },
    {
      name: 'Add folder',
      action: 'addFolder',
      display: true
    },
    {
      name: 'Create test case',
      action: 'addFTestCase',
      display: true
    },
  ]

  constructor() { }

  ngOnInit(): void {
    console.log(this.directory);

  }

@Input() directory: Directory;

chooseDirectory(){

}

toggleFolder(){
  this.expand = !this.expand
}

onFolderEdit(){}
onFolderAdd(){}
onTestCaseAdd() {
  throw new Error('Method not implemented.');
}

onAction(event: string){
  switch (event) {
    case 'edit': this.onFolderEdit(); break;
    case 'addFolder': this.onFolderAdd(); break;
    case 'addFTestCase': this.onTestCaseAdd(); break;
  }
}


}
