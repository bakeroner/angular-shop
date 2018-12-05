import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
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
  listSubscription: any;
  valueSubscription: any;
	filters: string[] = ['All'];
  onValueChange(value: any): void {
    this.router.navigate(["/shop", {category: value.category, name: value.beerName}], {relativeTo: this.route});
  }
	onSubmit(form: FormGroup): void {
    this.router.navigate(["/shop", {category: form.value.category, name: form.value.beerName}], {relativeTo: this.route});
	} 
  constructor(private router: Router, private route: ActivatedRoute, private dbMeth: DbMethodsService, private http: Http) { }

  ngOnInit() {
    this.listSubscription = this.dbMeth.getType().subscribe(
  		  result => {this.filters = this.filters.concat(result);},
  		  error => {console.log(error)}
  	);
  	this.searchForm = new FormGroup({
  		category: new FormControl("All"),
  		beerName: new FormControl('')
  	});
    this.valueSubscription = this.searchForm.valueChanges.pipe(debounceTime(500))
        .subscribe(data => this.onValueChange(data));
    }
  ngOnDestroy() {
    console.log('destroyed');
    this.listSubscription.unsubscribe();
    this.valueSubscription.unsubscribe();
  }

}
