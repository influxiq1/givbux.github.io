
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { Test1Component } from './test1/test1.component';
import { LocationComponent } from './location/location.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material-module';


@NgModule({
  declarations: [
    AppComponent,
    Test1Component,
    LocationComponent,
    HomeComponent
  ],
  imports: [
    DemoMaterialModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCvzWjkeGYWlGTo-EUbqXFElWZ0uEw5yfc',
      // libraries: ['places']
    }),
    CommonModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
