import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Directory } from 'src/app/interfaces/directory.interface';
import { DirectoryService } from '../../directory.service';

@Component({
  selector: 'app-create-directory',
  templateUrl: './create-directory.component.html',
  styleUrls: ['./create-directory.component.less']
})
export class CreateDirectoryComponent implements OnInit {

  get name() {
    return this.nameForm.get('name');
  }

  nameForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(private fb: FormBuilder, private directoryService: DirectoryService) { }

  ngOnInit(): void {
  }

  @Input() directoryToEdit: Directory;
  @Input() parentDirectoryId: number;
  @Input() projectId: number;

  @Output() cancel = new EventEmitter<null>();
  @Output() onDirectorySaved = new EventEmitter<null>();

  onSubmit() {
    if (this.nameForm.valid) {
      const directory = {
        name: this.name.value,
        projectId: this.projectId,
        parentDirectoryId: this.parentDirectoryId
      }
      this.directoryService.postDirectory(directory).subscribe({
        next: (response) => {
          this.directoryService.setDirectories(this.parentDirectoryId, this.projectId);
        },
        error: (error) => {
          console.log(error);
        }
      })
      this.onDirectorySaved.emit()
    } else {
      this.validateAllFormFields(this.nameForm);
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
    this.nameForm.reset();
    this.cancel.emit();
  }

}
