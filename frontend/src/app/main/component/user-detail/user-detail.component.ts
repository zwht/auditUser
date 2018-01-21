import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../common/restService/UserService';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ElMessageService } from 'element-angular'
import {Md5} from "ts-md5/dist/md5";
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.less'],
  providers: [UserService]
})
export class UserDetailComponent implements OnInit {

  user = {
    login_name:localStorage.getItem('userLoginName'),
    login_pwd: null,
    login_pwd1: null
  };

  title = '';

  constructor(private userService: UserService,
              private message: ElMessageService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
  }

  save() {
    if(this.user.login_pwd!=this.user.login_pwd1){
      this.message.error('两次密码不匹配');
      return;
    }
    (this.userService as any).change_pwd({
      login_name: this.user.login_name,
      login_pwd: Md5.hashStr(this.user.login_pwd)
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
