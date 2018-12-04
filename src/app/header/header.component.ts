import { Component, OnInit } from '@angular/core';

import { CartPriceService } from './../shared/cart-price.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	currentPrice: string;

  constructor(private priceService: CartPriceService) { }

  ngOnInit() {
  	this.currentPrice = this.priceService.price;
  }

}
function headerFunc() {
	let header = document.getElementById('header');
	let currentPosition = header.offsetTop;
	if (window.pageYOffset > currentPosition) {
    	header.classList.add("sticky");
  	} 
  	else {
    	header.classList.remove("sticky");
  	}
}
window.onscroll = () => {
  	headerFunc();
}
