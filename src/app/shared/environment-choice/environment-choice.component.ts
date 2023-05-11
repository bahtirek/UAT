import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Environment } from 'src/app/interfaces/environment.interface';

@Component({
  selector: 'app-environment-choice',
  templateUrl: './environment-choice.component.html',
  styleUrls: ['./environment-choice.component.less']
})
export class EnvironmentChoiceComponent implements OnInit {

  formError: FormError = {};
  environmentId: number;
  searchError: String ='';

  constructor() { }

  ngOnInit(): void {
    if(this.environment && this.environment.environmentId) {
      this.environmentId = this.environment.environmentId;
    }
  }

  @Input() environment: Environment = {};
  @Input() environments: Environment[];

  @Output() cancel = new EventEmitter<null>();
  @Output() environmentEmit = new EventEmitter<Environment>();

  onSaveEnvironment(){
    this.formError.environment = [];
    if(this.environmentId) {
      this.environment = this.environments.find(env => env.environmentId == this.environmentId);
      this.environmentEmit.emit(this.environment)
    } else {
      this.formError.environment.push('Field is required');
    }
  }

  onCancel(){
    this.cancel.emit();
  }
}
export interface FormError {
  environment?: string[]
}
