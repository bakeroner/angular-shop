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
	public addUser(login: string, pass: string)/*: Observable<number>*/ {
		return this.http.post(`api/users`, {login: login, password: pass});
	}
	public checkUser(login: string)/*: Observable<number>*/ {
		return this.http.get(`api/users/?login=${login}`)
			.pipe(map((item) => {
				if (item.json().length) {
					return false;
				}
				else {
					return true;
				}
			}));
	}
	//dfdfdf
	public getId(login: string) {
		return this.http.get(`api/users/?login=${login}`)
			.pipe(map(item => item.json()));
	}
	//dfdfdf
	private checkIt(response: Response, pass: string) {
		let result = response.json();
		if (result[0]) {
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