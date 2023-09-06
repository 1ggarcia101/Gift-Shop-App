export interface AdminProduct {
    productId?: number;
    productName?: string;
    productDescription?: string;
    productImage?: string;
    productCategory?: ProductCategory;
    productPrice?: number;
    productQuantity?: number;
}

export enum ProductCategory{
    Electronics = 0,
    Clothing = 1,
    Appliances = 2,
    Toys = 3
}