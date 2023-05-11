import { Component, OnInit, Input } from '@angular/core';
import { TestCase } from 'src/app/interfaces/test-case.interface';
import { TestCaseService } from 'src/app/services/test-case.service';

@Component({
  selector: 'app-review-steps',
  templateUrl: './review-steps.component.html',
  styleUrls: ['./review-steps.component.less']
})
export class ReviewStepsComponent implements OnInit {

  constructor(private testCaseServie: TestCaseService) { }

  ngOnInit(): void {
    console.log(this.testCase);
    this.testCase.testStepOrder.forEach(step => {
      if(step.importedTestCaseId) {
        const importedCase = this.testCase.importedTestCases.find(testCase => testCase.testCaseId == step.importedTestCaseId);
        step.importedCaseTitle = importedCase.title;
      }
    });
    //this.testCaseServie.createStepsArray2(this.testCase)
  }

  @Input() testCase: TestCase;

  ngOnChanges(){
    console.log(this.testCase);
  }

  

}
