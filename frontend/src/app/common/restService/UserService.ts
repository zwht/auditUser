/**
 * Created by zhaowei on 2017/10/16.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import HandleError from './../../common/service/HandleError';
import {User} from './../../common/class/User';
@Injectable()
export class UserService {

  constructor(private http: Http) {
  }

  /**获取用户列表**/
  private url = '/ums/index.php/api/';

  public list(obj: Object, obj1: Object): Promise<void> {
    return this.http.get(this.url +
      'find_user?page_number=' + (obj as any).pageNum +
      '&page_size=' + (obj as any).pageSize +
      '&search_info=' + (obj as any).search+'&user_type=' + (obj as any).userType)
      .toPromise()
      .then(response => response.json())
      .catch(HandleError);
  }

  public getById(id: String): Promise<void> {
    return this.http.get(this.url + 'get_user_info_by_id?id=' + id)
      .toPromise()
      .then(response => response.json())
      .catch(HandleError);
  }

  // 添加用户
  public add(user: User): Promise<void> {
    return this.http.post(this.url + 'add_user',
      $.param(user))
      .toPromise()
      .then(response => response.json())
      .catch(HandleError);
  }
  // 添加用户
  public change_pwd(user): Promise<void> {
    return this.http.post(this.url + 'change_pwd',
      $.param(user))
      .toPromise()
      .then(response => response.json())
      .catch(HandleError);
  }
  public edit_user_info(user): Promise<void> {
    return this.http.post(this.url + 'edit_user_info',
      $.param(user))
      .toPromise()
      .then(response => response.json())
      .catch(HandleError);
  }



  public del(id: String): Promise<void> {
    return this.http.get(this.url + 'del?id=' + id)
      .toPromise()
      .then(response => response.json())
      .catch(HandleError);
  }
}
