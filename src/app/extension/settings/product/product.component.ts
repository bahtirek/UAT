import { Component, OnInit } from '@angular/core';
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
  constructor(private productService: ProductsService) { }

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

  onAdd(){

  }

  onProductSaved() {
    this.toggleCreateModal();
    this.getProducts();
  }

  toggleCreateModal(){
    this.createModalOn = !this.createModalOn
  }

}
