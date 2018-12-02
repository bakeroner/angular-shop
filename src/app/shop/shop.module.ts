import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import { productDb } from './../shared/product-db.service';

import {ShopRoutingModule} from './shop-routing.module';

import { ShopPageComponent } from './shop-page/shop-page.component';
import { SearchComponent } from './search/search.component';
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [ShopPageComponent, SearchComponent, ResultComponent],
  imports: [
    CommonModule,
    ShopRoutingModule,
    InMemoryWebApiModule.forRoot(productDb)
  ]
})
export class ShopModule { }
