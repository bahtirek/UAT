import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestStep } from 'src/app/interfaces/test-step.interface';
import { ExecutionService } from 'src/app/services/execution.service';

@Component({
  selector: 'app-actual-result',
  templateUrl: './actual-result.component.html',
  styleUrls: ['./actual-result.component.less']
})
export class ActualResultComponent implements OnInit {

  editing: boolean = false;

  get actualResult() {
    return this.resultsForm.get('actualResult');
  }

  get jira() {
    return this.resultsForm.get('jira');
  }

  resultsForm: FormGroup = this.fb.group({
    actualResult: ['', [Validators.required, ]],
    jira: [false]
  });

  constructor(private fb: FormBuilder, private executionService: ExecutionService) { }

  ngOnInit(): void {
    this.setStepFormValue();
  }

  @Input() step: TestStep;
  @Input() resultsToEdit: string;
  @Output() cancel = new EventEmitter<null>();
  @Output() save = new EventEmitter<string>();

  onResultsSave(){
    if(this.resultsForm.valid) {
      const executedStep: TestStep = {testStepExecutionId: this.step.testStepExecutionId, actualResult: this.actualResult.value, result: 'fail'}
      this.executionService.patchStepResult(executedStep).subscribe({
        next: (result)=>{
          this.save.emit(result.actualResult);
        },
        error: (error)=>{
          console.log(error);
        }
      })
    }
  }

  addResults() {
    console.log(this.actualResult);
    this.save.emit(this.actualResult.value);
  }

  updateResults(){
    console.log(this.actualResult);
    this.save.emit(this.actualResult.value);
  }

  setStepFormValue() {
    if(this.resultsToEdit){
      this.resultsForm.controls['actualResult'].setValue(this.resultsToEdit);
    }
  }

  onCancel(){
    this.cancel.emit();
  }

}
