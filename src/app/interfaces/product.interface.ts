export interface Product {
  productId?: number,
  name?: string,
  description?: string
}

export interface ServerResponse <T> {
  result: T
}
