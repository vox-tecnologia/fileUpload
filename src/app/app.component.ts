import { Component } from '@angular/core';

import { UploadComponent } from './upload/upload.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  getUrl = 'http://localhost:3000/api-file';
}
