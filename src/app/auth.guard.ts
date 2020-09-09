import { Injectable } from '@angular/core';
import {
  CanActivate, CanActivateChild,
  CanLoad, Route, UrlSegment, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { tap, map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { String } from 'typescript-string-operations';
import { ApiConfigService } from './services/api-config.service';
import { AddOrEditService } from './components/dashboard/comp-list/add-or-edit.service';
import { ApiService } from './services/api.service';
import { CommonService } from './services/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, Resolve<any> {
  options;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private apiConfigService: ApiConfigService,
    private addOrEditService: AddOrEditService,
    private commomService: CommonService,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) {
    this.options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // let obj = JSON.parse(localStorage.getItem("user"));
    // const getMenuUrl = String.Join('/', this.apiConfigService.getMenuUrl, obj.role);
    // return this.http.get(getMenuUrl, { headers: this.options, observe: 'response', params: obj })
    //   .pipe((map(res => {
    // console.log(res.body['response'], next.params.id)
    // if (this.authorizedUser(res.body.response)) {
    if (this.authService.isLoggedIn()) {
      if (state.url.includes('Edit') || state.url.includes('Add') || state.url.includes('New')) {
        if (!this.addOrEditService.editData && next.url.length > 1) {
          // let route;
          // route = state.url.replace('/Edit', '');
          // route = route.replace('/Add', '');
          // route = route.replace('/New', '');
          const route = String.Join('/', 'dashboard', next.url[0].path, next.url[1].path);
          this.router.navigate([route]);
        }
      }
      return true;
    }
    // }
    this.router.navigate(['/login']);
    return false;
    // })));
  }

  resolve(route: ActivatedRouteSnapshot) {
    let obj = JSON.parse(localStorage.getItem("user"));
    const configUrl = String.Join('/', this.apiConfigService.getFieldsConfig, route.url[0].path, route.url[1].path, obj.userName);
    
    return  true;
    // this.http.get(configUrl, { headers: this.options, observe: 'response', params: obj })
    //   .pipe((map(res => this.commomService.routeConfig = JSON.parse(res.body['response']['FieldsConfiguration']))));

  }

}
