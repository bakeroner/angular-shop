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
		return this.http.post(`api/shoppingList`, {userId: userId, product: currentItem});
		/*return this.http.post(`api/shoppingList`, {userId: userId, product: currentItem});*/
/*		this.getList(userId).subscribe(
			res => {
				console.log(res);
				amount = this.getItem(res, currentItem.id);
				console.log(amount);	
				if (amount) {
					currentItem.amount = amount+1;
					console.log(currentItem);
					return this.http.put(`api/shoppingList/?userId=${userId}`, {userId: userId, product: currentItem});
				}
				else {
					currentItem.amount = 1;
					console.log(currentItem);
					return this.http.post(`api/shoppingList`, {userId: userId, product: currentItem});
				}
			}
		);*/
	}

/*	public removeFromCart(userId: number, productId: number) {
		this.http.delete(`api/shoppingList/${userId}/productList/${productId}`);
	}*/
/*	private getItem(list: any, id: number): any {
		let amount: number = 0;
		console.log(list);
		list.map((item) => {
			if (item && item.id == id) {
				amount = item.amount;
			}
		})
			console.log(amount);
			return amount;
		
	}*/
	public getList(userId: number): Observable<Beer[]> {
		return this.http.get(`api/shoppingList`)
			.pipe(map((item) => this.getWholeList(item, userId))
			);
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
				list.push(item.product);
			}
		});
		console.log(list);
		return list;
	}
  constructor(private http: Http) { }
}