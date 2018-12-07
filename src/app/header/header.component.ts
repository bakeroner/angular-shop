import { Component, OnInit, OnChanges } from '@angular/core';

import { DbMethodsService } from './../shared/db-methods.service';
import { CartListMethodsService } from './../shared/cart-list-methods.service';
import { CartPriceService } from './../shared/cart-price.service';
import {Beer} from './../shared/beer';
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
  showList(): void {
    if (!this.show) {
      this.cartListSubscription = this.cartListMeth.getList(1).subscribe(
        result => {
          this.currentShoppingList = result;
          if (this.currentShoppingList) {
            this.show = true;
            console.log(this.currentShoppingList);
          } 
        },
        error => {console.log(error)})
    }
    else {
      this.show = false;
      this.cartListSubscription.unsubscribe();
    }
  }
  deleteElement(id: number): void {
    this.cartListMeth.removeFromCart(1, id).subscribe(
      res => console.log(res));
    let target: Beer;
/*    this.currentShoppingList.map((item) => {
      if (item.product == id) {
        target = new Beer(id, item.name, item.type, item.amount, item.price);
      }
    });*/
    console.log(target);
/*    this.dbMeth.storageUpdate(target).subscribe(
      result => {console.log(result)});*/
  }
  constructor(private dbMeth: DbMethodsService, private cartListMeth: CartListMethodsService, private priceService: CartPriceService) { }

  ngOnInit() {
    this.priceService.priceSum(1).subscribe(
      result => {
        this.currentPrice = result;
      },
      error => {console.log(error)}
      )
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
