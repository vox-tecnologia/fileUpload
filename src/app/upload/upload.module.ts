import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileUploadModule } from 'ng2-file-upload';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { UploadService } from './upload.service';
import { UploadComponent } from './upload.component';

@NgModule({
  imports: [
    CommonModule,
    FileUploadModule,
    NgbModule.forRoot()
  ],
  exports: [ UploadComponent ],
  declarations: [ UploadComponent ]
})
export class UploadModule { }
