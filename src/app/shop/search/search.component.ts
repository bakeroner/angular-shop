import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {Beer} from './../../shared/beer';
import { Http } from '@angular/http';

import { DbMethodsService } from './../../shared/db-methods.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
	searchForm: FormGroup;
	filters: string[] = ['All', 'Light', 'Dark'];
	currentResult: Beer[];
/*	gettingData(): void {
			this.http.get('api/products').subscribe(
			result => {this.currentResult = result.json(); console.log(this.currentResult)},
			error => console.log(error.statusText)
		);
	}*/
	onSubmit(searchForm): void {
		  		this.dbMeth.searchData('Item').subscribe(
  			result => {this.currentResult = result}/*,
  			error => {console.log(error)}*/
  		);
/*		this.dbMeth.getData().subscribe(
  			result => {this.currentResult = result},
  			error => {console.log(error)}
  		);*/
/*  		this.dbMeth.filteredData('light').subscribe(
  			result => {this.currentResult = result; console.log(result)},
  			error => {console.log(error)}
  		);*/
	} 
  constructor(private dbMeth: DbMethodsService, private http: Http) { }

  ngOnInit() {
/*  	this.dbMeth.getData().subscribe(
  		result => {this.currentResult = result},
  		error => {console.log(error)}
  	);*/
/*  	  	this.dbMeth.filteredData('light').subscribe(
  			result => {this.currentResult = result},
  			error => {console.log(error)}
  		);*/

  	this.searchForm = new FormGroup({
  		category: new FormControl("", Validators.required),
  		beerName: new FormControl('', [Validators.required])
  	});
  }

}
