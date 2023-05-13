import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TestStep } from 'src/app/interfaces/test-step.interface';
import { TestCaseService } from 'src/app/services/test-case.service';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';

@Component({
  selector: 'app-delete-step',
  templateUrl: './delete-step.component.html',
  styleUrls: ['./delete-step.component.less']
})
export class DeleteStepComponent implements OnInit {

  submitInProgress: boolean = false;

  constructor(private testCaseService: TestCaseService, private toaster: ToasterService) { }

  ngOnInit(): void {
  }

  @Input() stepToDelete: TestStep = {};

  @Output() cancel = new EventEmitter<null>();
  @Output() deleteStep = new EventEmitter<TestStep>();

  delete(){
    this.submitInProgress = true;
    this.testCaseService.deleteTestStep(this.stepToDelete).subscribe(
      response => {
        this.submitInProgress = false;
        this.testCaseService.setTestCase(response);
        this.onCancel();
      },
      error => {
        this.submitInProgress = false;
      }
    )
  }

  onCancel(){
    this.cancel.emit();
  }

}
