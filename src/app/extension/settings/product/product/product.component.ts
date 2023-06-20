import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoreButtonAction } from 'src/app/interfaces/more-button-action.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';

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

  constructor(private productService: ProductsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  onProductSaved() {
    this.toggleCreateModal();
    this.getProducts();
    this.productToEdit = null;
  }

  toggleCreateModal(){
    this.createModalOn = !this.createModalOn
  }

  cancel(){
    this.toggleCreateModal()
    this.productToEdit = null;
  }

  goToDetails(id: number) {
    this.productService.productId = id;
    this.router.navigate(['details'], { relativeTo: this.route, skipLocationChange: true });
  }
}
