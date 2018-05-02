import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileUploadModule } from 'ng2-file-upload';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { UploadComponent } from './upload.component';

@NgModule({
  imports: [
    CommonModule,
    FileUploadModule,
    AngularFontAwesomeModule,
    NgbModule.forRoot()
  ],
  exports: [ UploadComponent ],
  declarations: [ UploadComponent ]
})
export class UploadModule { }
