import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { UploadComponent } from './upload.component';

@NgModule({
  imports: [
    CommonModule,
    FileUploadModule,
    AngularFontAwesomeModule
  ],
  exports: [ UploadComponent ],
  declarations: [ UploadComponent ]
})
export class UploadModule { }
