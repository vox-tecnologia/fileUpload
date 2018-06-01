
## 1. Install Vox Upload globally:


```sh
$ npm install --g @voxtecnologia/file-upload
```

## 2. Install Vox Upload in your project devDependencies:

```sh
$ npm install --save-dev @voxtecnologia/file-upload
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
## 4. Setup 

Default

```html
<app-vox-upload
  [url]="getUrl">
</app-upload>
```

Custom

```html
<app-vox-upload
    maxSize="2"
    [url]="getUrl"
    [fileExt]="getExtesao()"
    [anexosRequeridos]="anexos()">
</app-vox-upload>
```


## 5. Usage and options

Name      | Type               | Exemples                         | Optional              | Options Default        
---       | ---                | ---                              | ----                  | ---
fileExt   | `String`           | `jpg, pdf, txt, icon`            | Yes                   | ` pdf, png, jpeg, jpg, csv`
maxSize   | `number`           | `10`                             | Yes                   | `2 MB`
url       | `String`           | `http://localhost:3000/api-file` | No                    | No
anexosRequeridos | `Array`     | ` const anexos = [{}]`           | No                    | No

