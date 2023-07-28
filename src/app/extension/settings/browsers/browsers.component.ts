import { Component, OnInit } from '@angular/core';
import { Browser } from 'src/app/interfaces/browser.interface';
import { MoreButtonAction } from 'src/app/interfaces/more-button-action.interface';
import { BrowserService } from 'src/app/services/browser.service';

@Component({
  selector: 'app-browsers',
  templateUrl: './browsers.component.html',
  styleUrls: ['./browsers.component.less']
})
export class BrowsersComponent implements OnInit {

  browsers: Browser[] = [];
  browser: Browser;
  createModalOn: boolean;
  browserToEdit: number;
  browserToDelete: number;
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

  constructor(private browserService: BrowserService) { }

  ngOnInit(): void {
    this.getAllBrowsers()
  }

  getAllBrowsers() {
    this.browserService.getAllBrowsers().subscribe({
      next: (response) => {
        this.browsers = response;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  onBrowserSaved() {
    this.toggleCreateModal();
    this.getAllBrowsers();
    this.browserToEdit = null;
  }

  onBrowserDeleted() {
    this.toggleDeleteModal();
    this.getAllBrowsers();
    this.browserToEdit = null;
  }

  toggleCreateModal(){
    this.createModalOn = !this.createModalOn
  }

  cancel(){
    this.toggleCreateModal()
    this.browserToEdit = null;
  }

  onDelete(browserId: number) {
    this.browserToDelete = browserId;
    this.toggleDeleteModal();
  }

  toggleDeleteModal(){
    this.deleteModalOn = !this.deleteModalOn
    console.log(this.deleteModalOn);

  }

  onEdit(browserId: number) {
    this.browserToEdit = browserId;
    this.toggleCreateModal()
  }

  onAction(event: string, browserId: number){
    switch (event) {
      case 'edit': this.onEdit(browserId); break;
      case 'delete': this.onDelete(browserId); break;
    }
  }
}
