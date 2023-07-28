import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-delete-device',
  templateUrl: './delete-device.component.html',
  styleUrls: ['./delete-device.component.less']
})
export class DeleteDeviceComponent implements OnInit {

  @Input() deviceToDelete: number;
  @Input() productId: number;
  @Output() onDeviceDeleted = new EventEmitter<void>()
  @Output() cancel = new EventEmitter<void>()

  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
  }

  onCancel(){
    this.cancel.emit();
  }

  onDelete(){
    this.deviceService.deleteDevice(this.deviceToDelete).subscribe({
      next: (response) => {
        console.log(response);
        this.onDeviceDeleted.next();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

}
