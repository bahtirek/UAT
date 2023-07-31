import { Component, Input, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.less']
})
export class AddItemsComponent implements OnInit {
  createModalOn: boolean;

  constructor(private deviceService: DeviceService) { }

  itemName: string = '';
  items: any[] = [];

  ngOnInit(): void {
  }

  @Input() set setItemName(value: string) {
    this.setItems(value)
  }

  setItems(value: string) {
    this.itemName = value
    switch (value) {
      case 'device':  this.getDevices(); break;

    }
  }

  getDevices(){
    this.deviceService.getAllDevices().subscribe({
      next: (response) => {
        this.items = response;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  toggleCreateModal(){
    this.createModalOn = !this.createModalOn
  }

  onDeviceSaved() {
    this.toggleCreateModal();
    this.setItems(this.itemName)
  }

  cancel(){
    this.toggleCreateModal()
  }

}
