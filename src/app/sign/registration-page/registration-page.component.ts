import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from './../../shared/login.service';
import { SharedValuesService } from './../../shared/shared-values.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
	regForm: FormGroup;
	alert: boolean = false;
	emitUsername(value) {
		this.shared.emitUsername(value);
	}
	onRegistration(form: FormGroup) {
		if (form.valid) {
			this.loginService.checkUser(form.value.login).toPromise()
				.then((item) => {
					if (item) {
						this.loginService.addUser(form.value.login, form.value.pass).toPromise()
							.then((item) => {
								console.log(item);
								let userId = item.json().id;
								sessionStorage.setItem('user', `${form.value.login}`);
								sessionStorage.setItem('id', `${userId}`);
								this.emitUsername(`${form.value.login}`);
								this.router.navigate(["/home"]);
							});
					}
					else {
						this.alert = true;
					}
				});
		}
  	}
  constructor(
  	private router: Router, 
  	private loginService: LoginService,
  	private shared: SharedValuesService) { }
  ngOnInit() {
  	this.regForm = new FormGroup({
  		login: new FormControl('', [Validators.required/*, Validators.minLength(8)*/]),
  		pass: new FormControl('', [Validators.required, Validators.minLength(8)]),
  		passConfirm: new FormControl('', [Validators.required, Validators.minLength(8)])
  	});
  }

}
