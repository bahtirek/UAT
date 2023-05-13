import { Component, OnInit, ViewChild } from '@angular/core';
import { MoreButtonAction } from 'src/app/interfaces/more-button-action.interface';
import { TestCase, TestStepOrder } from 'src/app/interfaces/test-case.interface';
import { TestStep } from 'src/app/interfaces/test-step.interface';
import { TestCaseService } from 'src/app/services/test-case.service';
import { ImportStepsComponent } from './import-steps/import-steps.component';

@Component({
  selector: 'app-case-steps',
  templateUrl: './case-steps.component.html',
  styleUrls: ['./case-steps.component.less']
})
export class CaseStepsComponent implements OnInit {

  steps: TestStep[] = [];
  stepToEdit: TestStep = {};
  isAddStepModalOn: boolean = false;
  isDeleteModalOn: boolean = false;
  importsReviewModalOn: boolean = false;
  stepToDelete: TestStep = {};
  stepOrder: number;
  actions: MoreButtonAction[] = [
    {
      name: 'Edit',
      action: 'edit',
      display: true
    },
    {
      name: 'Add',
      action: 'add',
      display: true
    },
    {
      name: 'Import',
      action: 'import',
      display: true
    },
    {
      name: 'Move up',
      action: 'up',
      display: true
    },
    {
      name: 'Move down',
      action: 'down',
      display: true
    },
    {
      name: 'Delete',
      action: 'delete',
      display: true
    },
  ];
  importActions: MoreButtonAction[] = [
    {
      name: 'Review',
      action: 'review',
      display: true
    },
    {
      name: 'Add',
      action: 'add',
      display: true
    },
    {
      name: 'Import',
      action: 'import',
      display: true
    },
    {
      name: 'Move up',
      action: 'up',
      display: true
    },
    {
      name: 'Move down',
      action: 'down',
      display: true
    },
    {
      name: 'Delete',
      action: 'delete',
      display: true
    },
  ];
  testCase: TestCase;
  testCaseToReview: TestCase;
  importedTestCaseIdToReview: number;

  constructor(private testCaseService: TestCaseService) { }

  ngOnInit(): void {
    this.testCaseService.testCaseSource.subscribe((testCase: TestCase) => {
      this.testCase = testCase;
    })
    this.testCase = this.testCaseService.getTestCase();
  }

  @ViewChild(ImportStepsComponent) importSteps!: ImportStepsComponent;

  toggleModal(val: string){
    if(val == 'addNewStepModal'){
      this.isAddStepModalOn = !this.isAddStepModalOn;
      if(!this.isAddStepModalOn) {
        this.stepToEdit = {};
        this.stepOrder = null;
      }
    } else if(val == 'deleteStepModal'){
      this.isDeleteModalOn = !this.isDeleteModalOn;
      if(!this.isDeleteModalOn) {
        this.stepToEdit = {};
        this.stepOrder = null;
      }
    } else if(val == 'importsReviewModal'){
      this.importsReviewModalOn = !this.importsReviewModalOn;
      if(!this.importsReviewModalOn) {
        
      }
    } 
  }

  onStepEdit(step: TestStep){
    this.stepToEdit = {...step};
    this.toggleModal('addNewStepModal');
  }

  onStepAdd(index?: number){
    if(index == undefined) {
      let length = this.testCase.testStepOrder?.length || 0;
      this.stepOrder = length + 1;
    } else {
      this.stepOrder = index + 2;
    }
    this.toggleModal('addNewStepModal')
  }

  onDeleteStep(index: number){
    this.stepToDelete = this.testCase.testStepOrder[index].test_step;
    this.stepToDelete.order = this.testCase.testStepOrder[index].order;
    this.isDeleteModalOn = true;
  }

  moveStepUp(index: number){
    if(this.testCase.testStepOrder[index].order == 1) return false;

    const ordersToUpdate = {
      testCaseId: this.testCase.testCaseId,
      testSteps: [
        {
          testStepId: this.testCase.testStepOrder[index].testStepId,
          importedTestCaseId: this.testCase.testStepOrder[index].importedTestCaseId,
          existingOrder: this.testCase.testStepOrder[index].order,
          newOrder: this.testCase.testStepOrder[index].order - 1
        },
        {
          testStepId: this.testCase.testStepOrder[index - 1].testStepId,
          importedTestCaseId: this.testCase.testStepOrder[index - 1].importedTestCaseId,
          existingOrder: this.testCase.testStepOrder[index - 1].order,
          newOrder: this.testCase.testStepOrder[index - 1].order + 1
        },
      ]
    }

    this.testCaseService.changeStepOrder(ordersToUpdate).subscribe(
      response => {
        this.testCaseService.setTestCase(response)
      },
    )
  }

  moveStepDown(index: number){
    if(this.testCase.testStepOrder[index].order == this.testCase.testStepOrder.length) return false;

    const ordersToUpdate = {
      testCaseId: this.testCase.testCaseId,
      testSteps: [
        {
          testStepId: this.testCase.testStepOrder[index].testStepId,
          importedTestCaseId: this.testCase.testStepOrder[index].importedTestCaseId,
          existingOrder: this.testCase.testStepOrder[index].order,
          newOrder: this.testCase.testStepOrder[index].order + 1
        },
        {
          testStepId: this.testCase.testStepOrder[index + 1].testStepId,
          importedTestCaseId: this.testCase.testStepOrder[index + 1].importedTestCaseId,
          existingOrder: this.testCase.testStepOrder[index + 1].order,
          newOrder: this.testCase.testStepOrder[index + 1].order - 1
        },
      ]
    }

    this.testCaseService.changeStepOrder(ordersToUpdate).subscribe(
      response => {
        console.log(response);
        this.testCaseService.setTestCase(response)
      },
    )
  }
  
  onImportSteps(index?: number){
    console.log(index);
    
    if(index == undefined) {
      let length = this.testCase.testStepOrder?.length || 0;
      this.testCaseService.stepOrderForImport = length + 1;
    } else {
      this.testCaseService.stepOrderForImport = index + 2;
    }
    this.importSteps.toggleModal()
  }

  onImportsReview(importedCase: TestStepOrder) {
    this.testCaseService.getTestCaseById(importedCase.importedTestCaseId).subscribe(
      response => {
        this.testCaseToReview = response;
        this.toggleModal('importsReviewModal');
      }
    )
  }

  onImportDeleteStep(index: number) {
    this.stepToDelete.description = this.testCase.testStepOrder[index].importedCaseTitle;
    this.stepToDelete.testCaseId = this.testCase.testCaseId;
    this.stepToDelete.order = this.testCase.testStepOrder[index].order;
    this.isDeleteModalOn = true;
  }
  
  onAction(event: string, index: number){
    switch (event) {
      case 'edit': this.onStepEdit(this.testCase.testStepOrder[index].test_step); break;
      case 'add': this.onStepAdd(index); break;
      case 'import': this.onImportSteps(index); break;
      case 'up': this.moveStepUp(index); break;
      case 'down': this.moveStepDown(index); break;
      case 'delete': this.onDeleteStep(index); break;
    }
  }
  
  onImportAction(event: string, step: TestStepOrder, index: number){
    switch (event) {
      case 'review': this.onImportsReview(step); break;
      case 'add': this.onStepAdd(index); break;
      case 'import': this.onImportSteps(index); break;
      case 'up': this.moveStepUp(index); break;
      case 'down': this.moveStepDown(index); break;
      case 'delete': this.onImportDeleteStep(index); break;
    }
  }

}
