import { Component, Inject, Optional, OnInit } from '@angular/core';
import { AlertService } from '../../../../services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNullOrUndefined } from 'util';
import { StatusCodes } from '../../../../enums/common/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { ApiConfigService } from '../../../../services/api-config.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { String } from 'typescript-string-operations';
import { CommonService } from '../../../../services/common.service';

@Component({
  selector: 'app-taxrates',
  templateUrl: './taxrates.component.html',
  styleUrls: ['./taxrates.component.scss']
})

export class TaxRatesComponents implements OnInit {

  modelFormData: FormGroup;
  isSubmitted = false;
  formData: any;
  BranchesList: any;
  getCashPaymentBranchesListArray: any;
  ProductGroupsList: any;
    Taxtype: any;
    Taxtransaction: any;

  constructor(
    private apiService: ApiService,
    private apiConfigService: ApiConfigService,
    private spinner: NgxSpinnerService,
    private commonService: CommonService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<TaxRatesComponents>,

    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      id: ['0'],
      taxRateCode: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      description: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      taxType: [null],
      taxTransaction: [null],
      taxCondition: [null],
      sgst: [null],
       cgst: [null],
      igst: [null],
      ugst:[null]
    });


    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      this.modelFormData.controls['taxRateCode'].disable();
    }

  }

  ngOnInit() {
    this.GetTaxTypesList();
    this.GetTaxTransactionList();
  }

 
  GetTaxTypesList() {
    const gettaxtypelist = String.Join('/', this.apiConfigService.getTaxTypesList);
    this.apiService.apiGetRequest(gettaxtypelist)
      .subscribe(
        response => {
          const res = response.body;
          console.log(res);
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.Taxtype = res.response['TaxtypesList'];
            }
          }
          this.spinner.hide();
        });
  }

  GetTaxTransactionList() {
    const gettaxtransactinlist = String.Join('/', this.apiConfigService.getTaxTransactionList);
    this.apiService.apiGetRequest(gettaxtransactinlist)
      .subscribe(
        response => {
          const res = response.body;
          console.log(res);
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.Taxtransaction = res.response['TaxtransactionList'];
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
    this.formData.item = this.modelFormData.value;
    this.dialogRef.close(this.formData);
    this.modelFormData.controls['taxRateCode'].enable();
  }

  cancel() {
    this.dialogRef.close();
  }
  getGetProductGroupsNamesList() {
    
  }

}
