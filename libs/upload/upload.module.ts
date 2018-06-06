import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileUploadModule } from 'ng2-file-upload';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { UploadComponent } from './upload.component';
import { UploadService } from './upload.service';

@NgModule({
  imports: [
    CommonModule,
    FileUploadModule,
    NgbModule.forRoot()
  ],
  exports: [ UploadComponent ],
  providers: [ UploadService ],
  declarations: [ UploadComponent ]
})
export class UploadModule { }
