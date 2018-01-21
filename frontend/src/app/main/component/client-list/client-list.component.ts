import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../../common/restService/ClientService';
import {Router} from '@angular/router';
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.less'],
  providers: [ClientService]
})
export class ClientListComponent implements OnInit {
  list = [];
  total = 0;
  search = '';
  pageNum = 1;
  pageSize = 20;
  loading = false;
  userType = localStorage.getItem('userType');
  constructor(private clientService: ClientService,
              private router: Router) {
  }

  ngOnInit() {
    this.getList();
  }

  add(item) {
    this.router.navigate(['/admin/client/add'], {queryParams: {id: item ? item.id : ''}});
  }

  getList() {
    this.loading = true;
    (this.clientService as any).list({
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
    (this.clientService as any).verify({
      id: id,
      op_name: localStorage.getItem('userName') || 'zhaoyu'
    })
      .then(response => {
        const rep = (response as any);
        if (rep.code == 0) {
          this.getList();
        } else {
          console.log(response);
        }
      });
  }

}
