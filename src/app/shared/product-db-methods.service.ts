import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

import {Beer} from './beer';

@Injectable({
  providedIn: 'root'
})
export class ProductDbMethodsService {
/*	public addToCart(currentId: number): Observable<Beer[]> {
		return this.http.get('api/shoppingList')
			.pipe(map(() => {}));
	}
	public removeFromCart(): Observable<Beer[]> {
		return this.http.get('api/shoppingList')
			.pipe(map(() => {}));
	}*/
	public priceSum(userId: number): Observable<number> {
		return this.http.get('api/shoppingList')
			.pipe(map((item) => this.priceSummary(item, userId))
			);
	}
	public getList(userId: number): Observable<Beer[]> {
		return this.http.get('api/shoppingList')
			.pipe(map((item) => this.getWholeList(item, userId))
			);
	}
	private getWholeList(response: Response, user: number) {
		let result = response.json();
		let list: Beer[] = [];
		for (let i = 0; i < result.length; i++) {
			if (result[i] && result[i].userId == user) {
				list = result[i].productList;
			}
		}
		console.log(list);
		return list;
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