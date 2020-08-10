import { Injectable } from '@angular/core';
import { String } from 'typescript-string-operations';
import { RuntimeConfigService } from '../../../services/runtime-config.service';
import { ApiService } from '../../../services/api.service';
import { isNullOrUndefined } from 'util';
import { StatusCodes, SnackBar } from '../../../enums/common/common';
import { AlertService } from '../../../services/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class AddOrEditService {

  tableParameters: any;

  constructor(
    private environment: RuntimeConfigService,
    private apiService: ApiService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService
  ) { }

  Add(result, callBack) {
    const addCompanyUrl = String.Join('', this.environment.runtimeConfig.serverUrl, this.tableParameters.registerUrl);
    this.apiService.apiPostRequest(addCompanyUrl, result.item)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.alertService.openSnackBar('Record Added...', 'close', SnackBar.success);
              callBack(res);
            }
          }
          this.spinner.hide();
        });
  }

  Edit(result, callBack) {
    const updateCompanyUrl = String.Join('', this.environment.runtimeConfig.serverUrl, this.tableParameters.updateUrl);
    this.apiService.apiUpdateRequest(updateCompanyUrl, result.item)
      .subscribe(
        response => {
          const res = response.body;
          this.spinner.hide();
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.alertService.openSnackBar('Record Updated...', 'close', SnackBar.success);
              callBack(res);
            }
          }
        });
  }

}
