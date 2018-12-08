import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { LoginService } from './../../shared/login.service';

@Component({
  selector: 'app-sign-page',
  templateUrl: './sign-page.component.html',
  styleUrls: ['./sign-page.component.scss']
})
export class SignPageComponent implements OnInit {
	loginForm: FormGroup;
	alert: boolean = false;
	onLogin(form: FormGroup): void {
		if (form.valid) {
			this.loginService.checkLogin(form.value.login, form.value.pass).toPromise()
				.then((item) => {
					if (item) {
						sessionStorage.setItem('user', `${form.value.login}`);
						this.router.navigate(["/home"]);
					}
					else {
						this.alert = true;
					}
				});
		}
	}
  constructor(private router: Router, private http: Http, private loginService: LoginService) { }

  ngOnInit() {
  	this.loginForm = new FormGroup({
  		login: new FormControl('', [Validators.required/*, Validators.minLength(8)*/]),
  		pass: new FormControl('', [Validators.required/*, Validators.minLength(8)*/])
  	});
  }

}
