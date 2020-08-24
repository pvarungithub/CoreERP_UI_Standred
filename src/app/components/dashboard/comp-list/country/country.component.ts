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

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  modelFormData: FormGroup;
  formData: any;
  languageList: any;
  currencyList: any;

  constructor(
    private apiService: ApiService,
    private addOrEditService: AddOrEditService,
    private apiConfigService: ApiConfigService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CountryComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      countryCode: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      countryName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      language: [null],
      currency: [null]
    });

    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      this.modelFormData.controls['countryCode'].disable();
    }
  }

  ngOnInit() {
    this.getLanguageList();
    this.getcurrencyList();
  }

  get formControls() { return this.modelFormData.controls; }

  getLanguageList() {
    const getlanguageList = String.Join('/', this.apiConfigService.getLanguageList);
    this.apiService.apiGetRequest(getlanguageList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.languageList = res.response['languageList'];
            }
          }
          this.spinner.hide();
        });
  }

  getcurrencyList() {
    const getcurrencyList = String.Join('/', this.apiConfigService.getCurrencyList);
    this.apiService.apiGetRequest(getcurrencyList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.currencyList = res.response['currencyList'];
            }
          }
          this.spinner.hide();
        });
  }

  save() {
    if (this.modelFormData.invalid) {
      return;
    }
    this.modelFormData.controls['countryCode'].enable();
    this.formData.item = this.modelFormData.value;
    this.addOrEditService[this.formData.action](this.formData, (res) => {
      this.dialogRef.close(this.formData);
    });
    if (this.formData.action == 'Edit') {
      this.modelFormData.controls['countryCode'].disable();
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}