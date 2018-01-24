import {Component, Input, OnInit} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Router} from '@angular/router';
import {LoginVo} from '../../../common/class/LoginVo';
import {AuthService} from '../../../common/restService/AuthService';
import {Md5} from "ts-md5/dist/md5";
import {ElMessageService} from 'element-angular'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [AuthService]
})

export class LoginComponent implements OnInit {
  login = new LoginVo('', '');
  key=false;

  constructor(private http: Http,
              private router: Router,
              private message: ElMessageService,
              private authService: AuthService) {
  }

  ngOnInit() {
    const that=this;
    $(document).unbind("keyup");
    $(document).keyup(function(event){
      if(event.keyCode ==13&&that.router.url==='/'){
        that.onLogin()
      }
    });
  }

  onLogin() {
    if(this.key){return}
    if (!this.login.name || !this.login.password) {
      this.message.error('请输入用户名和密码');
      return;
    }
    this.key=true;
    this.authService.login({
      login_name: this.login.name,
      login_pwd: Md5.hashStr(this.login.password)
    })
      .then(response => {
        this.key=false;
        const rep = (response as any);
        if (rep.code == 0) {
          localStorage.setItem('userLoginName', this.login.name);
          localStorage.setItem('userName', rep.user_name);
          localStorage.setItem('token', rep.token);
          localStorage.setItem('userType', rep.user_type);
          setTimeout(()=>{
            switch (rep.user_type) {
              case '1':
                this.router.navigateByUrl('/admin/client');
                break;
              case '0':
                this.router.navigateByUrl('/admin/user/audit');
                break;
              case '2':
                this.router.navigateByUrl('/admin/client');
                break;
            }
          },400);

        } else if (rep.code == 10001) {
          this.message.error('账号密码不正确，或者账号已被停用');
        } else {

        }
      });
  }
}
