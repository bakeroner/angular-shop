import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable, of } from 'rxjs';

import {Beer} from './beer';

@Injectable({
  providedIn: 'root'
})
export class DbMethodsService {
	public getData(): any {
		this.http.get('api/products').subscribe(
			result => {
				console.log(result.json());
				return result.json(); 
			},
			error => {
				this.errorHandler(error);
			}
		);
	}
	/*	public getData(): Observable<Beer[]> {
		this.http.get('api/products').subscribe(
			result => {
				console.log(result.json());
				return result.json(); 
			},
			error => {
				this.errorHandler(error);
			}
		);
	}*/
	public fliteredData(filter: string): void {
		this.http.get('api/products').subscribe(
			result => {
				let resultList = result.json();
				resultList.map((item) => {
					console.log(item);
					if (item.color == filter) {
						console.log('after filtered' + item);
						return item;
					}
				});
			},
			error => {
				this.errorHandler(error);
			}
		);
	}
	/*	public fliteredData(filter: string): Observable<Beer[]> {
		this.http.get('api/products').subscribe(
			result => {
				return of(result.find(item => item.color == filter));
			},
			error => {
				this.errorHandler(error);
			}
		);
	}*/
	public searchData(searchText: string): void {
		this.http.get('api/products').subscribe(
			result => {
				let resultList = result.json();
				resultList.map((item) => {
					console.log(item);
					if (item.name.match(searchText)) {
						console.log('After filtered' + item);
						return item;
					}
				});
			},
			error => {
				this.errorHandler(error);
			}
		);
	}
	private errorHandler(error: any): any {
	    let errorMessage = error.status + error.json().error;
		console.log(error.statusText);
		return errorMessage;
    }
    
  constructor(private http: Http) { }
}
