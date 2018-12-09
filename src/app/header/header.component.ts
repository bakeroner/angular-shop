import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { DbMethodsService } from './../shared/db-methods.service';
import { CartListMethodsService } from './../shared/cart-list-methods.service';
/*import { CartPriceService } from './../shared/cart-price.service';*/
import { SharedValuesService } from './../shared/shared-values.service';
import { NumToFloatService } from './../shared/num-to-float.service';
import {Beer} from './../shared/beer';

import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	currentPrice: number = 0;
  currentShoppingList: any[] = [];
  show: boolean = false;
  cartListSubscription: any;
  priceSubscription: any;
  isSign: any;
  showList(): void {
    if (!this.show) {
      let userId = sessionStorage.getItem('id');
      this.cartListSubscription = this.cartListMeth.getList(+userId).subscribe(
        result => {
          this.currentShoppingList = result;
          if (this.currentShoppingList) {
           this.currentShoppingList.map((item) => {
             this.currentPrice += item.price*item.amount;
           });
            this.show = true;
            console.log(this.currentShoppingList);
          } 
        },
        error => {console.log(error)})
    }
    else {
      this.show = false;
      this.currentPrice = 0;
      this.cartListSubscription.unsubscribe();
    }
  }
  deleteElement(id: number, productId: number, index: number): void {
    let userId = sessionStorage.getItem('id');
    this.cartListMeth.removeFromCart(+userId, id).toPromise()
      .then(res => console.log(res));
    this.currentPrice = this.currentPrice - this.currentShoppingList[index].amount*this.currentShoppingList[index].price; 
    let itemAmount = this.currentShoppingList[index].amount;
    this.dbMeth.getElement(productId).toPromise()
    .then((item) => {
      if (item.amount) {
        item.amount = item.amount + itemAmount;
      }
      else {
        item.amount = itemAmount;
      }
      this.dbMeth.storageUpdate(item).toPromise()
        .then(res => console.log(res));
    })
    this.currentShoppingList[index] = {};
  }
  orderConfirm(): void {
    if (this.currentPrice) {
      this.router.navigate(["/confirm"]);
      this.currentShoppingList.map((item) => {
        let userId = sessionStorage.getItem('id');
        this.cartListMeth.removeFromCart(+userId, item.id).toPromise()
          .then (response => console.log(response));
      });
      this.currentShoppingList = [];
      this.currentPrice = 0;
    }
  }
  signOut(): void {
    sessionStorage.clear();
    this.isSign = '';
  }
  constructor(private floatMeth: NumToFloatService, 
    private router: Router, 
    private dbMeth: DbMethodsService, 
    private cartListMeth: CartListMethodsService, 
    /*private priceService: CartPriceService,*/
    private shared: SharedValuesService) { }

  ngOnInit() {
    this.isSign = sessionStorage.getItem('user');
    this.shared.usernameObservable.subscribe(value => {
      this.isSign = value;
      console.log(value);
    })
  }

}
function headerFunc() {
	let header = document.getElementById('header');
	let fakeDiv = document.getElementById('fakeDiv');
	let currentPosition = header.offsetTop;
	if (window.pageYOffset > currentPosition) {
    	header.classList.add("sticky");
    	fakeDiv.classList.add("stickyPadding");
  	} 
  	else {
    	header.classList.remove("sticky");
    	fakeDiv.classList.remove("stickyPadding");
  	}
}
window.onscroll = () => {
  	headerFunc();
}
