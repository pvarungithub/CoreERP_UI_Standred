import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { String } from 'typescript-string-operations';
import { ApiConfigService } from '../../services/api-config.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '../../services/alert.service';
import { Static } from '../../enums/common/static';
import { SnackBar, StatusCodes } from '../../enums/common/common';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  openMenu = false;
  loginUser: any;
  showExpandButtons: any;
  shiftButton = 'ShiftIN'
  ShiftId: any;
  shiftData: { Shift: string; Id: any; };

  @Input() set showExpandButton(val: string) {
    this.loginUser = JSON.parse(localStorage.getItem('user'));
    this.showExpandButtons = val;
  }

  constructor(
    public commonService: CommonService,
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService,
    private apiConfigService: ApiConfigService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,

  ) {
    let shift = JSON.parse(localStorage.getItem('shift'));
    this.shiftButton = !isNullOrUndefined(shift) ? shift.Shift : 'ShiftIN'
    this.ShiftId = !isNullOrUndefined(shift) ? shift.Id : null
  }

  ngOnInit() {
  }

  logout() {
    const logoutUrl = String.Join('/', this.apiConfigService.logoutUrl, this.loginUser.seqId);
    this.apiService.apiGetRequest(logoutUrl).subscribe(
      response => {
        const res = response.body;
        this.spinner.hide();
        if (!isNullOrUndefined(res.response)) {
        this.alertService.openSnackBar(res.response, Static.Close, SnackBar.success);
        this.authService.logout();
        this.router.navigateByUrl('/login');
        }
      });
  }

  shift() {
    var logoutUrl;
    if (this.shiftButton == 'ShiftIN') {
      logoutUrl = String.Join('/', this.apiConfigService.shiftStart, this.loginUser.seqId, this.loginUser.branchCode);
    } else {
      logoutUrl = String.Join('/', this.apiConfigService.shiftTerminate, this.ShiftId);
    }

    this.apiService.apiGetRequest(logoutUrl).subscribe(
      response => {
        const res = response.body;
        this.spinner.hide();
        if (!isNullOrUndefined(res.response)) {
          if (this.shiftButton == 'ShiftIN') {
            this.shiftData = { Shift: 'ShiftOUT', Id: res.response.ShiftId }
            this.shiftButton = 'ShiftOUT';
            this.ShiftId = res.response.ShiftId;
          } else {
            this.shiftData = { Shift: 'ShiftIN', Id: null }
            this.shiftButton = 'ShiftIN';
            this.alertService.openSnackBar(res.response, Static.Close, SnackBar.success);
          }
          localStorage.setItem('shift', JSON.stringify(this.shiftData))
        }
      });


  }

  openSetting() {
    this.router.navigateByUrl('/dashboard/setting');
  }

  openCloseMemu() {
    if(this.openMenu) {
      this.commonService.closeNav();
      this.openMenu = false;
    } else { 
      this.commonService.openNav();
      this.openMenu = true;
    }
  }
}
