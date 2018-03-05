/**
 * Created by zhaowei on 2017/10/16.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import HandleError from './../service/HandleError';
@Injectable()
export class LocationService {

  constructor(private http: Http) {
  }

  /**获取用户列表**/
  private url = '/api/';

  // 添加
  public add(color): Promise<void> {
    return this.http.post(this.url + 'add_location_info',
      $.param(color))
      .toPromise()
      .then(response => response.json())
      .catch(HandleError);
  }


  public list(obj: Object, body: Object): Promise<void> {
    return this.http.get(this.url + 'find_location?page_number=' + (obj as any).pageNum+
      '&page_size=' + (obj as any).pageSize+
      '&search_info=' + (obj as any).search)
      .toPromise()
      .then(response =>  response.json())
      .catch(HandleError);
  }

  public getList(): Promise<void> {
    return this.http.get(this.url + 'get_location_list')
      .toPromise()
      .then(response =>  response.json())
      .catch(HandleError);
  }


  public update(color): Promise<void> {
    return this.http.post(this.url + 'edit_location_info',
      $.param(color))
      .toPromise()
      .then(response => response.json())
      .catch(HandleError);
  }

  public del(id: String): Promise<void> {
    return this.http.get(this.url + 'del1?id=' + id)
      .toPromise()
      .then(response => response.json())
      .catch(HandleError);
  }

}
