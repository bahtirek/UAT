import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoreButtonAction } from 'src/app/interfaces/more-button-action.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { EnvironmentService } from 'src/app/services/environment.service';
import { ProductsService } from 'src/app/services/products.service';
import { VersionService } from 'src/app/services/version.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {

  products: Product[] = []
  createModalOn: boolean;
  productToEdit: number;
  actions: MoreButtonAction[] = [
    {
      name: 'Edit',
      action: 'edit',
      display: true
    },
    {
      name: 'Versions',
      action: 'versions',
      display: true
    },
    {
      name: 'Environments',
      action: 'environments',
      display: true
    },
    {
      name: 'Delete',
      action: 'delete',
      display: true
    },
  ];
  deleteModalOn: boolean;
  productToDelete: number;
  constructor(private productService: ProductsService, private versionService: VersionService, private router: Router, private route: ActivatedRoute, private environmentService: EnvironmentService) { }

  ngOnInit(): void {
    this.getProducts()
  }
  getProducts() {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        console.log(response);
        this.products = response
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  onAction(event: string, id: number){
    switch (event) {
      case 'edit': this.onEdit(id); break;
      case 'versions': this.goToVersions(id); break;
      case 'environments': this.goToEnvironment(id); break;
      case 'delete': this.onDelete(id); break;
    }
  }
  goToEnvironment(id: number) {
    this.environmentService.productId = id;
    this.router.navigate(['../environment'], { relativeTo: this.route, skipLocationChange: true });
  }

  goToVersions(id: number) {
    this.versionService.productId = id;
    this.router.navigate(['../version'], { relativeTo: this.route, skipLocationChange: true });
  }

  onDelete(id: number) {
    this.productToDelete = id;
    this.toggleDeleteModal();
  }

  onEdit(id: number) {
    this.productToEdit = id;
    this.toggleCreateModal()
  }

  onProductSaved() {
    this.toggleCreateModal();
    this.getProducts();
    this.productToEdit = null;
  }

  onProductDeleted() {
    this.toggleDeleteModal();
    this.getProducts();
    this.productToDelete = null;
  }

  toggleCreateModal(){
    this.createModalOn = !this.createModalOn
  }

  toggleDeleteModal(){
    this.deleteModalOn = !this.deleteModalOn
  }

  cancel(){
    this.toggleCreateModal()
    this.productToEdit = null;
  }
}
