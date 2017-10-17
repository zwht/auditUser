import {Component, Input, OnInit} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Router} from '@angular/router';
import {LoginVo} from './../../class/vo/LoginVo';
import {AuthService} from './../../service/AuthService';
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
    this.authService.login(this.login)
      .then(response => {
        if (response.code === 200) {
          localStorage.setItem('token', (response.data as any).token);
          this.router.navigate(['/admin/user/list']);
        } else {
          console.log(data);
        }
      });
  }
}