import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartPriceService {
	public priceSum(userId: number): Observable<number> {
		return this.http.get('api/shoppingList')
			.pipe(map((item) => this.priceSummary(item, userId))
			);
	}
	private priceSummary(response: Response, user: number) {
		let result = response.json();
		let price: number = 0;
		for (let i = 0; i < result.length; i++) {
			if (result[i] && result[i].userId == user) {
				result[i].productList.map((item) => {
					price += item.amount * item.price;
				});
			}
		}
		console.log(price);
		return price;
	}
  constructor(private http: Http) { }
}
