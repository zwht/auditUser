import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Http, HttpModule, XHRBackend, RequestOptions} from '@angular/http';
import {RouterModule} from '@angular/router';
import { ElModule } from 'element-angular';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../common/shared.module';
import {RouterInterceptorService} from '../common/service/RouterInterceptorService'
import { FileUploadModule } from '../ng2-file-upload';

import {AppComponent} from './component/app/app.component';
import {mainRoutes, mainComponentList} from './main.routes';


@NgModule({
  declarations: [].concat([AppComponent], mainComponentList),
  imports: [
    FileUploadModule,
    ElModule.forRoot(),
    BrowserModule,
    NoopAnimationsModule,
    FormsModule,
    HttpModule,
    SharedModule,
    RouterModule.forRoot(mainRoutes, {useHash: true})
  ],
  providers: [RouterInterceptorService],
  bootstrap: [AppComponent]
})

export class MainModule {
}
