import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.inteface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.less']
})
export class CreateUserComponent implements OnInit {

  user: User;

  get firstname() {
    return this.userForm.get('firstname');
  }
  get lastname() {
    return this.userForm.get('lastname');
  }
  get email() {
    return this.userForm.get('email');
  }
  get userrole() {
    return this.userForm.get('userrole');
  }

  userForm: FormGroup = this.fb.group({
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ]],
    userrole: ['', [Validators.required]],
  });


  @Input() userToEdit: number = null;
  @Input() editing: boolean = false;
  @Output() onUserSaved = new EventEmitter<void>()
  @Output() cancel = new EventEmitter<void>()

  constructor(private fb: FormBuilder, private userService: UsersService) { }

  ngOnInit(): void {
    if (this.userToEdit) {
      this.getUser()
    }
  }

  getUser() {
    /* this.userService.getUserById(this.userToEdit).subscribe({
      next: (response) => {
        console.log(response);
        if(response.userId) {
          this.setUserFormValue(response);
          this.user = response;
        }
      },
      error: (error) => {
        console.log(error)
      }
    }) */
  }

  setUserFormValue(user: User) {
    this.userForm.controls['email'].setValue(user.email);
    this.userForm.controls['firstname'].setValue(user.firstname);
    this.userForm.controls['lastname'].setValue(user.lastname);
    this.userForm.controls['userrole'].setValue(user.userRole);
  }

  onSubmit() {
    console.log(this.userForm.valid);

    if (this.userForm.valid) {
      if(this.user && this.user.userId) {
        this.updateUser()
      } else {
        this.addUser()
      }
    } else {
      this.validateAllFormFields(this.userForm);
    }
  }

  addUser(){
    /* this.userService.addUser(this.userForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.onUserSaved.next();
      },
      error: (error) => {
        console.log(error)
      }
    }) */
  }

  updateUser(){
    /* this.userService.updateUser({...this.userForm.value, userId: this.user.userId}).subscribe({
      next: (response) => {
        console.log(response);
        this.onUserSaved.next();
      },
      error: (error) => {
        console.log(error)
      }
    }) */
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
