import { Component, OnInit } from '@angular/core';

import { CartListMethodsService } from './../shared/cart-list-methods.service';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
	checkFunc(): void {
		this.check.listCheck().subscribe(
			result => {console.log(result);}
		);
	}
  checkUser(): void {
    this.check.getList(1).subscribe(
      result => {console.log(result);}
    );
  }
  constructor(private check: CartListMethodsService) { }

  ngOnInit() {
  }

}
