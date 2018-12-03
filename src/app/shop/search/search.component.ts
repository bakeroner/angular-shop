import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

/*import {Beer} from './../../shared/beer';*/
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
	currentResult: any[];
	/*currentResult: Beer[];*/
	gettingData(): void {
			this.http.get('api/products').subscribe(
			result => {this.currentResult = result.json(); console.log(this.currentResult)},
			error => console.log(error.statusText)
		);
	}
	onSubmit(searchForm): void {
		this.gettingData();
/*		this.currentResult = this.dbMeth.getData();
		console.log(this.currentResult);
		console.log(this.dbMeth.getData());*/
		
	} 
  constructor(private dbMeth: DbMethodsService, private http: Http) { }

  ngOnInit() {
  	this.gettingData();
  	this.searchForm = new FormGroup({
  		category: new FormControl("", Validators.required),
  		beerName: new FormControl('', [Validators.required])
  	});
  }

}
