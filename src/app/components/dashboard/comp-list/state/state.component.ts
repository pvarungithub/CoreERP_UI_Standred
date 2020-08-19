import { Component, Inject, Optional, OnInit } from '@angular/core';
import { String } from 'typescript-string-operations';
import { ApiService } from '../../../../services/api.service';
import { AlertService } from '../../../../services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConfigService } from '../../../../services/api-config.service';
import { StatusCodes } from '../../../../enums/common/common';
import { AddOrEditService } from '../add-or-edit.service';
@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {

  modelFormData: FormGroup;
  isSubmitted = false;
  formData: any;
  companyList: any;
  countrysList: any;
  languageList: any;

  constructor(
    private apiService: ApiService,
    private addOrEditService: AddOrEditService,
    private apiConfigService: ApiConfigService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<StateComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({

      stateCode: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      stateName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],      
      countryCode: [null],
      language: [null],
    });

    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      this.modelFormData.controls['stateCode'].disable();
    }

  }
    
  ngOnInit() {
    this.getcountrysList();
    this.getLanguageList();
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
  get formControls() { return this.modelFormData.controls; }


  save() {
    if (this.modelFormData.invalid) {     
      return;
    }
    this.modelFormData.controls['stateCode'].enable();
    this.formData.item = this.modelFormData.value;
    this.addOrEditService[this.formData.action](this.formData, (res) => {
      this.dialogRef.close(this.formData);
    });
    if (this.formData.action == 'Edit') {
      this.modelFormData.controls['stateCode'].disable();
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}

