import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class AppService {

    public constructor(private http: Http) { }

      public getAnexos(): Observable<any> {
          // const url = 'http://www.mocky.io/v2/5b16b2de31000095006f4040';
          const url = 'http://www.mocky.io/v2/5b16fd3f31000043006f4106';

          return this.http
            .get(url)
            .map((response: Response) => {
              return response.json();
            })
            .catch((error) => {
              return error;
            });
      }
}
