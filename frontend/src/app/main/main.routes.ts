import {LoginComponent} from './component/login/login.component';
import {NotFoundComponent} from './component/not-found/not-found.component';
import {MenuComponent} from './component/menu/menu.component';
import {ClientListComponent} from './component/client-list/client-list.component';
import {LogListComponent} from './component/log-list/log-list.component';


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
        data: {name: '系统用户管理', menu: true}
      },
      {
        path: 'client',
        component: ClientListComponent,
        data: {name: '客户管理', menu: true}
      },
      {
        path: 'log',
        component: LogListComponent,
        data: {name: '日志管理', menu: true}
      },
      {
        path: 'log/33',
        component: LogListComponent,
        data: {name: '日志管理1'}
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }

];

export const mainComponentList = [LogListComponent, ClientListComponent, LoginComponent, NotFoundComponent, MenuComponent];
