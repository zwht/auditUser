import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../common/restService/UserService';
import {LocationService} from '../../../common/restService/LocationService';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Md5} from "ts-md5/dist/md5";
import {ElMessageService} from 'element-angular'

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.less'],
	providers: [UserService, LocationService]
})
export class AddComponent implements OnInit {
	toggle1 = false;
	password = "";
	user = {
		id: null,
		login_name: null,
		login_pwd: null,
		login_pwd1: null,
		user_name: null,
		user_type: null,
		user_status: '1'
	};
	locationList = [];
	statusList = [
		{
			name: '启用',
			value: '1'
		},
		{
			name: '禁用',
			value: '0'
		}
	];
	title1 = 'ee';
	locations = [{id:''}]

	constructor(private userService: UserService,
	            private router: Router,
	            private message: ElMessageService,
	            private activatedRoute: ActivatedRoute,
	            private locationService: LocationService) {
	}

	ngOnInit() {
		(this.locationService as any).getList()
			.then(response => {
				this.locationList = response.data;
				this.locationList.splice(this.locationList.length-1,1)
			});
		this.activatedRoute.queryParams.subscribe((params: Params) => {
			this.user.id = params['id'];
			if (this.user.id) {
				this.getById();
			}
		});
		this.activatedRoute.params.subscribe((params) => {
			this.user.user_type = params.type;
			let bj = '添加';
			if (this.user.id) bj = '编辑';
			switch (this.user.user_type) {
				case '0':
					this.title1 = bj + '管理员用户';
					break;
				case '1':
					this.title1 = bj + '审核员用户';
					break;
				case '2':
					this.title1 = bj + '普通用户';
					break;
			}
		});
	}

	del(i) {
		this.locations.splice(i, 1)
	}

	add() {
		this.locations.push({id:''});
	}

	getById() {
		(this.userService as any).getById(this.user.id)
			.then(response => {
				const rep = (response as any);
				if (rep.code == 0) {
					this.user = rep;

					let aa=this.user['location_id'].split(',');
					 this.locations=aa.map(function (iem) {
						return {id:iem};
					});
				} else {
				}
			});
	}


	qdBt() {
		window.history.back()
	}

	save() {
		let loc = '';
		if(this.user.user_type==0){
			loc = '0';
		}else{
			let ar=[];
			let key='';
			this.locations.forEach((obj, i) => {
				ar.forEach(item=>{
					if(item.id==obj.id){
						key='不能重复选择区域！';
					}
				});
				ar.push(obj);
				if(!obj.id){
					key='请选择区域！';
				}
				if (i == this.locations.length - 1) {
					loc += obj.id;
				} else {
					loc += obj.id + ',';
				}
			});
			if(key){
				this.message.error(key);
				return;
			}
		}

		if (this.user.id) {
			if (!this.user.login_name) {
				this.message.error('请输入内容！');
				return
			}

			(this.userService as any).edit_user_info({
				id: this.user.id,
				user_name: this.user.user_name,
				user_type: this.user.user_type,
				user_status: this.user.user_status,
				location_id: loc
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
			if (!this.user.login_name || !this.user.user_type) {
				this.message.error('请输入内容！');
				return
			}
			(this.userService as any).add({
				login_name: this.user.login_name,
				user_name: this.user.user_name,
				user_type: this.user.user_type,
				location_id: loc,
				user_status: 1
			})
				.then(response => {
					const rep = (response as any);
					if (rep.code == 0) {
						this.toggle1 = true;
						this.password = rep.password;
					} else if (rep.code == 10006) {
						this.message.error('添加失败，登录名重复');
					} else {
						console.log(response);
					}
				});
		}
	}
}
