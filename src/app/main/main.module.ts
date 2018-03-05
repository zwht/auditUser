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

import {LoginComponent} from './component/login/login.component';
import {NotFoundComponent} from './component/not-found/not-found.component';
import {MenuComponent} from './component/menu/menu.component';
import {ClientListComponent} from './component/client-list/client-list.component';
import {LogListComponent} from './component/log-list/log-list.component';
import {ClientAddComponent} from './component/client-add/client-add.component';
import {UserDetailComponent} from './component/user-detail/user-detail.component';
import {PrintComponent} from './component/print/print.component';
import {UploadComponent} from './component/upload/upload.component';
import { LocationListComponent } from './component/location-list/location-list.component';
import { LocationAddComponent } from './component/location-add/location-add.component';

@NgModule({
  declarations: [AppComponent,
    UploadComponent,PrintComponent,UserDetailComponent,
    ClientAddComponent, LogListComponent,
    ClientListComponent, LoginComponent,
    NotFoundComponent, MenuComponent, LocationListComponent, LocationAddComponent
  ],
  imports: [
    FileUploadModule,
    ElModule.forRoot(),
    BrowserModule,
    NoopAnimationsModule,
    FormsModule,
    HttpModule,
    SharedModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'admin',
        component: MenuComponent,
        children: [
          {
            path: 'user',
            loadChildren: 'app/user/user.module#UserModule',
            data: {
              name: '系统用户管理', menu: true,
              type: [0]
            }
          },
          {
            path: 'location',
            component: LocationListComponent,
            data: {
              name: '区域管理', menu: true,
              type: [0]
            }
          },
          {
            path: 'location/add',
            component: LocationAddComponent,
            data: {name: '区域添加'}
          },
          {
            path: 'client',
            component: ClientListComponent,
            data: {name: '车辆信息', menu: true}
          },
          {
            path: 'client/add',
            component: ClientAddComponent,
            data: {name: '客户添加'}
          },
          {
            path: 'client/print',
            component: PrintComponent,
            data: {name: '打印用户'}
          },
          {
            path: 'user/detail',
            component: UserDetailComponent,
            data: {name: '用户详情'}
          },
          {
            path: 'log',
            component: LogListComponent,
            data: {name: '日志管理', menu: true,
              type: [0]
            }
          },
          {
            path: 'upload',
            component: UploadComponent,
            data: {name: '上传数据', menu: true,
              type: [0]
            }
          }
        ],
        canActivate: [RouterInterceptorService]
      },
      {
        path: '**',
        component: NotFoundComponent,
        canActivate: [RouterInterceptorService]
      }

    ], {useHash: true})
  ],
  providers: [RouterInterceptorService],
  bootstrap: [AppComponent]
})

export class MainModule {
}
