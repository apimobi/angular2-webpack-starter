import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
// import { Destination } from '../model/destination';
import { ProductService } from '../services/product.service';
import { ProductComponent } from './product/product.component';

// import { Router } from 'angular2/router';

@Component({
  selector: 'my-lines',
  providers: [ ProductService, ProductComponent ],
  template: require('./productDashboard.html'),
  directives: [ProductComponent]
})
export class ProductDashboardComponent implements OnInit {
  products: Product[] = [];
  constructor(
    // private _router: Router,
    private _productService: ProductService) {
  }
  ngOnInit() {
    this._productService.getProducts('product/all').subscribe(heroes => this.okResponse(heroes));
  }

  okResponse(data)
  {
    var response = data.response;
    var product = <Product>{};
    var i = 0;
    // var dest = <Destination>{};
    console.log(data[0].about);
    for (var key in data) {
      product = <Product>{};
      // product.destinations = [];
      product.about = data[key].about;
      product.dateCreated = data[key].datecreated;
      // var destinations = response[key]['destinations'];
      // for (var j in destinations) {
      //     dest = <Destination>{};
      //     dest.id_destination = destinations[j]['id_destination'];
      //     dest.name = destinations[j]['name'];
      //     dest.slug = destinations[j]['slug'];
      //     product.destinations.push(dest);
      // }
      product.id = i;
      this.products.push(product);
      i++;
      // console.log(data[key].about);

    }
  }

  // gotoDetail(hero: Hero) {
  //   let link = ['HeroDetail', { id: hero.id }];
  //   this._router.navigate(link);
  // }
}
