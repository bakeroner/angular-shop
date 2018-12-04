import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

import {Beer} from './beer';

@Injectable({
  providedIn: 'root'
})
export class DbMethodsService {
	public getData(): Observable<Beer[]> {
		return this.http.get('api/products')
			.pipe(map(this.extractData)) 
			/*.pipe(catchError((e: any) => this.errorHandler(e)))*/;
	}
		public filteredData(filterText: string): Observable<any> {
		return this.http.get('api/products')
			.pipe(map((item) => {this.extractDataFilter(item, filterText)})
				/*catchError(error => console.log('ERROR: ', error))*/
			);
		}
/*	public searchData(searchText: string): Observable<Beer[]> {
		return this.http.get('api/products')
			.pipe(map(
				(item: Response) => this.extractDataSearch(item, searchText)
			));
	}*/
	private extractData(response: Response) {
		let result = response.json();
		console.log(result);
		/*let item = new Beer(result.id, result.name, result.color, result.amount, result.price);*/
		return result;
	}
	private extractDataSearch(response: Response, searchText: string) {
		let result = response.json();
		let items: Beer[] = [];
				for (let i = 0; result.length; i++) {
			if (result[i] && result[i].name.match(searchText)) {
				items.push(new Beer(result[i].id, result[i].name, result[i].color, result[i].amount, result[i].price));
			}
			else {
				console.log(result[i]);
			}
		}
		console.log(items);
		return items;
	}
	private extractDataFilter(response: Response, filter: string) {
		let result = response.json();
		console.log(result);
		console.log(filter);
		let items: Beer[] = [];
		for (let i = 0; result.length; i++) {
			if (result[i] && result[i].color == filter) {
				items.push(new Beer(result[i].id, result[i].name, result[i].color, result[i].amount, result[i].price));
			}
			else {
				console.log(result[i]);
			}
		}
		console.log(items);
		return items;
	}
	private errorHandler(error: any): any {/*don't work*/
	    let errorMessage = error.status + error.statusText;
		console.log(error.statusText);
		return errorMessage;
    }
    
  constructor(private http: Http) { }
}
