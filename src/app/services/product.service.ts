import {Injectable} from '@angular/core';

import {Http, Response, RequestOptions, Headers, Request, RequestMethod, HTTP_PROVIDERS} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProductService {

  private _http: Http;
  private _baseURL: string;
  private _headers : Headers;
  private _requestOptions : RequestOptions;

  constructor(http: Http) {
    this._http = http;
    this._baseURL = 'http://api-ratp.pierre-grimaud.fr/v2/';
    this._baseURL = 'http://local.www.brandalley.fr:8085/api/v1/';

    this._headers = new Headers();
    this._headers.append("Content-Type", 'application/json');
    this._headers.append("X-AUTH-TOKEN", '9ZFAF35ceb5fFBeb769bDc04eFMLFQSF2zfrgb');
  }

  /*
   * Get method for the API
   */
  public getProducts(context: string = 'product/all'): any {
    this._requestOptions = new RequestOptions({ headers: this._headers, method: RequestMethod.Get,  });

    return this._http.get(this._baseURL+context, this._requestOptions)
                     .map( (responseData) => {
                                        return this.responseData(responseData.json());
                                      });
                    //  .subscribe(
                    //     responseData => this.responseData(responseData.json()),
                    //     err => this.handleError(err),
                    //     () => console.log('Random Quote Complete')
                    //   );
  }



  private responseData(data)
  {
    console.log('responseData');
    return data;
  }

  private handleError(error: Response) {
      if (error.json().total == 0) {
          var responseMessage = 'Unknown server error';
      } else {
          var code = error.json().error.code;
          var serverMessage = error.json().error.message;
          var exceptionMessage = error.json().error.exception[0].message;
          var responseMessage = 'Error ('+code+'): '+serverMessage+' ('+exceptionMessage+')';
      }

      // return Observable.throw(responseMessage);
  }
}
