import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../../common/restService/ClientService';
import {Router, ActivatedRoute, Params} from '@angular/router';
@Component({
  selector: 'client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.less'],
  providers: [ClientService]
})
export class ClientAddComponent implements OnInit {
  user = {
    id: null,
    login_name: null,
    login_pwd: null,
    user_name: null,
    user_type: null
  };


  title = '';

  constructor(private clientService: ClientService,
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
    (this.clientService as any).getById(this.user.id)
      .then(response => {
        const rep = (response as any);
        if (rep.code === 200) {
          this.user = rep.data;
        } else {
        }
      });
  }


  save() {
    (this.clientService as any).add({
      login_name: this.user.login_name,
      login_pwd: this.user.login_pwd,
      user_name: this.user.user_name,
      user_type: this.user.user_type
    })
      .then(response => {
        const rep = (response as any);
        if (rep.code == 0) {
          window.history.back()
        } else {
          console.log(response);
        }
      });
  }


}
