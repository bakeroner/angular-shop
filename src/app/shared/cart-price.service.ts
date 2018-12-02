import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartPriceService {
	price: string = '0.00';
  constructor() { }
}
