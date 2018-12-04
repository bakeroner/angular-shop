import { Component, OnInit } from '@angular/core';

import { DbMethodsService } from './../../shared/db-methods.service';
import { Beer } from './../../shared/beer';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
	resultList: Beer[];
  constructor(private dbMeth: DbMethodsService) { }

  ngOnInit() {
	this.dbMeth.getData().subscribe(
		result => {this.resultList = result},
		error => {console.log(error)}
	);
  }

}
