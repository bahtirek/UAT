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

  constructor(private testCaseService: TestCaseService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.expand = this.directory.expand
  }

  @Input() directory: Directory;
  @Input() folderType: string;

  toggleFolder(){
    this.expand = !this.expand
    this.directory.expand = this.expand;
  }

  onFolderEdit(){}
  onFolderAdd(){}
  onTestCaseAdd() {
    console.log(this.directory);
    this.testCaseService.directory = {directoryId: this.directory.directoryId, name: this.directory.name};
    this.router.navigate(['test-case/create'], { skipLocationChange: true });
  }

  onAction(event: string){
    switch (event) {
      case 'edit': this.onFolderEdit(); break;
      case 'addFolder': this.onFolderAdd(); break;
      case 'addFTestCase': this.onTestCaseAdd(); break;
    }
  }


}
