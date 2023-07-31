import { Component, Input, OnInit } from '@angular/core';
import { MoreButtonAction } from 'src/app/interfaces/more-button-action.interface';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.less']
})
export class ProjectDetailsComponent implements OnInit {
  addItemModalOn: any;


  constructor(private deviceService: DeviceService) { }

  deleteModalOn: boolean;
  itemToDelete: number;
  items: any[] = []
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

  getDevices(){

  }

  onCheck(itemId: number){
    console.log(itemId);
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
