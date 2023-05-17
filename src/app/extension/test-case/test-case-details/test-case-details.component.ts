import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TestCase, TestStepOrder } from 'src/app/interfaces/test-case.interface';
import { TestCaseService } from 'src/app/services/test-case.service';

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

  constructor(private router: Router, private testCaseService: TestCaseService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
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
        response => {
          this.testCase = this.testCaseService.setTitleForImportedCase(response);
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

  toggleModal(){
    this.importsReviewModalOn = !this.importsReviewModalOn;
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
   }
  }
}
