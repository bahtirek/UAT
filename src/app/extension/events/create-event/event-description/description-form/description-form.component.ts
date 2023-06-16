import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Environment } from 'src/app/interfaces/environment.interface';
import { Event } from 'src/app/interfaces/event.interface';

@Component({
  selector: 'app-description-form',
  templateUrl: './description-form.component.html',
  styleUrls: ['./description-form.component.less']
})
export class DescriptionFormComponent implements OnInit {

  get title() {
    return this.descriptionForm.get('title');
  }
  get description() {
    return this.descriptionForm.get('description');
  }
  get environment() {
    return this.descriptionForm.get('environment');
  }

  descriptionForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    environment: ['', [Validators.required]]
  });

  environments: Environment[] = [
    {
      name: 'DEV',
      environmentId: 1
    },
    {
      name: 'TEST',
      environmentId: 2
    },
    {
      name: 'QA',
      environmentId: 3
    },
    {
      name: 'PROD',
      environmentId: 4
    },
  ]

  @Input() eventDescription: Event;
  @Output() onDescriptionSaved = new EventEmitter<Event>()

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.descriptionForm.valid) {
      /* const credentials = {title: this.title.value, description: this.description.value}
      this.auth.login(credentials).subscribe({
        next: (response) => {
          this.auth.setToken(response.access_token)
          this.router.navigate(['/dashboard'], { skipLocationChange: true });
        },
        error: (error: any) => {
          console.log(error);
        }
      }) */
    } else {
      this.validateAllFormFields(this.descriptionForm);
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

}
