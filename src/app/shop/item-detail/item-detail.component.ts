import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { CartListMethodsService } from './../../shared/cart-list-methods.service';
import { DbMethodsService } from './../../shared/db-methods.service';
import {Beer} from './../../shared/beer';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
	currentItem: Beer;
	subscription: any;
	currentId: any = +this.route.snapshot.paramMap.get('id');
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
    	this.cartListMeth.addToCart(1, product).subscribe(
      		result => {console.log(result);});
  	}
  constructor(private cartListMeth: CartListMethodsService, private dbMeth: DbMethodsService, private router: Router, private route: ActivatedRoute) { }

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
