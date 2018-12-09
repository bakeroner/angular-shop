import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedValuesService {
	public usernameObservable = new Subject<string>();
	emitUsername(value) {
		this.usernameObservable.next(value);
	}
  constructor(private http: Http) { }
}