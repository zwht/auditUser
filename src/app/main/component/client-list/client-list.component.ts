import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../../common/restService/ClientService';
import {Router} from '@angular/router';
import {ElMessageService} from 'element-angular'
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.less'],
  providers: [ClientService]
})
export class ClientListComponent implements OnInit {
  list = [];
  qdId = '';
  total = 0;
  toggle = false;
  search = '';
  pageNum = 1;
  pageSize = 20;
  loading = false;
  userType = localStorage.getItem('userType');

  constructor(private clientService: ClientService,
              private message: ElMessageService,
              private router: Router) {
  }

  ngOnInit() {
    this.getList();
  }

  add(item) {
    this.router.navigate(['/admin/client/add'], {queryParams: {id: item ? item.id : ''}});
  }

  getList(key) {
    if(key) this.pageNum=1;
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
    this.toggle = true;
    this.qdId = id;
  }

  qd() {
    (this.clientService as any).verify({
      id: this.qdId,
      op_name: localStorage.getItem('userName')
    })
      .then(response => {
        this.toggle = false;
        const rep = (response as any);
        if (rep.code == 0) {
          this.getList();
        } else {
          console.log(response);
        }
      });
  }

}
