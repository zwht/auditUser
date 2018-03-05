import {Component, OnInit, Injector} from '@angular/core';
import {LocationService} from '../../../common/restService/LocationService';
import {Router} from '@angular/router';
import {ElMessageService} from 'element-angular'
@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.less'],
  providers: [LocationService]
})
export class LocationListComponent implements OnInit {

  list = [];
  total = 0;
  search = '';
  pageNum = 1;
  pageSize = 16;
  loading = false;
  userType = localStorage.getItem('userType');

  constructor(private locationService: LocationService,
              private message: ElMessageService,
              private router: Router) {

  }


  ngOnInit() {
    this.getList(0);
  }

  add(item) {
    this.router.navigate(['/admin/location/add'], {queryParams: {id: item ? JSON.stringify(item): ''}});
  }


  getList(key) {
    if (key) this.pageNum = 1;
    this.total=0;
    this.loading = true;
    (this.locationService as any).list({
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

  del(item) {
    this.loading = true;
    (this.locationService as any).del({
      id: item.id,
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
