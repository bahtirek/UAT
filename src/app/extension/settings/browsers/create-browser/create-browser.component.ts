import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Browser } from 'src/app/interfaces/browser.interface';
import { BrowserService } from 'src/app/services/browser.service';

@Component({
  selector: 'app-create-browser',
  templateUrl: './create-browser.component.html',
  styleUrls: ['./create-browser.component.less']
})
export class CreateBrowserComponent implements OnInit {

  browser: Browser;

  get name() {
    return this.browserForm.get('name');
  }

  browserForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
  });


  @Input() browserToEdit: number;
  @Input() productId: number;
  @Output() onBrowserSaved = new EventEmitter<void>()
  @Output() cancel = new EventEmitter<void>()

  constructor(private fb: FormBuilder, private browserService: BrowserService) { }

  ngOnInit(): void {
    if (this.browserToEdit) {
      this.getBrowser()
    }
  }

  getBrowser() {
    this.browserService.getBrowserById(this.browserToEdit).subscribe({
      next: (response) => {
        console.log(response);
        if(response.browserId) {
          this.setBrowserFormValue(response);
          this.browser = response;
        }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  setBrowserFormValue(browser: Browser) {
    this.browserForm.controls['name'].setValue(browser.name);
  }

  onSubmit() {
    if (this.browserForm.valid) {
      if(this.browser && this.browser.browserId) {
        this.updateBrowser()
      } else {
        this.addBrowser()
      }
    } else {
      this.validateAllFormFields(this.browserForm);
    }
  }

  addBrowser(){
    const browser: Browser = {
      name: this.name.value
    }
    this.browserService.addBrowser(browser).subscribe({
      next: (response) => {
        console.log(response);
        this.onBrowserSaved.next();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  updateBrowser(){
    const browser: Browser = {
      name: this.name.value,
      browserId: this.browser.browserId
    }
    this.browserService.updateBrowser(browser).subscribe({
      next: (response) => {
        console.log(response);
        this.onBrowserSaved.next();
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
