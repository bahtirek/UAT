import { Component, Input, OnInit } from '@angular/core';
import { MoreButtonAction } from 'src/app/interfaces/more-button-action.interface';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-add-project-items',
  templateUrl: './add-project-items.component.html',
  styleUrls: ['./add-project-items.component.less']
})
export class AddProjectItemsComponent implements OnInit {

  addItemModalOn: any;


  constructor(private deviceService: DeviceService) { }

  deleteModalOn: boolean;
  itemToDelete: number;
  items: any[] = [];
  projectItems: any[] = [
    {
      "deviceId": 1,
      "name": "Desktop 1920 X 1080",
      "deleted": 0,
      "replacedByDeviceId": null,
      "createdBy": 1,
      "updatedBy": 1,
      "state": true
  },
    {
      "deviceId": 3,
      "name": "Desktop 1366 X 768",
      "deleted": 0,
      "replacedByDeviceId": null,
      "createdBy": 1,
      "updatedBy": 1,
      "state": true
  },
  {
    "deviceId": 11,
    "name": "iPad mini",
    "deleted": 0,
    "replacedByDeviceId": null,
    "createdBy": 1,
    "updatedBy": 1,
    "state": true
},
{
    "deviceId": 15,
    "name": "new device from modal",
    "deleted": 0,
    "replacedByDeviceId": null,
    "createdBy": 1,
    "updatedBy": 1,
    "state": true
}
  ];
  itemName: string = ''

  actions: MoreButtonAction[] = [
    {
      name: 'Delete',
      action: 'delete',
      display: true
    },
  ];

  @Input() set setItemName(value: string) {
    this.setItems(value)
  }

  ngOnInit(): void {
  }

  setItems(value: string) {
    this.itemName = value
    switch (value) {
      case 'device':  this.getDevices(); break;
    }
  }

  onAddItemClick(item: any) {
    console.log(item);
    item.state = true;
    this.projectItems.push(item)
  }

  onDeleteItemClick(projectItem: any, index: number) {
    //httpcall
    console.log(projectItem);
    const itemNameId = `${this.itemName}Id`
    this.pushBackToItems(projectItem, `${this.itemName}Id`)
    this.projectItems.splice(index, 1);
  }

  pushBackToItems(projectItem: any, itemNameId: string) {
    console.log(projectItem, '=', itemNameId);
    console.log(this.items);

    const itemToCompare = this.items.find((item) => {
      return projectItem[itemNameId] == item[itemNameId]
    })
    itemToCompare.state = false
  }

  getDevices(){
    this.deviceService.getAllDevices().subscribe({
      next: (response) => {
        this.items = response;
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {
        this.getProjectDevices()
      }
    })
  }
  getProjectDevices() {
    //http call
    this.compareItems('deviceId')
  }

  compareItems(itemNameId: string) {
    this.projectItems.forEach((projectItem) => {
      const itemToCompare = this.items.find((item) => {
        return projectItem[itemNameId] == item[itemNameId]
      })
      itemToCompare.state = true
    })
  }

  onDelete(itemId: number) {
    this.itemToDelete = itemId;
    this.toggleDeleteModal();
  }

  toggleDeleteModal(){
    this.deleteModalOn = !this.deleteModalOn
  }
  toggleAddItemModal(){
    this.addItemModalOn = !this.addItemModalOn
  }

  onAction(event: string, itemId: number){
    switch (event) {
      case 'delete': this.onDelete(itemId); break;
    }
  }


}
