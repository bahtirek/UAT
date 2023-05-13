import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoreButtonAction } from 'src/app/interfaces/more-button-action.interface';
import { TestCase } from 'src/app/interfaces/test-case.interface';
import { TestCaseService } from 'src/app/services/test-case.service';

@Component({
  selector: 'app-case-title',
  templateUrl: './case-title.component.html',
  styleUrls: ['./case-title.component.less']
})
export class CaseTitleComponent implements OnInit {
  
  createCase: boolean = false;
  testCase: TestCase;
  testCaseToEdit: TestCase = {};
  isCaseTitleModalOn: boolean = false;
  actions: MoreButtonAction[] = [
    {
      name: 'Edit',
      action: 'edit',
      display: true
    },
  ]

  //opening create ttitle by default
  @Input() set onCreate(value: boolean){
    this.isCaseTitleModalOn = value;
    this.createCase = value;
  }

  @Input() set testCaseProp(value: TestCase) {
    this.testCase = value;
  }

  constructor(private testCaseService: TestCaseService, private router: Router) { }

  ngOnInit(): void {
  }

  onCreateCancel(){
    if (this.testCaseToEdit?.testCaseId) {
      this.toggleAddTestCaseModal();
    } else {
      this.router.navigate(['./test-case/dashboard'], { skipLocationChange: true });
    }
  }

  onCaseTestCaseEdit(){
    this.testCaseToEdit = {...this.testCase};
    this.toggleAddTestCaseModal();
  }
  
  onTestCaseTitleSaved(testCase: TestCase){
    this.testCaseService.setTestCase(testCase);
    //this.testCase = testCase;
    this.toggleAddTestCaseModal();
  }

  openTestCaseModal(){
    this.toggleAddTestCaseModal()
  }

  toggleAddTestCaseModal(){
    this.isCaseTitleModalOn = !this.isCaseTitleModalOn;
  }

  onAction(event: string){
    switch (event) {
      case 'edit': this.onCaseTestCaseEdit(); break;
    }
  }

}
