import { Component, OnInit } from '@angular/core';

import { Http } from '@angular/http';

@Component({
  selector: 'app-sign-page',
  templateUrl: './sign-page.component.html',
  styleUrls: ['./sign-page.component.scss']
})
export class SignPageComponent implements OnInit {
	currentResult: any[];
	gettingUsers(): void {
			this.http.get('api/users').subscribe(
			result => {this.currentResult = result.json(); console.log(this.currentResult)},
			error => console.log(error.statusText)
		);
	}
  constructor(private http: Http) { }

  ngOnInit() {
  	this.gettingUsers();

  }

}
