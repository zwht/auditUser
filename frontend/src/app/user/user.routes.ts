import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {ListComponent} from './component/user-list/list.component';
import {AddComponent} from './component/user-add/add.component';

export const routes: Routes = [
  {
    path: '',
    data: {
      name: '系统用户管理'
    },
    children: [
      {
        path: 'admin',
        component: ListComponent,
        data: {
          name: '管理员',
          menu: true
        }
      },
      {
        path: 'audit',
        component: ListComponent,
        data: {
          name: '审核员',
          menu: true
        }
      },
      {
        path: 'list',
        component: ListComponent,
        data: {
          name: '普通普通用户',
          menu: true
        }
      },
      {
        path: 'add',
        component: AddComponent,
        data: {
          name: '添加用户'
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserRoutes {
}

export const UserComponents = [
  ListComponent,
  AddComponent
];
export const UserList = routes;
