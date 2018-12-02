import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopPageComponent } from './shop-page/shop-page.component';
import { SearchComponent } from './search/search.component';
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [ShopPageComponent, SearchComponent, ResultComponent],
  imports: [
    CommonModule
  ]
})
export class ShopModule { }
