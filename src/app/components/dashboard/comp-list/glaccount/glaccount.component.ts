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
  formData: any;
  companyList: any;
  currencyList: any;
  glAccgrpList: any;
  coaList: any;
  bankList: any;

  accounts: account[] =
    [
      { value: 'Asset', viewValue: 'Asset' },
      { value: 'Contractor', viewValue: 'Contractor' },
      { value: 'Customer', viewValue: 'Customer' },
      { value: 'Material', viewValue: 'Material' },
      { value: 'ServiceProvider', viewValue: 'ServiceProvider' },
      { value: 'Vendor', viewValue: 'Vendor' }
    ];

  taxCategorys: TaxCategory[] =
    [
      { value: 'Bank', viewValue: 'Bank' },
      { value: 'Cash', viewValue: 'Cash' },
      { value: 'Control Account', viewValue: 'Control Account' },
      { value: 'Fixed Account', viewValue: 'Fixed Account' },
      { value: 'Inventory', viewValue: 'Inventory' },
      { value: 'TDS', viewValue: 'TDS' },
      { value: 'TAX', viewValue: 'TAX' }
    ];

  costElementCategorys: CostElementCategory[] =
    [
      { value: ' Primary cost', viewValue: ' Primary cost' },
      { value: ' Secondary cost', viewValue: 'Secondary cost' },
      { value: 'Revenues', viewValue: 'Revenues' },
      { value: 'Internal settlement', viewValue: 'Internal settlement' },
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
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      accountNumber: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
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
      subgroup: [null],
      Undersubaccount: [null],
      groupUnder: [null]
    });

    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      this.modelFormData.controls['accountNumber'].disable();
    }
    this.onCategoryChange();
  }

  ngOnInit() {
    this.getcurrencyList();
    this.getTableData();
    this.getchartofAccountData();
    this.getglAccgrpList();
    this.getBankData();
  }

  onCategoryChange() {
    this.modelFormData.controls['bankKey'].disable();
    this.modelFormData.controls['controlAccount'].disable();
    this.modelFormData.patchValue({
      bankKey: null,
      controlAccount: null
    })

    if (this.modelFormData.get('taxCategory').value == 'Bank') {
      this.modelFormData.controls['bankKey'].enable();
    }

    if (this.modelFormData.get('taxCategory').value == 'Control Account') {
      this.modelFormData.controls['controlAccount'].enable();
    }
  }

  onChange(event: any) {
    const getAccountSubGrouplist = String.Join('/', this.apiConfigService.getaccountNumber,
      this.modelFormData.get('accGroup').value, this.modelFormData.get('accountNumber').value);
    this.apiService.apiGetRequest(getAccountSubGrouplist)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
            }
          }
          this.spinner.hide();
        });
  };

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

  getglAccgrpList() {
    const getglAccgrpList = String.Join('/', this.apiConfigService.getglAccgrpList);
    this.apiService.apiGetRequest(getglAccgrpList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.glAccgrpList = res.response['GLAccGroupList'];
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

  getBankData() {
    const getbankUrl = String.Join('/', this.apiConfigService.getBankMastersList);
    this.apiService.apiGetRequest(getbankUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.bankList = res.response['bankList'];
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