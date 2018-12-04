import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { DbMethodsService } from './../../shared/db-methods.service';
import { Beer } from './../../shared/beer';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
	resultList: Beer[];
  getDetail(itemId: number): void {
    console.log(itemId);
    this.router.navigate([itemId], {relativeTo: this.route});
  }
  constructor(private dbMeth: DbMethodsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
	this.dbMeth.getData().subscribe(
		result => {this.resultList = result},
		error => {console.log(error)}
	);
  }

}
