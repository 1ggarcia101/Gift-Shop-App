export interface AdminProduct {
    ProductId?: string;
    ProductName?: string;
    ProductDescription?: string;
    ProductImage?: string;
    ProductCategory?: ProductCategory;
    ProductPrice?: number;
    ProductQuantity?: number;
}

export enum ProductCategory{
    Electronics = 0,
    Clothing = 1,
    Appliances = 2,
    Toys = 3
}