import { Component, ViewContainerRef } from '@angular/core';
import { AdminProduct } from 'src/app/models/adminProducts';
import { AdminService } from 'src/app/services/admin.service';
import { ProductCategory } from 'src/app/models/adminProducts';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  productObj : AdminProduct = {
    ProductId: '',
    ProductName: '',
    ProductDescription: '',
    ProductImage: '',
    ProductCategory: 0,
    ProductPrice: 0,
    ProductQuantity: 0
  }

  constructor (
    private _adminService: AdminService,
    private _viewContainerRef: ViewContainerRef
    ){}

    ngOnInit(): void {
    
    }

    public getProductCardInfo(){
      this._adminService.getAdminProducts().subscribe(
        (product: AdminProduct) => {
          this.productObj = product;
        },
        error => {
          console.error('Error fetching product:', error);
        }
    )}
    



}
