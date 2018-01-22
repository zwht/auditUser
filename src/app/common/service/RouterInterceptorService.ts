import { Injectable } from '@angular/core';
import { CanActivate, //守卫，处理导航到某路由的情况。
  Router,
  ActivatedRouteSnapshot,  //
  RouterStateSnapshot, //
  CanActivateChild //守卫，处理导航到子路由的情况
} from '@angular/router';

@Injectable()
export class RouterInterceptorService implements CanActivate{

  constructor( private router: Router) {}

  canActivate( route: ActivatedRouteSnapshot , state: RouterStateSnapshot){
    if(localStorage.getItem('userName')){
      return true;
    }else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
