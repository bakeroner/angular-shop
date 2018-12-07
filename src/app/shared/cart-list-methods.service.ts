import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

import {Beer} from './beer';

@Injectable({
  providedIn: 'root'
})
export class CartListMethodsService {
	public addProduct(userId: number, currentItem: Beer): any {
		return this.http.post(`api/shoppingList`, {userId: userId, product: currentItem.id, name: currentItem.name, type: currentItem.type, amount: currentItem.amount, price: currentItem.price});
	}
	public removeFromCart(userId: number, productId: number) {
		return this.http.delete(`api/shoppingList/${productId}`);
	}
	public getList(userId: number): Observable<Beer[]> {
		return this.http.get(`api/shoppingList`)
			.pipe(map((item) => this.getWholeList(item, userId))
			);
	}
	public listCheck(): Observable<any> {
		return this.http.get(`api/shoppingList`)
			.pipe(map((item) => item.json())
			);
	}
	private getWholeList(response: Response, user: number) {
		let result = response.json();
		let list: Beer[] = [];
		console.log(result);
		result.map((item) => {
			if (item.userId == user) {
				list.push(item);
			}
		});
		console.log(list);
		return list;
	}
  constructor(private http: Http) { }
}