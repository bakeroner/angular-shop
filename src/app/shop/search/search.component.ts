import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
	searchForm: FormGroup;
	filters: string[] = ['All', 'Light', 'Dark'];
  constructor() { }

  ngOnInit() {
  	this.searchForm = new FormGroup({
  		category: new FormControl("", Validators.required),
  		beerName: new FormControl('', [Validators.required])
  	});
  }

}
