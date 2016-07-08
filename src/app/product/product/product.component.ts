import { Component, Input } from '@angular/core';
import { Product } from '../../model/product';
import { CollapseDirective } from 'ng2-bootstrap/ng2-bootstrap';


@Component({
  selector: 'product',
  template: require ('./product.html'),
  inputs: ['product'],
  directives : [CollapseDirective]
})
export class ProductComponent {
    // @Input() product: Product;
    // public product : Product;
    public isCollapsed:boolean = true;
    constructor() {
    // this.product = this.data;
    }

    mouseOut()
    {
      this.isCollapsed = true;
      console.log('ouiiiiiiiiii');
    }
}
