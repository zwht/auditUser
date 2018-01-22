import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import HandleError from './../../common/service/HandleError';
@Injectable()
export class AuthService {
  constructor(private http: Http) {
  }

  // 登陆
  private url = '/api/';

  login(loginVo): Promise<void> {
    return this.http.post(this.url + 'login',
      $.param(loginVo))
      .toPromise()
      .then(response => response.json())
      .catch(HandleError);
  }

  // 注销

  logout(userId: string): Promise<void> {
    return this.http.post(this.url + 'logout',
      $.param({userId: userId}))
      .toPromise()
      .then(() => null)
      .catch(HandleError);
  }
}
