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
  pageNum = 1;
  userType = 2;
  loading = false;

  constructor(private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    switch (this.router.url){
      case '/admin/user/admin':this.userType = 0;
        break;
      case '/admin/user/audit':this.userType = 1;
        break;
    }
    this.activatedRoute.queryParams.subscribe((params: Params) => {

    });
    this.getList();
  }

  add(item) {
    this.router.navigate(['/admin/user/add',this.userType], {
      queryParams: {id: item ? item.id : ''}
    });

  }

  getList() {
    this.loading = true;
    (this.userService as any).list({
      pageNum: this.pageNum,
      pageSize: 10,
      search: this.userType
    }, {})
      .then(response => {
        this.loading = false;
        const rep = (response as any);
        if (rep.code == 0) {
          this.total = response.pageCount;
          this.list = response.data;
        } else {
          console.log(response);
        }
      });
  }

  del(id) {
    (this.userService as any).del(id)
      .then(response => {
        const rep = (response as any);
        if (rep.code === 200) {
          this.getList();
        } else {
          console.log(response);
        }
      });
  }

}
