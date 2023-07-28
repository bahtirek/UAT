import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/interfaces/device.interface';
import { MoreButtonAction } from 'src/app/interfaces/more-button-action.interface';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.less']
})
export class DevicesComponent implements OnInit {

  devices: Device[] = [];
  device: Device;
  createModalOn: boolean;
  deviceToEdit: number;
  deviceToDelete: number;
  deleteModalOn: boolean;
  actions: MoreButtonAction[] = [
    {
      name: 'Edit',
      action: 'edit',
      display: true
    },
    {
      name: 'Delete',
      action: 'delete',
      display: true
    },
  ];

  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.getAllDevices()
  }

  getAllDevices() {
    this.deviceService.getAllDevices().subscribe({
      next: (response) => {
        this.devices = response;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  onDeviceSaved() {
    this.toggleCreateModal();
    this.getAllDevices();
    this.deviceToEdit = null;
  }

  onDeviceDeleted() {
    this.toggleDeleteModal();
    this.getAllDevices();
    this.deviceToEdit = null;
  }

  toggleCreateModal(){
    this.createModalOn = !this.createModalOn
  }

  cancel(){
    this.toggleCreateModal()
    this.deviceToEdit = null;
  }

  onDelete(deviceId: number) {
    this.deviceToDelete = deviceId;
    this.toggleDeleteModal();
  }

  toggleDeleteModal(){
    this.deleteModalOn = !this.deleteModalOn
    console.log(this.deleteModalOn);

  }

  onEdit(deviceId: number) {
    this.deviceToEdit = deviceId;
    this.toggleCreateModal()
  }

  onAction(event: string, deviceId: number){
    switch (event) {
      case 'edit': this.onEdit(deviceId); break;
      case 'delete': this.onDelete(deviceId); break;
    }
  }
}
