import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../common/restService/UserService';
import {Router, ActivatedRoute, Params} from '@angular/router';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [UserService]
})
export class AddComponent implements OnInit {
  user = {
    id: null,
    login_name: null,
    login_pwd: null,
    user_name: null,
    user_type: null
  };
  userTypeList = [
    {
      name: '管理员',
      value: 0
    },
    {
      name: '审核员',
      value: 1
    },
    {
      name: '普通人员',
      value: 2
    }
  ];
  constructor(private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.user.id = params['id'];
      if (this.user.id) {
        this.getById();
      }

    });
  }

  getById() {
    (this.userService as any).getById(this.user.id)
      .then(response => {
        const rep = (response as any);
        if (rep.code === 200) {
          this.user = rep.data;
        } else {
        }
      });
  }


  save() {
    (this.userService as any).add({
      login_name: this.user.login_name,
      login_pwd: this.user.login_pwd,
      user_name: this.user.user_name,
      user_type: this.user.user_type
    })
      .then(response => {
        const rep = (response as any);
        if (rep.code === 200) {
          this.router.navigate(['/admin/user/list']);
        } else {
          console.log(response);
        }
      });
  }


}
