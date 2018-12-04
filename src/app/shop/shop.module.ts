import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import { productDb } from './../shared/product-db.service';
/*import { userDb } from './../shared/user-db.service';*/

import {ShopRoutingModule} from './shop-routing.module';

import { ShopPageComponent } from './shop-page/shop-page.component';
import { SearchComponent } from './search/search.component';
import { ResultComponent } from './result/result.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';

@NgModule({
  declarations: [ShopPageComponent, SearchComponent, ResultComponent, ItemDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ShopRoutingModule,
    InMemoryWebApiModule.forRoot(productDb)
  ]
})
export class ShopModule { }
