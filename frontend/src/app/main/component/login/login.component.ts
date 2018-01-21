import {Component, Input, OnInit} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Router} from '@angular/router';
import {LoginVo} from '../../../common/class/LoginVo';
import {AuthService} from '../../../common/restService/AuthService';
import {Md5} from "ts-md5/dist/md5";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [AuthService]
})

export class LoginComponent implements OnInit {
  login = new LoginVo('', '');

  constructor(private http: Http,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    console.log(this);
  }

  onLogin(data) {
    this.authService.login({
      login_name: this.login.name,
      login_pwd: this.login.password
    })
      .then(response => {
        const rep = (response as any);
        if (rep.code == 0) {
          debugger
          localStorage.setItem('userName', this.login.name);
          localStorage.setItem('token', rep.data.token);
          this.router.navigateByUrl('/admin/user');
        } else {
          console.log(data);
        }
      });
  }
}
