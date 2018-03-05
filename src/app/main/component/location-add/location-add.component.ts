import {Component, OnInit} from '@angular/core';
import {LocationService} from '../../../common/restService/LocationService';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ElMessageService } from 'element-angular'
@Component({
  selector: 'location-add',
  templateUrl: './location-add.component.html',
  styleUrls: ['./location-add.component.less'],
  providers: [LocationService]
})
export class LocationAddComponent implements OnInit {
  user={
    id:null,
    location_name:null,
  };
  title = '';

  constructor(private locationService: LocationService,
              private router: Router,
              private message: ElMessageService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.user.id = params['id'];
      if (this.user.id) {
        this.user=JSON.parse(this.user.id);
      }
    });
  }

  save() {
    if (this.user.id) {
      if(!this.user.location_name){
        this.message.error('请输入内容！');
        return
      }
      (this.locationService as any).update({
        id:this.user.id,
        location_name: this.user.location_name,
      })
        .then(response => {
          const rep = (response as any);
          if (rep.code == 0) {
            window.history.back()
          } else {
            console.log(response);
          }
        });
    } else {
      if(!this.user.location_name){
        this.message.error('请输入内容！');
        return
      }
      (this.locationService as any).add({
        location_name: this.user.location_name
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


}
