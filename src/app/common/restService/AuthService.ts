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

  logout(): Promise<void> {
    return this.http.get(this.url + 'logout')
      .toPromise()
      .then(response => response.json())
      .catch(HandleError);
  }
}
