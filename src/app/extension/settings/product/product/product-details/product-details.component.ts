import { Component, Input, OnInit } from '@angular/core';
import { MoreButtonAction } from 'src/app/interfaces/more-button-action.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { Tab } from 'src/app/interfaces/tab.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.less']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;
  deleteModalOn: boolean;
  productToDelete: number;
  activeTab: string = 'versions';
  productToEdit: number;
  createModalOn: boolean;
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
  tabs: Tab[] = [
    {id: 'versions', label: 'Versions', isActive: true},
    {id: 'environments', label: 'Environments', isActive: false}
  ];

  constructor(private productService: ProductsService,) { }

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct() {
    const productId = this.productService.productId;
    this.productService.getProductById(productId).subscribe({
      next: (response) => {
        this.product = response
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  onProductSaved() {
    this.getProduct();
    this.toggleCreateModal();
    this.productToEdit = null;
  }

  cancel(){
    this.toggleCreateModal()
    this.productToEdit = null;
  }
  onDelete() {
    this.productToDelete = this.product.productId;
    this.toggleDeleteModal();
  }

  onEdit() {
    this.productToEdit = this.product.productId;
    this.toggleCreateModal()
  }

  toggleCreateModal(){
    this.createModalOn = !this.createModalOn
  }

  onProductDeleted() {
    this.toggleDeleteModal();
    this.productToDelete = null;
  }

  toggleDeleteModal(){
    this.deleteModalOn = !this.deleteModalOn
  }

  onAction(event: string){
    switch (event) {
      case 'edit': this.onEdit(); break;
      case 'delete': this.onDelete(); break;
    }
  }

  setActiveTab(activeTab: string){
    this.activeTab = activeTab
  }

}
