
## 1. Install Vox Upload globally:


```sh
$ npm install --g @voxtecnologia/file-upload
```

## 2. Install Vox Upload in your project devDependencies:

```sh
$ npm install --save @voxtecnologia/file-upload
```

## 3. Setup Module

Import UploadModule into your app.module.

```ts
import { UploadModule } from '@voxtecnologia/file-upload';

@NgModule({
  ...
  imports: [
    UploadModule
  ],
})
```

## 4 . Setup Component
Import UploadService into your app.component

```ts
import { Component } from '@angular/core';
import { UploadService } from '@voxtecnologia/file-upload';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    public title = 'app';
    
    constructor(
      private uploadService: UploadService,
    ) {
      
    public sendFiles() {
      this.uploadService.sendFile();
    }
}

```
## 5 . Setup Angular JSON

* add bootstrap dependency
* add font-awesome

`angular.json or .angular-cli.json` 
```ts
  "styles": [
      "node_modules/bootstrap/dist/css/bootstrap.min.css",
      "../node_modules/font-awesome/css/font-awesome.css",
      "src/styles.css"
    ],
```
## 6. Setup on View

```html
<app-vox-upload
    maxSize="2"
    [url]="getUrl"
    [fileExt]="getExtesao()"
    [anexosRequeridos]="anexos()">
</app-vox-upload>
```

## 7. Usage and options

Name      | Type               | Exemples                         | Optional              | Options Default        
---       | ---                | ---                              | ----                  | ---
fileExt   | `String`           | `jpg, pdf, txt, icon`            | Yes                   | ` pdf, png, jpeg, jpg, csv, doc, docx`
maxSize   | `number`           | `10`                             | Yes                   | `2 MB`
url       | `String`           | `http://localhost:3000/api-file` | No                    | No
anexosRequeridos | `Array`     | ` const anexos = [{}]`           | No                    | No

