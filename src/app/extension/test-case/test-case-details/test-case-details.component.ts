import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TestCase, TestStepOrder } from 'src/app/interfaces/test-case.interface';
import { ExecutionService } from 'src/app/services/execution.service';
import { TestCaseService } from 'src/app/services/test-case.service';
import { DirectoryService } from 'src/app/shared/directories/directory.service';

@Component({
  selector: 'app-test-case-details',
  templateUrl: './test-case-details.component.html',
  styleUrls: ['./test-case-details.component.less']
})
export class TestCaseDetailsComponent implements OnInit {
  testCase: TestCase;
  testCaseToReview: TestCase;
  importsReviewModalOn: boolean = false;
  deleteModalOn: boolean = false;
  submitInProgress: boolean = false;
  navigationSubscription;
  lastExecutedOn: string;
  testCaseId: any;
  isFoldersModalOn: boolean;

  constructor(private router: Router, private testCaseService: TestCaseService, private executionService: ExecutionService, private directoryService: DirectoryService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      // Need for reload the page
      if (e instanceof NavigationEnd) {
        this.onInit()
      }
    });
   }

  ngOnInit(): void {
    this.onInit()
  }

  onInit(){
    if(this.testCaseService.testCaseDetails && this.testCaseService.testCaseDetails.testCaseId) {
      const testCaseId = this.testCaseService.testCaseDetails.testCaseId;
      this.testCaseService.getTestCaseById(testCaseId).subscribe(
        response => {this.testCase = this.testCaseService.setTitleForImportedCase(response);
          console.log(response);

          if(this.testCase.executionHistory && this.testCase.executionHistory.length > 0) {
            this.lastExecutedOn = this.testCase.executionHistory[this.testCase.executionHistory.length - 1].updated_at;
          }
        },
        error => {
          console.log(error);
        }
      )
    } else {
      this.router.navigate(['test-case/dashboard'], { skipLocationChange: true });
    }
  }

  onImportsReview(importedCase: TestStepOrder) {
    this.testCaseService.getTestCaseById(importedCase.importedTestCaseId).subscribe(
      response => {
        this.testCaseToReview = response;
        this.toggleModal();
      }
    )
  }

  onExecute(){
    this.executionService.testCaseId = this.testCase.testCaseId;
    this.router.navigate(['execution'], { skipLocationChange: true });
  }

  onEdit(){
    this.testCaseService.setTestCase(this.testCase);
    this.router.navigate(['test-case/create'], { skipLocationChange: true });
  }

  onDelete(){
    this.deleteModalOn = false
  }

  onDeleteTestCase(){
    console.log('deleted');
    this.deleteModalOn = false
  }

  toggleDeleteModal(){
    this.deleteModalOn = !this.deleteModalOn;
  }

  onMove(){
    this.toggleFoldersModal();
    const moveTestCaseSubscription = this.testCaseService.moveTestCaseSource.subscribe({
      next: (response) => {
        this.toggleFoldersModal();
        this.testCase = response;
        this.directoryService.setDirectories(response.directoryId, response.projectId);
        moveTestCaseSubscription.unsubscribe();
      }
    })
  }

  toggleFoldersModal() {
    this.isFoldersModalOn = !this.isFoldersModalOn
  }

  toggleModal(){
    this.importsReviewModalOn = !this.importsReviewModalOn;
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
   }
  }
}
