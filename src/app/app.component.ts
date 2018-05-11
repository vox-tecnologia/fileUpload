import { Component, ViewChild } from '@angular/core';

import { UploadComponent } from './upload/upload.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public title = 'app';
  public getUrl: string;
  public extesao: Array<string>;

  constructor(
    private modalService: NgbModal
  ) {
    this.extesao = [];
    this.getUrl = 'http://localhost:3000/api-file';
  }


  public open(content) {
    this.modalService.open(content, { size: 'lg', centered: true});
  }

  public getExtesao () {
    return ['png', 'pdf', 'jpg'];
  }

  public anexos() {

    const anexos = [
      {
        'id': 1,
        'descricao': 'Certificado de controle de pragas',
        'extensao': [{'descricao': 'pdf'}]
      },
      {
        'id': 2,
        'descricao': 'Memorial descritivo',
        'extensao': [{'descricao': 'jpg'}]
      },
      {
        'id': 3,
        'descricao': 'Habilitação Profissional',
        'extensao': [{'descricao': 'csv'}]
      },
      {
        'id': 4,
        'descricao': 'Documento',
        'extensao': [{'descricao': 'word'}]
      }
    ];

    return anexos;
  }

}
