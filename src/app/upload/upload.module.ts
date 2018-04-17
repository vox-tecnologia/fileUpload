import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';

import { UploadComponent } from './upload.component';

@NgModule({
  imports: [
    CommonModule,
    FileUploadModule
  ],
  exports: [ UploadComponent ],
  declarations: [ UploadComponent ]
})
export class UploadModule { }
