import {Component, NgZone} from '@angular/core';
// import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import { RouterActive } from '../router-active';
import { CollapseDirective } from 'ng2-bootstrap/ng2-bootstrap';



@Component({
    selector: 'top-nav-bar',
    template: require('./nav.html'),
    directives: [RouterActive, CollapseDirective],
})


export class TopNavBarComponent {
  public isCollapsed:boolean = true;
  private width;
  private height;

  constructor(ngZone:NgZone) {
    console.log('nav');
    window.onresize = (e) =>
    {
        ngZone.run(() => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            if(this.width > 768) this.isCollapsed = true;
        });
    };
  }


}
