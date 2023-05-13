import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Folder } from 'src/app/interfaces/folder.interface';
import { TestCase } from 'src/app/interfaces/test-case.interface';
import { TestCaseService } from 'src/app/services/test-case.service';

@Component({
  selector: 'app-create-test-case',
  templateUrl: './create-test-case.component.html',
  styleUrls: ['./create-test-case.component.less']
})
export class CreateTestCaseComponent implements OnInit {

  testCase: TestCase = {};
  scrollTop: any;
  caseChoiceModalOn: boolean = false;
  submitInProgress: boolean = false;
  onCreate: boolean = false;
  showFolders: boolean = false;
  folder: Folder;

  constructor(private testCaseService: TestCaseService, private router: Router) { }

  ngOnInit(): void {
    this.editOrNew();
    this.testCaseService.testCaseSource.pipe(take(2)).subscribe((testCase: TestCase) => {
      this.testCase = testCase;
    })
  }

  editOrNew(){
    if(!this.testCaseService.testCaseDetails?.testCaseId){
      this.showFolders = true;
    } else {
      this.testCase = this.testCaseService.getTestCase();
    }
  }

  folderSaved(folder: Folder){
    this.folder = folder;
    if(!this.testCase?.testCaseId) this.onCreate = true;
  }

  editOrNew2(){
    if(!this.testCaseService.testCaseDetails?.testCaseId){
      this.onCreate = true;
    } else {
      this.testCase = this.testCaseService.getTestCase();
    }
  }

  onCreateClick(){
    this.onCreate = true;
  }

  closeModal(){
    this.caseChoiceModalOn = false;
    this.router.navigate(['./test-case/dashboard'], { skipLocationChange: true });
  }
  toggleModal(){
    this.caseChoiceModalOn = !this.caseChoiceModalOn;
  }

}
