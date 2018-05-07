import { Component, OnInit, Input } from '@angular/core';

import { FileItem, FileUploader } from 'ng2-file-upload';

import { TypesEnum } from '../enum/types.enum';


@Component({
  selector: 'app-vox-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @Input() fileExt: string;
  @Input() maxSize: number;
  @Input() url: string;
  @Input() anexosRequeridos: Array<any>;

  private _extensoes: Array<string>;
  private _limtSize: number;

  public alerts: Object;
  public uploader: FileUploader;
  public rows: Array<number>;
  public isUp: Array<boolean>;
  public actions: Object;

  constructor() {
    this._limtSize = 2;  // limite maximo para anexos de arquivos
    this.maxSize = 2;
    this.anexosRequeridos = [];
    this.rows = [];
    this.isUp = [];
    this.alerts = { status: false, msgs: [] };
  }

  ngOnInit(): void {
    this.uploader = new FileUploader({
      url: this.url
    });

    this.initFile();

    if (isNaN(this.maxSize)) {
      const err = `O valor da diretiva <strong>maxSize</strong> deve ser um valor inteiro`;

      this.alerts['status'] = false;
      this.alerts['msgs'].push(err);

      return;
    }

    if (!this.url) {
      const err = `O valor da diretiva <strong>URL</strong> deve ser informado ex: url="http://localhost:3000/api"`;

      this.alerts['status'] = false;
      this.alerts['msgs'].push(err);

      return;
    }

    if (this.maxSize > this._limtSize) {
      const err = `Limite para o envio de arquivos é no maximo <strong>${this._limtSize} MB</strong>`;

      this.alerts['status'] = false;
      this.alerts['msgs'].push(err);

      return;
    }

  }

  public initFile(): void {
    this.uploader.onAfterAddingFile = (item: FileItem) => {

      item.withCredentials = false;
      if (!this.isvalidarSize(item)) {
        item.remove();
        const err = `Error: (Tamanho) O <strong>${item.file.name}</strong> possui tamanho de
                    <strong>${this.formateSize(item.file.size)}</strong>, Tamanho máximo permitido é : <strong>${this.maxSize} MB</strong>`;
        this.alerts['status'] = false;
        this.alerts['msgs'].push(err);

        return;
      }

      if (!this.isValidaType(item)) {
        item.remove();
        const err = `Error: (Extensão) O <strong>${item.file.name}</strong> possui extensão inválida. Extensões validas
                    <strong>${this.msgExtension()}</strong>`;

        this.alerts['status'] = false;
        this.alerts['msgs'].push(err);

        return;
      }

      this.alerts['msgs'] = [];

    };

    this.uploader.onSuccessItem = (item: FileItem, response: string) => {
        const err = response;

        this.alerts['status'] = true;
        this.alerts['msgs'].push(err);

        this.clearTextOptions();
        item.remove();
    };

    this.uploader.onErrorItem = (item: FileItem, response: string) => {
        const err = `Não foi possivel enviar o arquivo <strong>${item.file.name}</strong>`;

        this.alerts['status'] = false;
        this.alerts['msgs'].push(err);

        this.clearTextOptions();
    };

  }

  private isvalidarSize(item: FileItem): boolean {

    const fileSizeinMB = item.file.size / (1024 * 1000);
    const size = Math.round(fileSizeinMB * 100) / 100;

    if (size > this.maxSize) {
      return false;
    }

    return true;
  }

  private isValidaType(item: FileItem): boolean {

    const type = item.file.name.split('.');
    const fileExt = this.fileExt;

    if (fileExt) {
        const fileArray = this.fileExt.toString().split(',');

        return fileArray.some(types => {
          return types.toLowerCase().trim() === type[type.length - 1];
        });
    }

    return this.extension().some(types => {
      return types.toLowerCase().trim() === type[type.length - 1];
    });

  }

  private extension(): Array<string> {
    return this._extensoes = [TypesEnum.PDF, TypesEnum.PNG, TypesEnum.JPEG, TypesEnum.JPG, TypesEnum.CSV];
  }

  private msgExtension(): string {
    if (this.fileExt) {
      return this.fileExt.toString().toLocaleUpperCase();
    }

    return this.extension().toString().toLocaleUpperCase();
  }

  public fileQtd(item: Array<FileItem>): number | string {
    return item.length === 0 ? 'Não há arquivos anexados' : item.length;
  }

  public formateSize(bytes): string {

    const sizes = ['Bytes', 'KB', 'MB', 'GB'];

    let amountOf2s = Math.floor(Math.log(+bytes) / Math.log(2));

    if (amountOf2s < 1) {
        amountOf2s = 0;
    }

    const i = Math.floor(amountOf2s / 10);
    bytes = +bytes / Math.pow(2, 10 * i);

    if (bytes.toString().length > bytes.toFixed(2).toString().length) {
        bytes = bytes.toFixed(2);
    }

    return `${bytes} ${sizes[i]}`;

  }

  public getAnexos(): Array<any> {
    return this.anexosRequeridos;
  }

  public icon(icon: string): Array<string> {
      return this.extension().filter(ext => {
        return icon === ext;
      });
  }

  public changeRow(anexoId: number, idx: number): void {
    this.rows[idx] = anexoId;
    this.isUp[idx] = true;
  }

  public uploadAll(): void {
    this.uploader.uploadAll();
  }

  public clearQueue(): void {
    this.uploader.clearQueue();
    this.clearTextOptions();
  }

  private clearTextOptions(): void {
    this.isUp = this.isUp.map(ele => ele = false);
  }

  public getAlert(): Object {
    return {
        'alert-success' : true === this.alerts['status'],
        'alert-danger' : false === this.alerts['status']
      };
  }

}
