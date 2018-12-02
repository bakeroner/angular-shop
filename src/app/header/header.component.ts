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
