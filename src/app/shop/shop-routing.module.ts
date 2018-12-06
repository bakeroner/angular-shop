import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopPageComponent } from './shop-page/shop-page.component';
import { SearchComponent } from './search/search.component';
import { ResultComponent } from './result/result.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';

const routes: Routes = [
{path: '', redirectTo: '/shop', pathMatch: 'full'},
	{path: 'shop', component: ShopPageComponent, children: [
		{path: '', component: SearchComponent, children: [
			{path: '', component: ResultComponent, children: [
				{path: ':id', component: ItemDetailComponent}
			]}
		]}
	]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }