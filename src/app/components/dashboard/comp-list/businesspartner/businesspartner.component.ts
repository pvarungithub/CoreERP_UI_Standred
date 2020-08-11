import { Component, Inject, Optional, OnInit, OnDestroy } from '@angular/core';
import { String } from 'typescript-string-operations';
import { ApiService } from '../../../../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConfigService } from '../../../../services/api-config.service';
import { StatusCodes } from '../../../../enums/common/common';
import { AddOrEditService } from '../add-or-edit.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-businesspartner',
  templateUrl: './businesspartner.component.html',
  styleUrls: ['./businesspartner.component.scss']
})
export class BusienessPartnerAccountComponent implements OnInit, OnDestroy {

  modelFormData: FormGroup;
  isSubmitted  =  false;
  formData: any;
  companyList: any;
  employeesList: any;
  stateList: any;
  ptypeList: any;
  regionsList: any;
  countrysList: any;
  ptermsList: any;

  constructor(
    private apiService: ApiService,
    private addOrEditService: AddOrEditService,
    private apiConfigService: ApiConfigService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {

    this.modelFormData = this.formBuilder.group({
      //"id": 1,
      code: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      name: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      bpnumber:[null],
      bptype: [null],
      name1: [null],
      search: [null],
      address:[null],
      address1: [null],
      location:[null],
      city:[null],
      state: [null],
      region: [null],
      country:[null],
      email: [null],
      phone:[null],
      mobile: [null],
      gstno: [null],
      panno:[null],
      tanno:[null],               
      taxClassification:[null],  
      company: [null],  
      controlAccount:[null],  
      paymentTerms:[null],  
      tdstype: [null],  
      tdstate: [null],  
      baseAmount: [null],  
      obligationFrom: [null],  
      obligationTo:[null],  
      bankKey: [null],  
      bankName: [null],  
      bankAccountNo:[null],  
      ifsccode:[null],  
      swiftcode: [null],  
      bankBranch: [null],  
      bankBranchNo:[null],  
      contactPersion: [null],  
      contactPersionMobile:[null],  
      narration: [null],  
      ext:[null]        
               
      });

      this.formData = {...this.addOrEditService.editData};
      if (!isNullOrUndefined(this.formData.item)) {
        this.modelFormData.patchValue(this.formData.item);
       this.modelFormData.controls['code'].disable();
      }

  }

  ngOnInit() {
    this.getTableData();
    this.getstateList();
    this.getPaymenttermsList();
    this.getregionsList();
    this.getcountrysList();
    this.getptypeList();
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

  getPaymenttermsList() {
    const getpmList = String.Join('/', this.apiConfigService.getPaymentTermsList);
    this.apiService.apiGetRequest(getpmList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.ptermsList = res.response['ptermsList'];
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
  getptypeList() {
    const getcurrencyList = String.Join('/', this.apiConfigService.getPartnerTypeList);
    this.apiService.apiGetRequest(getcurrencyList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.ptypeList = res.response['ptypeList'];
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
    this.modelFormData.controls['code'].enable();
    this.formData.item = this.modelFormData.value;
    this.addOrEditService[this.formData.action](this.formData, (res) => {
      this.router.navigate(['/dashboard/master/businesspartner']);
    });
    if (this.formData.action == 'Edit') {
      this.modelFormData.controls['code'].disable();
    }
  }

  cancel() {
    this.router.navigate(['/dashboard/master/businesspartner']);
  }

  ngOnDestroy() {
    this.addOrEditService.editData = null;
  }
}