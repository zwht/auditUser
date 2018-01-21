import {Component, OnInit} from '@angular/core';
import {UserList} from '../../../user/user.routes';

import {Router} from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {
  menu = [];
  userName = localStorage.getItem('userName');
  routesMenu = [UserList[0]];
  rightDown: any[] = [
    {
      value: 'my',
      label: '个人中心',
    },
    {
      value: 'exit',
      label: '退出',
    }
  ];

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.config[1].children.forEach(item => {
      if (item.data && (item.data as any).menu) {
        const itemMenu = {path: item.path, name: (item.data as any).name, children: []};
        this.routesMenu.forEach(subItem => {
          if ((item.data as any).name === subItem.data.name) {
            (subItem  as any).children.forEach(subSubItem => {
              if (subSubItem.data && subSubItem.data.menu) {
                itemMenu.children.push({
                  path: item.path + '/' + subSubItem.path,
                  name: subSubItem.data.name
                });
              }
            });
          }
        });
        this.menu.push(itemMenu);
      }
    });
    this.setActiveMenu(this.router.url, '/admin/');
  }

  downChange(data) {
    switch (data.value) {
      case 'my': {
        break;
      }
      case 'exit': {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        window.location.href = '#';
        break;
      }
    }
  }

  // 设置菜单选中
  setActiveMenu(url, br) {
    this.menu.forEach(item => {
      item.children.forEach(subItem => {
        if (br + subItem.path === url) {
          subItem.active = true;
        } else {
          subItem.active = false;
        }
      });
      if (url.indexOf(item.path)!=-1) {
        item.active = true;
        item.show = true;
      } else {
        item.active = false;
      }
    });
  }

  goMenu(item) {
    this.setActiveMenu(item.path, '');
    // window.location.href = item.path;
    this.router.navigateByUrl('/admin/' + item.path);
  }

  bigMenu(item) {
    if(!item.children.length){
      this.setActiveMenu(item.path, '');
      this.router.navigateByUrl('/admin/' + item.path);
    }
    item.show = !item.show;
  }
}
