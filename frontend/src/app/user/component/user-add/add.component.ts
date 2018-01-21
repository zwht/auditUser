import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../common/restService/UserService';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Md5} from "ts-md5/dist/md5";
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less'],
  providers: [UserService]
})
export class AddComponent implements OnInit {
  user = {
    id: null,
    login_name: null,
    login_pwd: null,
    user_name: null,
    user_type: null,
    user_status: 1
  };
  userTypeList = [
    {
      name: '管理员',
      value: 0
    },
    {
      name: '审核员',
      value: 1
    },
    {
      name: '普通人员',
      value: 2
    }
  ];
  statusList = [
    {
      name: '启用',
      value: 1
    },
    {
      name: '禁用',
      value: 0
    }
  ];
  title = '';

  constructor(private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.user.id = params['id'];
      if (this.user.id) {
        this.getById();
      }
    });
    this.activatedRoute.params.subscribe((params) => {
      this.user.user_type = params.type;
      let bj = '添加';
      if (this.user.id) bj = '编辑';
      switch (this.user.user_type) {
        case '0':
          this.title = bj + '管理员用户';
          break;
        case '1':
          this.title = bj + '审核员用户';
          break;
        case '2':
          this.title = bj + '普通用户';
          break;
      }
    });
  }

  getById() {
    (this.userService as any).getById(this.user.id)
      .then(response => {
        const rep = (response as any);
        if (rep.code === 200) {
          this.user = rep.data;
        } else {
        }
      });
  }


  save() {
    if (this.user.id) {

    } else {
      (this.userService as any).add({
        login_name: this.user.login_name,
        login_pwd: Md5.hashStr(this.user.login_pwd),
        user_name: this.user.user_name,
        user_type: this.user.user_type,
        user_status: 1
      })
        .then(response => {
          const rep = (response as any);
          if (rep.code == 0) {
            window.history.back()
          } else {
            console.log(response);
          }
        });
    }
  }
}
