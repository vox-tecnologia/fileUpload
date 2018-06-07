import { Component, ViewChild } from '@angular/core';

import { UploadComponent } from './upload/upload.component';
import { AppService } from './app.services';
import { UploadService } from './upload/upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public title = 'Últimos dias de sua VIDA';
  public getUrl: string;
  public extesao: Array<string>;
  private _anexos: any[];

  constructor(
    private appService: AppService,
    private uploadService: UploadService,
  ) {
    this.extesao = [];
    this.getUrl = 'http://localhost:3000/api-file';
  }

  public loadAnexos() {
    this.appService.getAnexos().subscribe(
        (response: Array<any>) => {
          this._anexos = response;
        },
        (error: Response) => console.log(error.text)
      );
  }

  public getExtesao () {
    return ['png', 'pdf', 'jpg'];
  }

  public get anexos() {
    return this._anexos;
  }

  public sendFiles() {
    this.uploadService.sendFile();
  }

}
