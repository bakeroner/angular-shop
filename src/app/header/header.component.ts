import { Component, OnInit } from '@angular/core';

import { CartListMethodsService } from './../shared/cart-list-methods.service';
import { CartPriceService } from './../shared/cart-price.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	currentPrice: string;
  currentShoppingList: any[] = [];
  show: boolean = false;
  cartListSubscription: any;
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
  constructor(private cartListMeth: CartListMethodsService, private priceService: CartPriceService) { }

  ngOnInit() {
  	/*this.currentPrice = this.priceService.price;*/
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
