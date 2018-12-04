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
	public getElement(idForSearch: number): Observable<Beer> {
		return this.http.get('api/products')
			.pipe(map((item) => this.extractElement(item, idForSearch))
			);
	}
	public getType(): Observable<string[]> {
		return this.http.get('api/products')
			.pipe(map(this.getTypeList));
	}
	private getTypeList(response: Response) {
		let result = response.json();
		let typeList: string[] = [];
		for (let i = 0; i < result.length; i++) {
				let counter = 0;
				typeList.map((item) => {
					if (item.toLowerCase() == result[i].type.toLowerCase() && result[i].amount > 0) {
						counter++;
					}
				})
				if (!counter) {
					typeList.push(result[i].type);
				}
		}
		return typeList;		
	}
	private extractElement(response: Response, idForSearch: number) {
		let result = response.json();
		let item: Beer;
		for (let i = 0; i < result.length; i++) {
			if (result[i] && result[i].id == idForSearch) {
				item = new Beer(result[i].id, result[i].name, result[i].type, result[i].amount, result[i].price);
			}
		}
		return item;
	}
	private extractData(response: Response) {
		let result = response.json();
		let items: Beer[] = [];
		for (let i = 0; i < result.length; i++) {
			if (result[i].amount > 0) {
				items.push(new Beer(result[i].id, result[i].name, result[i].type, result[i].amount, result[i].price));
			}
		}
		return items;
	}
	private extractDataSearch(response: Response, searchText: string) {
		let result = response.json();
		let items: Beer[] = [];
		for (let i = 0; i < result.length; i++) {
			if (result[i] && result[i].name.match(searchText && result[i].amount > 0)) {
				items.push(new Beer(result[i].id, result[i].name, result[i].type, result[i].amount, result[i].price));
			}
		}
		return items;
	}
	private extractDataFilter(response: Response, filter: string) {
		let result = response.json();
		let items: Beer[] = [];
		for (let i = 0; i < result.length; i++) {
			if (result[i].type == filter && result[i].amount > 0) {
				items.push(new Beer(result[i].id, result[i].name, result[i].type, result[i].amount, result[i].price));
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
