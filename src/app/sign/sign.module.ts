import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SignRoutingModule } from './sign-routing.module';

import { SignPageComponent } from './sign-page/sign-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';

@NgModule({
  declarations: [SignPageComponent, RegistrationPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,    
    SignRoutingModule
  ]
})
export class SignModule { }
