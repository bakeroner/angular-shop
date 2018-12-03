import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { ShopModule } from './shop/shop.module';
import { SignModule } from './sign/sign.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShopModule,
    SignModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
