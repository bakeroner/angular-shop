import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SignPageComponent} from './sign-page/sign-page.component';
import {RegistrationPageComponent} from './registration-page/registration-page.component';

const routes: Routes = [
{path: '', redirectTo: '/sign-in', pathMatch: 'full'},
	{path: 'registration', component: RegistrationPageComponent},
	{path: 'sign-in', component: SignPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignRoutingModule { }
