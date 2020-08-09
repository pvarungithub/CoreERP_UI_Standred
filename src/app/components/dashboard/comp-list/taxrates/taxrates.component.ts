import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNullOrUndefined } from 'util';
import { StatusCodes } from '../../../../enums/common/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { ApiConfigService } from '../../../../services/api-config.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { String } from 'typescript-string-operations';

interface TaxCondition {
  value: string;
  viewValue: string;
}
interface TaxType {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-taxrates',
  templateUrl: './taxrates.component.html',
  styleUrls: ['./taxrates.component.scss']
})

export class TaxRatesComponents implements OnInit {

  modelFormData: FormGroup;
  formData: any; 
  Taxtransaction: any;

  TaxConditions: TaxCondition[] =
  [
    { value: '1', viewValue: 'Normal(Exempted)' },
    { value: '2', viewValue: 'Not Deducible/Not Exempted' },
    { value: '3', viewValue: 'Reverse Chargeable' },
  ];
  TaxTypess: TaxType[] =
  [
    { value: '1', viewValue: 'Input' },
    { value: '2', viewValue: 'Output' },    
  ];
  constructor(
    private apiService: ApiService,
    private apiConfigService: ApiConfigService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<TaxRatesComponents>,

    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      taxRateCode: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      description: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      taxType: [null],
      taxTransaction: [null],
      sgst: [null],
      cgst: [null],
      igst: [null],
      ugst:[null],
      taxCondition:[null],
      compositeCess:[null]
    });

    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      this.modelFormData.controls['taxRateCode'].disable();
    }
  }

  ngOnInit() {
    this.GetTaxTransactionList();
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
    this.modelFormData.controls['taxRateCode'].enable();
    this.formData.item = this.modelFormData.value;
    this.dialogRef.close(this.formData);    
  }

  cancel() {
    this.dialogRef.close();
  }
  getGetProductGroupsNamesList() {    
  }
}