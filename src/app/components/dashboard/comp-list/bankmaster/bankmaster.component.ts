import { Component, Inject, Optional, OnInit } from '@angular/core';
import { String } from 'typescript-string-operations';
import { ApiService } from '../../../../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConfigService } from '../../../../services/api-config.service';
import { StatusCodes } from '../../../../enums/common/common';

interface AccountType {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-bankmaster',
  templateUrl: './bankmaster.component.html',
  styleUrls: ['./bankmaster.component.scss']
})
export class BankMasterComponent implements OnInit {

  modelFormData: FormGroup;
  isSubmitted  =  false;
  formData: any;
  companyList: any;
  employeesList: any;
  stateList: any;
  currencyList: any;
  regionsList: any;
  countrysList: any;

  AccountType: AccountType[] =
  [
    { value: 'Savings', viewValue: 'Savings' },
    { value: 'Current', viewValue: 'Current' },
    { value: 'Term loan', viewValue: 'Term loan' },
    { value: 'OCC', viewValue: 'OCC' },
    { value: 'KCC', viewValue: 'KCC' },
     { value: 'Letter of credit', viewValue: 'Letter of credit' },
     { value: 'Guarantees', viewValue: 'Guarantees' },
     { value: 'Bills discount', viewValue: 'Bills discount' }

  ];
  constructor(
    private apiService: ApiService,
    private apiConfigService: ApiConfigService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<BankMasterComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any ) {

    this.modelFormData = this.formBuilder.group({
      //"id": 1,
      bankCode: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      bankName: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      accountType: [null],
      address: [null],
      address1: [null],
      city: [null],
      state: [null],
      country: [null],
      phone: [null],
      region: [null],
      currency: [null],
      contactPersion: [null],
      branchNumber: [null],
      accountNumber: [null],
      ifsccode: [null],
      swiftkey: [null],
      place: [null],
      bankLimits: [null],
      ext: [null],
      
      });

      this.formData = {...data};
      if (!isNullOrUndefined(this.formData.item)) {
        this.modelFormData.patchValue(this.formData.item);
       this.modelFormData.controls['bankCode'].disable();
      }

  }

  ngOnInit() {
    this.getTableData();
    this.getstateList();
    this.getregionsList();
    this.getcountrysList();
    this.getcurrencyList();
    this.getEmployeesList();
  }

  getTableData() {
    const getCompanyUrl = String.Join('/', this.apiConfigService.getCompanysList);
    this.apiService.apiGetRequest(getCompanyUrl)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            console.log(res);
            this.companyList = res.response['companiesList'];
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
  getEmployeesList() {
    const getEmployeeList = String.Join('/', this.apiConfigService.getEmployeeList);
    this.apiService.apiGetRequest(getEmployeeList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.employeesList = res.response['employeesList'];
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
    this.modelFormData.controls['bankCode'].enable();
    this.formData.item = this.modelFormData.value;
    this.dialogRef.close(this.formData);
  }

  cancel() {
    this.dialogRef.close();
  }
}