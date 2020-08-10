import { Component, Inject, Optional, OnInit } from '@angular/core';
import { String } from 'typescript-string-operations';
import { ApiService } from '../../../../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConfigService } from '../../../../services/api-config.service';
import { StatusCodes } from '../../../../enums/common/common';
import { AddOrEditService } from '../add-or-edit.service';

interface account {
  value: string;
  viewValue: string;
}
interface TaxCategory {
  value: string;
  viewValue: string;
}
interface CostElementCategory {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-glaccount',
  templateUrl: './glaccount.component.html',
  styleUrls: ['./glaccount.component.scss']
})
export class GLAccountComponent implements OnInit {

  modelFormData: FormGroup;
  isSubmitted  =  false;
  formData: any;
  companyList: any;
  employeesList: any;
  stateList: any;
  currencyList: any;
  regionsList: any;
  countrysList: any;
  languageList: any;
  
  accounts: account[] =
  [
    { value: '1', viewValue: 'account' },
    { value: '3', viewValue: 'account3' },
    { value: '4', viewValue: 'account4' } ,  
    { value: '5', viewValue: 'account5' } ,  
    { value: '6', viewValue: 'account6' } 
  ];
  
  
  taxCategorys: TaxCategory[] =
  [
    { value: 'Input', viewValue: 'Input' } ,  
    { value: 'Output', viewValue: 'Output' } 
  ];
 
  costElementCategorys: CostElementCategory[] =
  [
    { value: ' Primary cost', viewValue: ' Primary cost' } , 
    { value: ' Secondary cost', viewValue: 'Secondary cost' } ,
    { value: 'Revenues', viewValue: 'Revenues' } ,
    { value: 'Internal settlement', viewValue: 'Internal settlement' } ,
    { value: 'External settlement', viewValue: 'External settlement' } 
  ];
  
  constructor(
    private apiService: ApiService,
    private addOrEditService: AddOrEditService,
    private apiConfigService: ApiConfigService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<GLAccountComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any ) {

    this.modelFormData = this.formBuilder.group({
      accountNumber: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      company: [null],
      chartAccount: [null],
      accGroup: [null],
      glaccountName: [null],
      consolidatedAccount: [null],
      currency: [null],
      taxCategory: [null],
      controlAccount: [null],
      clearingAccount: [null],
      noPostingAllowed: [null],
      relevantCashFlow: [null],
      bankKey: [null],
      legacyGl: [null],
      costElementCategory: [null],
      
      });

      this.formData = {...data};
      if (!isNullOrUndefined(this.formData.item)) {
        this.modelFormData.patchValue(this.formData.item);
       this.modelFormData.controls['accountNumber'].disable();
      }

  }

  ngOnInit() {
    this.getcurrencyList();
    this.getTableData();
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
 
  get formControls() { return this.modelFormData.controls; }

  save() {
    if (this.modelFormData.invalid) {
      return;
    }
    this.modelFormData.controls['accountNumber'].enable();
    this.formData.item = this.modelFormData.value;
    this.addOrEditService[this.formData.action](this.formData, (res) => {
      this.dialogRef.close(this.formData);
    });
    if (this.formData.action == 'Edit') {
      this.modelFormData.controls['accountNumber'].disable();
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}