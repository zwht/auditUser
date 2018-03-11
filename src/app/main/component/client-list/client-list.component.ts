import {Component, OnInit, Injector} from '@angular/core';
import {ClientService} from '../../../common/restService/ClientService';
import {Router} from '@angular/router';
import {ElMessageService} from 'element-angular'
import {DateSet} from '../../../common/service/DateSet';
import {LocationService} from "../../../common/restService/LocationService";

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.less'],
  providers: [ClientService,LocationService]
})
export class ClientListComponent implements OnInit {
  activeEdit={
    id:'',
    location_id:''
  };
  locationList=[];
  toggle3=false;

  beginTime=new Date(2010,1,1);
  endTime=new Date();


  printCSS: string[];
  printStyle: string;
  printBtnBoolean = true;
  printItem = {
    id:null,
    contact:null,
    address:null,
    idcard:null,
    contacttel:null,
    licenseplate:null,
    cartype:null

  };
  list = [];
  qdId = '';
  btId = '';
  toggle1 = false;
  total = 0;
  toggle = false;
  search = '';
  pageNum = 1;
  pageSize = 16;
  loading = false;
  userType = localStorage.getItem('userType');

  constructor(private clientService: ClientService,
              private message: ElMessageService,
              private router: Router,
              private dateSet: DateSet,
              private locationService: LocationService) {
    this.printStyle =
      `.printBody{display: block;}
      .zwTable{border-collapse: collapse; border: 1px solid #000; width: 100%;}
      th{text-align: center; height: 50px; font-weight: bold; background: #fff;}
      td{ padding: 6px;border:1px solid #000; height:50px; }
      p{ text-align: right; margin-top: 20px;}
      p span{ display: inline-block; width: 50px;}
      `;
  }


  ngOnInit() {
    (this.locationService as any).getList()
      .then(response=>{
        this.locationList=response.data;
      });
    this.getList(0);
	  this.beginTime=new Date(this.endTime.getFullYear(),this.endTime.getMonth(),1);
  }

  getExportInfoList(){
    //export_info_list
    let endTime=this.dateSet.getDate1(this.endTime);
    let beginTime=this.dateSet.getDate1(this.beginTime);
    if(endTime<=beginTime){
      this.message.error('开始时间不能大于等于截至时间！');
      return
    }

    /*let a=$('<a>');
    a.attr({target:'_blank',href:"/api/export_info_list?begin_time="+beginTime+"&end_time="+endTime+"&token="+localStorage.getItem('token')})
    a[0].click();*/
    (this.clientService as any).exportInfoList({
      endTime: endTime,
      beginTime: beginTime
    }, {})
      .then(response => {
        this.loading = false;
        const rep = (response as any);
	      if(rep.download_link){
		      let a=$('<a>');
		      a.attr({target:'_blank',href:rep.download_link+localStorage.getItem('token')})
		      a[0].click();
	      }else{
		      this.message.error('没有数据！');
	      }

      });
  }

  editAdess(item){
    this.toggle3=true;
    this.activeEdit.id=item.id;
    this.activeEdit.location_id= item.location_id

  }
  qdaddress(){
    (this.clientService as any).editAddess(this.activeEdit)
      .then(response => {
        const rep = (response as any);
        if (rep.code == 0) {
          this.toggle3=false;
          this.getList(0);
        } else {
          console.log(response);
        }
      });
  }

  printComplete() {

    this.printBtnBoolean = true;
  }

  beforePrint(item) {
    this.printItem=item;
    this.printBtnBoolean = false;
  }

  print(item){
    this.router.navigate(['/admin/client/print'], {queryParams: {id: item ? item.id : ''}});
  }

  add(item) {
    this.router.navigate(['/admin/client/add'], {queryParams: {id: item ? item.id : ''}});
  }

  getList(key) {
    if (key) this.pageNum = 1;
    this.total=0;
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
          this.list=[];
          console.log(response);
        }
      });
  }

  verify(id) {
    this.toggle = true;
    this.qdId = id;
  }
  bt(item){
    this.toggle1 = true;
    this.btId = item.id;
  }
  qdBt(){
    (this.clientService as any).subsidy_op({
      id: this.btId,
      subsidy_name: localStorage.getItem('userLoginName')
    })
      .then(response => {
        this.toggle1 = false;
        const rep = (response as any);
        if (rep.code == 0) {
          this.getList(0);
        } else {
          console.log(response);
        }
      });
  }

  qd() {
    (this.clientService as any).verify({
      id: this.qdId,
      op_name: localStorage.getItem('userLoginName')
    })
      .then(response => {
        this.toggle = false;
        const rep = (response as any);
        if (rep.code == 0) {
          this.getList(0);
        } else {
          console.log(response);
        }
      });
  }

}
