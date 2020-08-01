import { Component, Inject, Optional, OnInit } from '@angular/core';
import { AlertService } from '../../../../services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusCodes } from '../../../../enums/common/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConfigService } from '../../../../services/api-config.service';
import { ApiService } from '../../../../services/api.service';
import { String } from 'typescript-string-operations';
import { CommonService } from '../../../../services/common.service';
@Component({
  selector: 'voucherseries',
  templateUrl: './voucherseries.component.html',
  styleUrls: ['./voucherseries.component.scss']
})

export class VoucherSeriesComponents implements OnInit {

  modelFormData: FormGroup;
  isSubmitted = false;
  formData: any;
  voucherClass: any;
  compList: any;
  branchList: any;
    plantList: any;

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<VoucherSeriesComponents>,
    private spinner: NgxSpinnerService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    private commonService: CommonService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      voucherSeriesKey: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      branch: [null],
      company: [null],
      ext: [null],
      ext1: [null],
      id:['0'],
      fromInterval: [null],
      toInterval: [null],
      plant: [null],
      year: [null]
    });


    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      this.modelFormData.controls['voucherSeriesKey'].disable();
    }

  }

  ngOnInit() {
    this.getcompaniesList();
    this.getbranchessList();
    this.getplantsList();
  }

  getcompaniesList() {
    const getcompanyList = String.Join('/', this.apiConfigService.getCompaniesList);
    this.apiService.apiGetRequest(getcompanyList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.compList = res.response['CompaniesList'];
              console.log(this.voucherClass);
            }
          }
          this.spinner.hide();
        });
  }

  getbranchessList() {
    const getbranchList = String.Join('/', this.apiConfigService.getVoucherBranchesList);
    this.apiService.apiGetRequest(getbranchList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.branchList = res.response['BranchesList'];
              console.log(this.voucherClass);
            }
          }
          this.spinner.hide();
        });
  }

  getplantsList() {
    const getplantsList = String.Join('/', this.apiConfigService.getplantList);
    this.apiService.apiGetRequest(getplantsList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.plantList = res.response['plantList'];
              console.log(this.voucherClass);
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
    this.modelFormData.controls['voucherSeriesKey'].enable();
    this.formData.item = this.modelFormData.value;
    this.dialogRef.close(this.formData);
  }

  cancel() {
    this.dialogRef.close();
  }

}
