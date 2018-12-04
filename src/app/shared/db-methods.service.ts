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
			.pipe(map(this.extractData));
	}
	public filteredData(filterText: string): Observable<Beer[]> {
		return this.http.get('api/products')
			.pipe(map((item) => this.extractDataFilter(item, filterText))
			);
	}
	public searchData(searchText: string): Observable<Beer[]> {
		return this.http.get('api/products')
			.pipe(map((item) => this.extractDataSearch(item, searchText))
			);
	}
	private extractData(response: Response) {
		let result = response.json();
		let items: Beer[] = [];
		for (let i = 0; i < result.length; i++) {
			items.push(new Beer(result[i].id, result[i].name, result[i].color, result[i].amount, result[i].price));
		}
		return items;
	}
	private extractDataSearch(response: Response, searchText: string) {
		let result = response.json();
		let items: Beer[] = [];
		for (let i = 0; i < result.length; i++) {
			if (result[i] && result[i].name.match(searchText)) {
				items.push(new Beer(result[i].id, result[i].name, result[i].color, result[i].amount, result[i].price));
			}
		}
		return items;
	}
	private extractDataFilter(response: Response, filter: string) {
		let result = response.json();
		let items: Beer[] = [];
		for (let i = 0; i < result.length; i++) {
			if (result[i].color == filter) {
				items.push(new Beer(result[i].id, result[i].name, result[i].color, result[i].amount, result[i].price));
			}          
        }
		return items;
	}
	private errorHandler(error: any): any {/*don't work*/
	    let errorMessage = error.status + error.statusText;
		console.log(error.statusText);
		return errorMessage;
    }
    
  constructor(private http: Http) { }
}
