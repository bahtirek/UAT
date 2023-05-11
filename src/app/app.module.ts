import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { httpInterceptorProviders } from './interceptors';
import { AppRoutingModule } from './app-routing.module';
import { ToasterModule } from './shared/toaster/toaster.module';
import { LoaderModule } from './shared/loader/loader.module';
import { ExtensionModule } from './extension/extension.module';

declare global {
  interface Window {
    selectButtonComponent?: any;
  }
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToasterModule,
    LoaderModule,
    ExtensionModule,
    AppRoutingModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
  exports:[
  ]
})

export class AppModule { }
