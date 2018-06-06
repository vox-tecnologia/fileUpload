import {
  Component,
  OnInit,
  Input,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { TypesEnum } from '../enum/types.enum';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-vox-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit, OnDestroy {
  @Input() fileExt: string;
  @Input() maxSize: number;
  @Input() url: string;
  @Input() anexosRequeridos: Array<any>;
  @ViewChild('modal') private _content: ElementRef;

  private _extensoes: Array<string>;
  private _fileIndex: Array<any>;
  private _limtSize: number;
  private _showTable: boolean;
  private _modalRef: NgbModalRef;
  private _subscription: Subscription;

  public fileItem: Array<any>;
  public alerts: Object;
  public uploader: FileUploader;
  public rows: Array<number>;
  public isUp: Array<boolean>;
  public actions: Object;
  public btn: boolean;
  public show: boolean;

  constructor(
    private modalService: NgbModal,
    private uploadService: UploadService
  ) {
    this._limtSize = 2; // limite maximo para anexos de arquivos
    this._fileIndex = [];
    this._showTable = false;
    this.fileItem = [];
    this.maxSize = 2;
    this.anexosRequeridos = [];
    this.rows = [];
    this.isUp = [];
    this.btn = false;
    this.show = false;
    this.alerts = { status: false, msgs: [] };
  }

  ngOnInit(): void {

    this._subscription = this.uploadService.loaderState.subscribe(state => {
      if (state.show) {
        this.uploader.uploadAll();
      }
    });

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

  private open(): void {
    this._modalRef = this.modalService.open(this._content, { size: 'lg', centered: true});
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
        const err = `Error: (Extensão) O <strong>${item.file.name}</strong> possui extensão inválida.
                    Extensões validas <strong>${this.msgExtension()}</strong>`;

        this.alerts['status'] = false;
        this.alerts['msgs'].push(err);

        return;
      }

      this.alerts['msgs'] = [];
    };

    this.uploader.onSuccessItem = (item: FileItem, response: string) => {
      const res = JSON.parse(response);
      const err = `Os seguintes arquivos <strong>${item.file.name}</strong> ${res.mensagem}`;

      this.alerts['status'] = true;
      this.alerts['msgs'].push(err);

      this.clearTextOptions();
      item.remove();

    };

    this.uploader.onErrorItem = (item: FileItem, response: string) => {
      const res = JSON.parse(response);
      const err = `Não foi possivel enviar o arquivo <strong>${item.file.name}</strong> ${res}`;

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
    return (this._extensoes = [
      TypesEnum.PDF,
      TypesEnum.PNG,
      TypesEnum.JPEG,
      TypesEnum.JPG,
      TypesEnum.CSV,
      TypesEnum.WORD
    ]);
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

  public get anexos(): Array<any> {
    return this.anexosRequeridos;
  }


  public icon(icon: string): Array<string> {
    return this.extension().filter(ext => {
      return icon === ext;
    });
  }

  public getFileItem(): Array<FileItem> {
    return this.fileItem;
  }


  public changeRow(anexoId: number, idx: number, queue: FileItem): void {
    this.rows[idx] = anexoId;
    this.isUp[idx] = true;

    this._fileIndex.push(idx);

    this._fileIndex = this._fileIndex.filter((ele, i, self) => {
      return self.indexOf(ele) === i;
    });

    this._fileIndex.forEach((ele, i) => {
      this.fileItem[idx] = queue[i];
    });

    this.duplicateFiles(idx);

  }

  public disableUploadAll(): boolean {
    return !this.uploader.getNotUploadedItems().length;
  }

  public clearQueue(): void {
    this.uploader.clearQueue();
    this.clearTextOptions();
    this.fileItem = [];
    this._fileIndex = [];
  }

  public clearItem(queue: Array<FileItem>, idx: number): void {

    queue.splice(idx, 1);
    this.fileItem[idx] = undefined;
    this.isUp[idx] = false;
    this.uploader.clearQueue();
    this.btn = false;
  }

  private clearTextOptions(): void {
    this.isUp = this.isUp.map(ele => (ele = false));
  }


  public getAlert(): Object {
    return {
      'alert-success': true === this.alerts['status'],
      'alert-danger': false === this.alerts['status']
    };
  }

  private duplicateFiles(idx: number): void {

    const fileItemNameQueue = this.uploader.queue.map(fileItem => fileItem.file.name);

    const la = this.uploader.queue.filter((itemUploader, i, self) => {
      if (fileItemNameQueue.indexOf(itemUploader.file.name) !== i) {

        const duplicateFile = confirm('arquivos duplicados serão removidos');
        if (duplicateFile || !duplicateFile) {
          itemUploader.remove();
          this.fileItem[idx] = undefined;
          this.isUp[idx] = false;
        }
      }
    });

    this.btn = true;
  }

  private showTable(): void {
    this._modalRef.close();
    this._showTable = true;
  }

  public get showAnexo() {
    return this._showTable;
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
