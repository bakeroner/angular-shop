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
	public getItem(userId: number, itemId: number): Observable<any> {
		return this.http.get(`api/shoppingList/?userId=${userId}`)
			.pipe(map(item => this.currentItem(item, itemId)));
	}
	private currentItem(response: Response, itemId: number): any {
		let result = response.json();
		let objForUpdate: {id: number, amount: number} = {id: 0, amount: 0};
		if (result) {
			result.map(item => {
				if (item.product == itemId) {
					objForUpdate.id = item.id;
					objForUpdate.amount = item.amount;
				}
			});
		}
		return objForUpdate;
	}
	public updateItem(userId: number, tableId: number, item: Beer) {
		return this.http.put(`api/shoppingList/${tableId}`, {id: tableId, userId: userId, product: item.id, name: item.name, type: item.type, amount: item.amount, price: item.price});
	}
	public listCheck(): Observable<any> {
		return this.http.get(`api/products`)
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