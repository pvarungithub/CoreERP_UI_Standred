import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusCodes } from '../../../../enums/common/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConfigService } from '../../../../services/api-config.service';
import { ApiService } from '../../../../services/api.service';
import { String } from 'typescript-string-operations';
import { AddOrEditService } from '../add-or-edit.service';

@Component({
  selector: 'app-AlternateControlAccount',
  templateUrl: './AlternateControlAccount.component.html',
  styleUrls: ['./AlternateControlAccount.component.scss']
})

export class AlternateControlAccountComponent implements OnInit {
  modelFormData: FormGroup;
  formData: any;
  glList: any;
  companyList: any;
  coaList: any;

  constructor(
    private addOrEditService: AddOrEditService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AlternateControlAccountComponent>,
    private spinner: NgxSpinnerService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      code: ['0'],
      normalControlAccount: [null],
      alternativeControlAccount: [null],
      chartofAccount: [null],
      company: [null]
    });

    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      this.modelFormData.controls['code'].disable();
    }
  }

  ngOnInit() {
    this.getTableData();
    this.getchartofAccountData();
    this.getGLAccountData();
  }

  getGLAccountData() {
    const getGLAccountUrl = String.Join('/', this.apiConfigService.getGLAccountListbyCatetory);
    this.apiService.apiGetRequest(getGLAccountUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.glList = res.response['glList'].filter(res => res.controlAccount == 'Vendor' || res.controlAccount == 'Customer');
            }
          }
          this.spinner.hide();
        });
  }

  getTableData() {
    const getCompanyUrl = String.Join('/', this.apiConfigService.getCompanyList);
    this.apiService.apiGetRequest(getCompanyUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.companyList = res.response['companiesList'];
            }
          }
          this.spinner.hide();
        });
  }

  getchartofAccountData() {
    const getchartofAccountUrl = String.Join('/', this.apiConfigService.getChartOfAccountList);
    this.apiService.apiGetRequest(getchartofAccountUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.coaList = res.response['coaList'];
            }
          }
          this.spinner.hide();
        });
  }

  get formControls() { return this.modelFormData.controls; }

  save() {
    if (this.modelFormData.invalid) {
      return;
    }
    this.modelFormData.controls['code'].enable();
    this.formData.item = this.modelFormData.value;
    this.addOrEditService[this.formData.action](this.formData, (res) => {
      this.dialogRef.close(this.formData);
    });
    if (this.formData.action == 'Edit') {
      this.modelFormData.controls['code'].disable();
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}