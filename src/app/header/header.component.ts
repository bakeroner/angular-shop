import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { DbMethodsService } from './../shared/db-methods.service';
import { CartListMethodsService } from './../shared/cart-list-methods.service';
import { CartPriceService } from './../shared/cart-price.service';
import { NumToFloatService } from './../shared/num-to-float.service';
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
  deleteElement(id: number, index: number): void {
    console.log('id: '+ id);
    this.cartListMeth.removeFromCart(1, id).toPromise()
      .then(res => console.log(res));
    this.currentPrice = this.currentPrice - this.currentShoppingList[index].amount*this.currentShoppingList[index].price; 
    
    this.dbMeth.getElement(id).toPromise()//fix it
    .then((item) => {
      console.log(item);
      if (item.amount) {
        item.amount = +item.amount + +this.currentShoppingList[index].amount;
        console.log(item.amount);
      }
      else {
        item.amount = +this.currentShoppingList[index].amount;
        console.log(item.amount);
      }
      console.log(item);
      this.dbMeth.storageUpdate(item).toPromise()
        .then(res => console.log(res));
    })
    this.currentShoppingList[index] = {};
  }
  orderConfirm(): void {
    if (this.currentPrice) {
      this.router.navigate(["/confirm"]);
      this.currentShoppingList.map((item) => {
        this.cartListMeth.removeFromCart(1, item.id).toPromise()
          .then (response => console.log(response));
      });
      this.currentShoppingList = [];
      this.currentPrice = 0;
    }
  }
  constructor(private floatMeth: NumToFloatService, private router: Router, private dbMeth: DbMethodsService, private cartListMeth: CartListMethodsService, private priceService: CartPriceService) { }

  ngOnInit() {
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
