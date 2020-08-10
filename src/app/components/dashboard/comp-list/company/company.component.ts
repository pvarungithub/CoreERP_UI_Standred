import { Component, Inject, Optional, OnInit } from '@angular/core';
import { String } from 'typescript-string-operations';
import { ApiService } from '../../../../services/api.service';
import { AlertService } from '../../../../services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../../services/common.service';
import { StatusCodes } from '../../../../enums/common/common';
import { DatePipe } from '@angular/common';
import { ApiConfigService } from '../../../../services/api-config.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddOrEditService } from '../add-or-edit.service';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']

})

export class CompanyComponent   implements OnInit {

  modelFormData: FormGroup;
  isSubmitted = false;
  formData: any;
  EmpName: any;
  pipe = new DatePipe('en-US');
  now = Date.now();
  branchesList: any;
  compiniesList: any;
  employeesList: any;
  stateList: any;
  currencyList: any;
  regionsList: any;
  countrysList: any;
  languageList: any;

  constructor(
    private apiService: ApiService,
    private addOrEditService: AddOrEditService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<CompanyComponent>,
    private commonService: CommonService,
    private apiConfigService: ApiConfigService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.modelFormData = this.formBuilder.group({
      
      companyCode: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      companyName: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      shortName: [null, [Validators.minLength(1), Validators.maxLength(10)]],
      city: [null],
      state: [null], 
      region: [null], 
      country: [null], 
      currency: [null], 
      language: [null], 
      address: [null],
      address1: [null],
      location:[null],
      street: [null],
      pin: [null],
      telephone: [null],
      mobile: [null],
      email: [null],
      houseNo: [null],
      panno: [null],
      gstno: [null],
      tanno: [null]
    });

    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      this.modelFormData.controls['companyCode'].disable();
    }
  }

  ngOnInit() {
    this.getstateList();
    this.getLanguageList();
    this.getregionsList();
    this.getcountrysList();
    this.getcurrencyList();
  }

  getLanguageList() {
    const getlanguageList = String.Join('/', this.apiConfigService.getlanguageList);
    this.apiService.apiGetRequest(getlanguageList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.languageList = res.response['LanguageList'];
            }
          }
          this.spinner.hide();
        });
  }
  getregionsList() {
    const getRegionsList = String.Join('/', this.apiConfigService.getRegionsList);
    this.apiService.apiGetRequest(getRegionsList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.regionsList = res.response['RegionList'];
            }
          }
          this.spinner.hide();
        });
  }
  getcountrysList() {
    const getCountrysList = String.Join('/', this.apiConfigService.getCountrysList);
    this.apiService.apiGetRequest(getCountrysList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.countrysList = res.response['CountryList'];
            }
          }
          this.spinner.hide();
        });
  }
  getstateList() {
    const getstateList = String.Join('/', this.apiConfigService.getstatesList);
    this.apiService.apiGetRequest(getstateList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.stateList = res.response['StatesList'];
            }
          }
          this.spinner.hide();
        });
  }
  getcurrencyList() {
    const getcurrencyList = String.Join('/', this.apiConfigService.getcurrencyList);
    this.apiService.apiGetRequest(getcurrencyList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.currencyList = res.response['CurrencyList'];
            }
          }
          this.spinner.hide();
        });
  }


  showErrorAlert(caption: string, message: string) {
  }

  get formControls() { return this.modelFormData.controls; }

  save() {
    if (this.modelFormData.invalid) {
      return;
    }

    this.modelFormData.controls['companyCode'].enable();
    this.formData.item = this.modelFormData.value;
    this.addOrEditService[this.formData.action](this.formData, (res) => {
      this.dialogRef.close(this.formData);
    });
    if (this.formData.action == 'Edit') {
      this.modelFormData.controls['companyCode'].disable();
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}

