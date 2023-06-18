import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Version } from 'src/app/interfaces/version.interface';
import { VersionService } from 'src/app/services/version.service';

@Component({
  selector: 'app-create-version',
  templateUrl: './create-version.component.html',
  styleUrls: ['./create-version.component.less']
})
export class CreateVersionComponent implements OnInit {

  version: Version;

  get name() {
    return this.versionForm.get('name');
  }

  versionForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
  });


  @Input() versionToEdit: number;
  @Output() onVersionSaved = new EventEmitter<void>()
  @Output() cancel = new EventEmitter<void>()

  constructor(private fb: FormBuilder, private versionService: VersionService) { }

  ngOnInit(): void {
    if (this.versionToEdit) {
      this.getVersion()
    }
  }

  getVersion() {
    this.versionService.getVersionById(this.versionToEdit).subscribe({
      next: (response) => {
        console.log(response);
        if(response.versionId) {
          this.setVersionFormValue(response);
          this.version = response;
        }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  setVersionFormValue(version: Version) {
    this.versionForm.controls['name'].setValue(version.name);
  }

  onSubmit() {
    if (this.versionForm.valid) {
      if(this.version && this.version.versionId) {
        this.updateVersion()
      } else {
        this.addVersion()
      }
    } else {
      this.validateAllFormFields(this.versionForm);
    }
  }

  addVersion(){
    this.versionService.addVersion(this.versionForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.onVersionSaved.next();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  updateVersion(){
    this.versionService.updateVersion({...this.versionForm.value, versionId: this.version.versionId}).subscribe({
      next: (response) => {
        console.log(response);
        this.onVersionSaved.next();
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
