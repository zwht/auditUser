import {LoginComponent} from './component/login/login.component';
import {NotFoundComponent} from './component/not-found/not-found.component';
import {MenuComponent} from './component/menu/menu.component';
import {ClientListComponent} from './component/client-list/client-list.component';
import {LogListComponent} from './component/log-list/log-list.component';
import {RouterInterceptorService} from '../common/service/RouterInterceptorService'
import {ClientAddComponent} from './component/client-add/client-add.component';
import {UserDetailComponent} from './component/user-detail/user-detail.component';
import {PrintComponent} from './component/print/print.component';


export const mainRoutes = [
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
      }
    ],
    canActivate: [RouterInterceptorService]
  },
  {
    path: '**',
    component: NotFoundComponent,
    canActivate: [RouterInterceptorService]
  }

];

export const mainComponentList = [PrintComponent,UserDetailComponent, ClientAddComponent, LogListComponent, ClientListComponent, LoginComponent, NotFoundComponent, MenuComponent];
