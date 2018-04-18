export class Arquivo {

  private _nome: string;
  private _tamanho: number;
  private _progress: number;
  private _status: Array<Object>;

  constructor(
    nome?: string, tamanho?: number, progress?: number, status?: Array<Object>
  ) {
    this._nome = nome;
    this._tamanho = tamanho;
    this._progress = progress;
    this._status = status;
  }

  public get name() {
    return this._nome;
  }

  public get size() {
    return this._tamanho;
  }

  public get progress() {
    return this._progress;
  }

  public get status() {
    return this._status;
  }

}
