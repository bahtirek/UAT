import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Directory } from 'src/app/interfaces/directory.interface';
import { DirectoryService } from '../directory.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.less']
})
export class CreateProjectComponent implements OnInit {

  get name() {
    return this.loginForm.get('name');
  }

  loginForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(private fb: FormBuilder, private directoryService: DirectoryService) { }

  ngOnInit(): void {
  }

  @Input() projectToEdit: Directory;
  @Output() cancel = new EventEmitter<null>();
  @Output() onProjectSaved = new EventEmitter<null>();

  onSubmit() {
    if (this.loginForm.valid) {
      this.directoryService.postProject({name: this.name.value}).subscribe({
        next: (response) => {
          this.directoryService.setDirectories();
        },
        error: (error) => {
          console.log(error);

        }
      })
      this.onProjectSaved.emit()
    } else {
      this.validateAllFormFields(this.loginForm);
    }
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
    this.loginForm.reset();
    this.cancel.emit();
  }
}
