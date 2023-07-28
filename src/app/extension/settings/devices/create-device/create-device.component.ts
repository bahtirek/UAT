import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Device } from 'src/app/interfaces/device.interface';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-create-device',
  templateUrl: './create-device.component.html',
  styleUrls: ['./create-device.component.less']
})
export class CreateDeviceComponent implements OnInit {

  device: Device;

  get name() {
    return this.deviceForm.get('name');
  }

  deviceForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
  });


  @Input() deviceToEdit: number;
  @Input() productId: number;
  @Output() onDeviceSaved = new EventEmitter<void>()
  @Output() cancel = new EventEmitter<void>()

  constructor(private fb: FormBuilder, private deviceService: DeviceService) { }

  ngOnInit(): void {
    if (this.deviceToEdit) {
      this.getDevice()
    }
  }

  getDevice() {
    this.deviceService.getDeviceById(this.deviceToEdit).subscribe({
      next: (response) => {
        console.log(response);
        if(response.deviceId) {
          this.setDeviceFormValue(response);
          this.device = response;
        }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  setDeviceFormValue(device: Device) {
    this.deviceForm.controls['name'].setValue(device.name);
  }

  onSubmit() {
    if (this.deviceForm.valid) {
      if(this.device && this.device.deviceId) {
        this.updateDevice()
      } else {
        this.addDevice()
      }
    } else {
      this.validateAllFormFields(this.deviceForm);
    }
  }

  addDevice(){
    const device: Device = {
      name: this.name.value
    }
    this.deviceService.addDevice(device).subscribe({
      next: (response) => {
        console.log(response);
        this.onDeviceSaved.next();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  updateDevice(){
    const device: Device = {
      name: this.name.value,
      deviceId: this.device.deviceId
    }
    this.deviceService.updateDevice(device).subscribe({
      next: (response) => {
        console.log(response);
        this.onDeviceSaved.next();
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
