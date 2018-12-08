import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from './../../shared/login.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
	regForm: FormGroup;
	onRegistration(form: FormGroup) {
		this.loginService.checkUser(form.value.login).toPromise()
			.then((item) => {
				if (item) {
					this.loginService.addUser(form.value.login, form.value.pass).toPromise()
						.then((item) => {
							sessionStorage.setItem('user', `${form.value.login}`);
							this.router.navigate(["/home"]);
						});
				}
				else {
					console.log('alreay used');
				}
			});

  	}
  constructor(private router: Router, private loginService: LoginService) { }
  ngOnInit() {
  	this.regForm = new FormGroup({
  		login: new FormControl('', [Validators.required, Validators.minLength(8)]),
  		pass: new FormControl('', [Validators.required, Validators.minLength(8)]),
  		passConfirm: new FormControl('', [Validators.required, Validators.minLength(8)])
  	});
  }

}
