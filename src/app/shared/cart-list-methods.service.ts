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
	public addToCart(userId: number, currentItem: Beer) {
		return this.http.post(`api/shoppingList/?userId=${userId}/productList[0]`, currentItem);
	}
/*	public removeFromCart(userId: number, productId: number) {
		this.http.delete(`api/shoppingList/${userId}/productList/${productId}`);
	}*/
	public getList(userId: number): Observable<Beer[]> {
		return this.http.get(`api/shoppingList/?userId=${userId}`)
			.pipe(map((item) => this.getWholeList(item))
			);
	}
	public listCheck(): Observable<any> {
		return this.http.get(`api/shoppingList`)
			.pipe(map((item) => item.json())
			);
	}
	private getWholeList(response: Response) {
		let result = response.json();
		let list: Beer[] = [];
		result[0].productList.map((item) => {
			list.push(item);
		});
		return list;
	}
  constructor(private http: Http) { }
}