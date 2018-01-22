import { Component, OnInit } from '@angular/core';
import {LogService} from '../../../common/restService/LogService';
import {Router} from '@angular/router';
@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.less'],
  providers: [LogService]
})
export class LogListComponent implements OnInit {
  list = [];
  total = 0;
  search = '';
  pageNum = 1;
  pageSize = 20;
  loading = false;

  constructor(private logService: LogService,
              private router: Router) {
  }

  ngOnInit() {
    this.getList(0);
  }

  add(item) {
    this.router.navigate(['/admin/user/add'], {queryParams: {id: item ? item.id : ''}});
  }

  getList(key) {
    if(key) this.pageNum=1;
    this.loading = true;
    (this.logService as any).list({
      pageNum: this.pageNum,
      pageSize: this.pageSize,
      search: this.search
    }, {})
      .then(response => {
        this.loading = false;
        const rep = (response as any);
        if (rep.code == 0) {
          this.total = response.total_number;
          this.list = response.data;

        } else {
          console.log(response);
        }
      });
  }

  verify(id) {
    (this.logService as any).verify({
      id:id,
      op_name:localStorage.getItem('userName')||'zhaoyu'
    })
      .then(response => {
        const rep = (response as any);
        if (rep.code == 0) {
          this.getList(0);
        } else {
          console.log(response);
        }
      });
  }

}
