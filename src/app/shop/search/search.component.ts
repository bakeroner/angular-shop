import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { debounceTime } from 'rxjs/operators';

import {Beer} from './../../shared/beer';
import { DbMethodsService } from './../../shared/db-methods.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
	searchForm: FormGroup;
	filters: string[] = ['All'];
/*  listChange(): void {
    console.log(this.searchForm.category.value);
  }*/
  onValueChange(value: any): void {
    console.log(value);
  }
	onSubmit(form): void {
    console.log(form.value);
    console.log(form.get('category').value);
	} 
  constructor(private dbMeth: DbMethodsService, private http: Http) { }

  ngOnInit() {
    this.dbMeth.getType().subscribe(
  		  result => {this.filters = this.filters.concat(result);},
  		  error => {console.log(error)}
  	);
  	this.searchForm = new FormGroup({
  		category: new FormControl("All"),
  		beerName: new FormControl('')
  	});
    this.searchForm.valueChanges.pipe(debounceTime(1000))
        .subscribe(data => this.onValueChange(data));
    }

}
