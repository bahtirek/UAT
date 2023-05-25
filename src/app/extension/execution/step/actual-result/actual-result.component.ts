import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-actual-result',
  templateUrl: './actual-result.component.html',
  styleUrls: ['./actual-result.component.less']
})
export class ActualResultComponent implements OnInit {

  editing: boolean = false;

  get actualResults() {
    return this.resultsForm.get('actualResults');
  }

  get jira() {
    return this.resultsForm.get('jira');
  }

  resultsForm: FormGroup = this.fb.group({
    actualResults: ['', [Validators.required, ]],
    jira: [false]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setStepFormValue();
  }

  @Input() resultsToEdit: string;
  @Output() cancel = new EventEmitter<null>();
  @Output() save = new EventEmitter<string>();

  onResultsSave(){
    if(this.resultsForm.valid) {
      if(this.resultsToEdit) {
        this.updateResults()
      } else {
        this.addResults()
      }
    }
  }

  addResults() {
    console.log(this.actualResults);
    this.save.emit(this.actualResults.value);
  }

  updateResults(){
    console.log(this.actualResults);
    this.save.emit(this.actualResults.value);
  }

  setStepFormValue() {
    if(this.resultsToEdit){
      this.resultsForm.controls['actualResults'].setValue(this.resultsToEdit);
    }
  }

  onCancel(){
    this.cancel.emit();
  }

}
