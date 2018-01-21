/**
 * Created by zhaowei on 2017/10/16.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import HandleError from './../service/HandleError';

@Injectable()
export class LogService {

  constructor(private http: Http) {
  }

  /**获取用户列表**/
  private url = '/api/';

  // 添加
  public add(gx): Promise<void> {
    return this.http.post(this.url + 'add',
      JSON.stringify(gx))
      .toPromise()
      .then(response => response.json())
      .catch(HandleError);
  }

  public list(obj: Object, body: Object): Promise<void> {
    return this.http.get(this.url + 'find_log?page_number=' + (obj as any).pageNum+
      '&page_size=' + (obj as any).pageSize+
      '&search_info=' + (obj as any).search)
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

  public update(gx): Promise<void> {
    return this.http.post(this.url + 'update',
      JSON.stringify(gx))
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
