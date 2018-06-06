import { Injectable, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class UploadService {

  private _loaderSubject: Subject<any>;
  public loaderState: any;

  constructor() {
    this._loaderSubject = new Subject();
    this.loaderState = this._loaderSubject.asObservable();
  }

  public openModal(modal: boolean): void {
    this._loaderSubject.next({
      modal: modal
    });
  }
}
