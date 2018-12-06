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
  noResult: boolean = false;
  getDetail(itemId: number): void {
    console.log(itemId);
    this.router.navigate([itemId], {relativeTo: this.route});
  }
   getItem(): void {
      this.route.params.forEach((params: any) => {
        let currentCategory = params['category'];
        let currentName = params['name'];
        if (currentCategory) {
          this.dbMeth.filteredData(currentCategory, currentName)
            .subscribe (result => {
              this.resultList = result;
              if (this.resultList.length) {
                this.noResult = false;
              }
              else {
                this.noResult = true;
              }
            });
        }
        else {
          this.dbMeth.getData().subscribe(
            result => {this.resultList = result},
            error => {console.log(error)}
          );
        }
      })
  }

  constructor(private dbMeth: DbMethodsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getItem();
  }

}
