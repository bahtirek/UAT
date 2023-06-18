import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.less']
})
export class DeleteProductComponent implements OnInit {

  @Input() productToDelete: number;
  @Output() onProductDeleted = new EventEmitter<void>()
  @Output() cancel = new EventEmitter<void>()

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
  }

  onCancel(){
    this.cancel.emit();
  }

  onDelete(){
    this.productService.deleteProduct(this.productToDelete).subscribe({
      next: (response) => {
        console.log(response);
        this.onProductDeleted.next();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
