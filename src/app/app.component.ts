/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { RouteConfig, Router } from '@angular/router-deprecated';

import { AppState } from './app.service';
import { Home } from './home';
import { ProductDashboardComponent } from './product/productDashboard.component';
import { Calendar } from './calendar/calendar.component';
import { Account } from './account/account.component';


import { RouterActive } from './router-active';
import { TopNavBarComponent } from './nav/navbar.component';

/* src/app/home/home.ts */
import {AlertComponent, DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

declare var jsSHA: any;
declare var ocrad: any;
declare var Tesseract: any;

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [ ],
  providers: [ ],
  directives: [ RouterActive, AlertComponent, DATEPICKER_DIRECTIVES, TopNavBarComponent],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('./app.css')
  ],
  template: require ('./app.html')


})
@RouteConfig([
  { path: '/',      name: 'Index', component: Home, useAsDefault: true },
  { path: '/home',  name: 'Home',  component: Home },
  { path: '/productDashBoard', name: 'ProductDashboard', component: ProductDashboardComponent },
  { path: '/calendar', name: 'Calendar', component: Calendar },
  { path: '/account', name: 'Account', component: Account },
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  { path: '/about', name: 'About', loader: () => require('es6-promise!./about')('About') }

])
export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  loading = false;
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';
  date: Date = new Date();
  shaObj: any;
  hash: String;
  ocradObj: any;
  image = new Image();
  canvas = <HTMLCanvasElement>document.createElement('canvas');

  constructor(
    public appState: AppState) {

      this.shaObj = new jsSHA("SHA-512", "TEXT");
      this.shaObj.update("This is a test");
      this.hash = this.shaObj.getHash("HEX");

  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
    console.log('this.hash ', this.hash);
    // Create an img element and add the image file data to it
    // var img = document.createElement("img");
    this.load('/assets/img/carte2.png', this.imageReady);



  }

  public load(name: string, callBack: (imageData: ImageData) => void) : void {
        this.image.src = name;
        console.log("'loaddddd'");
        var thath: ImageDataLoader = this;
        this.image.onload = function() {

            console.log("'image loaded'");
            thath.canvas.width = thath.image.width;
            thath.canvas.height = thath.image.height;
            thath.ctx = thath.canvas.getContext('2d');
            thath.ctx.drawImage(thath.image, 0, 0, thath.image.width, thath.image.height);
            thath.imageData = thath.ctx.getImageData(0, 0, thath.image.width, thath.image.height);
            callBack && callBack(thath.imageData);
        };
    }

    imageReady(imageData){
      console.log("'image ready'");
      var result = OCRAD(imageData);
      console.log(">>>>"+result);


      Tesseract.recognize( imageData, {
                progress: function(e){
            console.log(e); }, lang: 'fra'} )
                .then( function(e){
            console.log("end"); );

      console.log('okkkkkkkk');
    }

    progress(p)
    {
       console.log(p);
    }

    public tesseractEnd(result)
    {
        console.log(result);
    }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
