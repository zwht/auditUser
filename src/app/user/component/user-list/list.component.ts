import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../common/restService/UserService';
import {Router, ActivatedRoute, Params} from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [UserService]
})
export class ListComponent implements OnInit {
  list = [];
  total = 0;
  search = '';
  pageNum = 1;
  userType = 2;
  pageSize = 16;
  loading = false;

  constructor(private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    switch (this.router.url) {
      case '/admin/user/admin':
        this.userType = 0;
        break;
      case '/admin/user/audit':
        this.userType = 1;
        break;
    }
    this.activatedRoute.queryParams.subscribe((params: Params) => {

    });
    this.getList(0);
  }

  add(item) {
    this.router.navigate(['/admin/user/add', this.userType], {
      queryParams: {id: item ? item.id : ''}
    });

  }

  getList(key) {
    if(key) this.pageNum=1;
    this.loading = true;
    this.total=0;
    (this.userService as any).list({
      pageNum: this.pageNum,
      pageSize: this.pageSize,
      userType: this.userType,
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

  del(item, key) {
    this.loading = true;
    (this.userService as any).edit_user_info({
      user_status: key,
      id: item.id,
      user_name: item.user_name,
      user_type: item.user_type,
	    location_id: item.location_id,
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
