import { Component, OnInit } from '@angular/core';
import { MoreButtonAction } from 'src/app/interfaces/more-button-action.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { Version } from 'src/app/interfaces/version.interface';
import { ProductsService } from 'src/app/services/products.service';
import { VersionService } from 'src/app/services/version.service';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.less']
})
export class VersionComponent implements OnInit {

  versions: Version[] = []
  createModalOn: boolean;
  versionToEdit: number;
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
  deleteModalOn: boolean;
  versionToDelete: number;
  product: Product;

  constructor(private productService: ProductsService, private versionService: VersionService) { }

  ngOnInit(): void {
    this.getVersions();
    this.getProduct();
  }

  getProduct() {
    this.productService.getProductById(this.versionService.productId).subscribe({
      next: (response) => {
        console.log(response);
        this.product = response
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  getVersions() {
    this.versionService.getAllVersions().subscribe({
      next: (response) => {
        console.log(response);
        this.versions = response
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  onAction(event: string, id: number){
    switch (event) {
      case 'edit': this.onEdit(id); break;
      case 'delete': this.onDelete(id); break;
    }
  }

  onDelete(id: number) {
    this.versionToDelete = id;
    this.toggleDeleteModal();
  }

  onEdit(id: number) {
    this.versionToEdit = id;
    this.toggleCreateModal()
  }

  onVersionSaved() {
    this.toggleCreateModal();
    this.getVersions();
    this.versionToEdit = null;
  }

  onVersionDeleted() {
    this.toggleDeleteModal();
    this.getVersions();
    this.versionToDelete = null;
  }

  toggleCreateModal(){
    this.createModalOn = !this.createModalOn
  }

  toggleDeleteModal(){
    this.deleteModalOn = !this.deleteModalOn
  }

  cancel(){
    this.toggleCreateModal()
    this.versionToEdit = null;
  }
}
