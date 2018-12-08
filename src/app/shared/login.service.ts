import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
	public checkLogin(login: string, pass: string)/*: Observable<number>*/ {
		return this.http.get(`api/users/?login=${login}`)
			.pipe(map((item) => this.checkIt(item, pass))
			);
	}
	private checkIt(response: Response, pass: string) {
		let result = response.json();
		if (result) {
			if (result[0].password == pass) {	
				return true;
			}
			else {
				return false;
			}
		}
		else {
			return false;
		}
	}
  constructor(private http: Http) { }
}