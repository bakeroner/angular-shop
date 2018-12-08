import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
	regForm: FormGroup;
  constructor() { }

  ngOnInit() {
  	this.regForm = new FormGroup({
  		login: new FormControl('', [Validators.required, Validators.minLength(8)]),
  		pass: new FormControl('', [Validators.required, Validators.minLength(8)]),
  		passConfirm: new FormControl('', [Validators.required, Validators.minLength(8)])
  	});
  }

}
