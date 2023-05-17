import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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
  navigationSubscription;

  constructor(private testCaseService: TestCaseService, private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.onInit()
      }
    });
   }

  onInit() {
    this.editOrNew();
    this.testCaseService.testCaseSource.pipe(take(2)).subscribe((testCase: TestCase) => {
      this.testCase = testCase;
      this.onCreate = false;
    })
  }

  ngOnInit(): void {
    this.onInit()
  }

  editOrNew(){
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

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
   }
  }

}
