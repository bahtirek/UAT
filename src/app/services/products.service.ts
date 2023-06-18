import { Injectable } from '@angular/core';
import { Product, ServerResponse } from '../interfaces/product.interface';
import { api } from '../data/api-url';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url = api.url;
  product: Product;

  constructor(private http: HttpClient) { }


  productSource = new Subject<Product>()

  getAllProducts(){
    return this.http.get<any>(this.url + '/product-list')
    .pipe(map(response => response?.result))
  }

  getProductById(id: number) {
    const params = new HttpParams().set('productId', id);
    return this.http.get<ServerResponse<Product>>(this.url + '/product', {params})
    .pipe(map(response => response?.result))
  }

  addProduct(product: Product) {
    return this.http.post<ServerResponse<Product>>(this.url + '/product', product)
    .pipe(map(response => response?.result))
  }

  updateProduct(product: Product) {
    return this.http.patch<ServerResponse<Product>>(this.url + '/product', product)
    .pipe(map(response => response?.result))
  }

  deleteProduct(productId: number) {
    const params = new HttpParams()
    .set('productId', productId)
    return this.http.delete<ServerResponse<Product>>(this.url + '/product', {params: params})
    .pipe(map(response => response?.result))
  }
}
