import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { CartListMethodsService } from './../../shared/cart-list-methods.service';
import { DbMethodsService } from './../../shared/db-methods.service';
import {Beer} from './../../shared/beer';


import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
	currentItem: Beer;
	subscription: any;
  counter: number = 1;
	currentId: any = +this.route.snapshot.paramMap.get('id');
  decrement(): void {
    if (this.counter > 1) {
      this.counter--;
    }
  }
  increment(): void {
    this.counter++;
  }
	goBack(): void {
		this.router.navigate(["../"], {relativeTo: this.route});
	}
	getItem(): void {
		if (this.currentId) {
			this.subscription = this.dbMeth.getElement(this.currentId).subscribe(
				result => {this.currentItem = result},
				error => {console.log(error)}
			);
		}
		else {
			console.log('Smth go wrong');
		}
	}
	toCard(product: Beer): void {
    	this.cartListMeth.addProduct(1, product)/*.subscribe(
      		result => {
      			console.log(result);
      		}
      	)*/;
  	}
  constructor(private http: Http, private cartListMeth: CartListMethodsService, private dbMeth: DbMethodsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  	if (this.currentId) {
  		this.getItem();
  	}
  }
  ngOnDestroy() {
  	console.log('destroyed');
  	this.subscription.unsubscribe();
  }

}
