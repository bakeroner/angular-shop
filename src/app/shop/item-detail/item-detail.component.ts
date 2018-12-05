import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { DbMethodsService } from './../../shared/db-methods.service';
import {Beer} from './../../shared/beer';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
	currentItem: Beer;
	currentId: any = +this.route.snapshot.paramMap.get('id');
	goBack(): void {
		this.router.navigate(["../"], {relativeTo: this.route});
	}
	getItem(): void {
		if (this.currentId) {
			this.dbMeth.getElement(this.currentId).subscribe(
				result => {this.currentItem = result},
				error => {console.log(error)}
			);
		}
		else {
			console.log('Smth go wrong');
		}
	}
  constructor(private dbMeth: DbMethodsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  	if (this.currentId) {
  		this.getItem();
  	}
  }

}
