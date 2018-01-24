/**
 * Created by zhaowei on 2017/10/16.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import HandleError from './../service/HandleError';
@Injectable()
export class ClientService {

  constructor(private http: Http) {
  }

  /**获取用户列表**/
  private url = '/api/';

  // 添加
  public add(color): Promise<void> {
    return this.http.post(this.url + 'add',
      $.param(color))
      .toPromise()
      .then(response => response.json())
      .catch(HandleError);
  }

  public list(obj: Object, body: Object): Promise<void> {
    return this.http.get(this.url + 'find_data?page_number=' + (obj as any).pageNum+
    '&page_size=' + (obj as any).pageSize+
      '&search_info=' + (obj as any).search)
      .toPromise()
      .then(response =>  response.json())
      .catch(HandleError);
  }

  public verify(obj: Object, body: Object): Promise<void> {
    return this.http.get(this.url + 'user_verify?id=' + (obj as any).id+
      '&op_name=' + (obj as any).op_name)
      .toPromise()
      .then(response =>  response.json())
      .catch(HandleError);
  }
  public subsidy_op(obj: Object, body: Object): Promise<void> {
    return this.http.get(this.url + 'subsidy_op?id=' + (obj as any).id+
      '&subsidy_name=' + (obj as any).subsidy_name)
      .toPromise()
      .then(response =>  response.json())
      .catch(HandleError);
  }


  public getById(id: String): Promise<void> {
    return this.http.get(this.url + 'getById?id=' + id)
      .toPromise()
      .then(response => response.json())
      .catch(HandleError);
  }

  public update(color): Promise<void> {
    return this.http.post(this.url + 'update',
      $.param(color))
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
