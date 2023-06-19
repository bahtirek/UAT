import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Environment } from 'src/app/interfaces/environment.interface';
import { EnvironmentService } from 'src/app/services/environment.service';

@Component({
  selector: 'app-create-environment',
  templateUrl: './create-environment.component.html',
  styleUrls: ['./create-environment.component.less']
})
export class CreateEnvironmentComponent implements OnInit {

  environment: Environment;

  get name() {
    return this.environmentForm.get('name');
  }

  environmentForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
  });


  @Input() environmentToEdit: number;
  @Output() onEnvironmentSaved = new EventEmitter<void>()
  @Output() cancel = new EventEmitter<void>()

  constructor(private fb: FormBuilder, private environmentService: EnvironmentService) { }

  ngOnInit(): void {
    if (this.environmentToEdit) {
      this.getEnvironment()
    }
  }

  getEnvironment() {
    this.environmentService.getEnvironmentById(this.environmentToEdit).subscribe({
      next: (response) => {
        console.log(response);
        if(response.environmentId) {
          this.setEnvironmentFormValue(response);
          this.environment = response;
        }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  setEnvironmentFormValue(environment: Environment) {
    this.environmentForm.controls['name'].setValue(environment.name);
  }

  onSubmit() {
    if (this.environmentForm.valid) {
      if(this.environment && this.environment.environmentId) {
        this.updateEnvironment()
      } else {
        this.addEnvironment()
      }
    } else {
      this.validateAllFormFields(this.environmentForm);
    }
  }

  addEnvironment(){
    this.environmentService.addEnvironment(this.environmentForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.onEnvironmentSaved.next();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  updateEnvironment(){
    this.environmentService.updateEnvironment({...this.environmentForm.value, environmentId: this.environment.environmentId}).subscribe({
      next: (response) => {
        console.log(response);
        this.onEnvironmentSaved.next();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onCancel(){
    this.cancel.emit();
  }

}
