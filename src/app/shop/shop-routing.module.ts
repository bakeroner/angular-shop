import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ShopPageComponent} from './shop-page/shop-page.component';

const routes: Routes = [
{path: '', redirectTo: '/shop', pathMatch: 'full'},
	{path: 'shop', component: ShopPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }

/*const routes: Routes = [
{path: '', redirectTo: '/shop', pathMatch: 'full'},
	{path: 'shop', component: ShopPageComponent, children: [
		{path: '', component: CheckListComponent, children: [
			{path: ':id', component: CheckListDetailComponent}, 
			{path: '', component: CheckListDetailComponent}
		]}
	]}
];*/