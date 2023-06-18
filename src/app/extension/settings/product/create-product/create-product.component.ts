import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.less']
})
export class CreateProductComponent implements OnInit {
  product: Product;

  get name() {
    return this.productForm.get('name');
  }
  get description() {
    return this.productForm.get('description');
  }

  productForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });


  @Input() productToEdit: number;
  @Output() onProductSaved = new EventEmitter<void>()
  @Output() cancel = new EventEmitter<void>()

  constructor(private fb: FormBuilder, private productService: ProductsService) { }

  ngOnInit(): void {
    if (this.productToEdit) {
      this.getProduct()
    }
  }

  getProduct() {
    this.productService.getProductById(this.productToEdit).subscribe({
      next: (response) => {
        console.log(response);
        if(response.productId) {
          this.setProductFormValue(response);
          this.product = response;
        }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  setProductFormValue(product: Product) {
    this.productForm.controls['description'].setValue(product.description);
    this.productForm.controls['name'].setValue(product.name);
  }

  onSubmit() {
    if (this.productForm.valid) {
      if(this.product && this.product.productId) {
        this.updateProduct()
      } else {
        this.addProduct()
      }
    } else {
      this.validateAllFormFields(this.productForm);
    }
  }

  addProduct(){
    this.productService.addProduct(this.productForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.onProductSaved.next();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  updateProduct(){
    this.productService.updateProduct({...this.productForm.value, productId: this.product.productId}).subscribe({
      next: (response) => {
        console.log(response);
        this.onProductSaved.next();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onCancel(){
    this.cancel.emit();
  }

}
