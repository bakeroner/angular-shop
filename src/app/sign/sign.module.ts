import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignRoutingModule } from './sign-routing.module';

import { SignPageComponent } from './sign-page/sign-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';

@NgModule({
  declarations: [SignPageComponent, RegistrationPageComponent],
  imports: [
    CommonModule,
    SignRoutingModule
  ]
})
export class SignModule { }
