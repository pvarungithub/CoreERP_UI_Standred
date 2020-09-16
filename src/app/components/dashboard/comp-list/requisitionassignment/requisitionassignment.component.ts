import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusCodes } from '../../../../enums/common/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConfigService } from '../../../../services/api-config.service';
import { ApiService } from '../../../../services/api.service';
import { String } from 'typescript-string-operations';
import { AddOrEditService } from '../add-or-edit.service';

@Component({
  selector: 'app-requisitionassignment',
  templateUrl: './requisitionassignment.component.html',
  styleUrls: ['./requisitionassignment.component.scss']
})

export class RequisitionAssignmentComponent implements OnInit {

  modelFormData: FormGroup;
  formData: any;
    reqnorangeList: any;
    companiesList: any;
    plantsList: any;
  constructor(
    private addOrEditService: AddOrEditService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RequisitionAssignmentComponent>,
    private spinner: NgxSpinnerService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      numberRange: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      company: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      plant: [null],
      department: [null],
      currentNumber: [null]
    });


    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      this.modelFormData.controls['numberRange'].disable();
    }

  }

  ngOnInit() {
    this.getNumberRangeData();
    this.getcompanyData();
    this.getPlantData();
    this.getdepartmentData();
  }
  getNumberRangeData() {
    const getNumberRangeUrl = String.Join('/', this.apiConfigService.getnumberRangeList);
    this.apiService.apiGetRequest(getNumberRangeUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.reqnorangeList = res.response['reqnorangeList'];
            }
          }
          this.spinner.hide();
        });
  }

  getcompanyData() {
    const getompanyUrl = String.Join('/', this.apiConfigService.getCompanyList);
    this.apiService.apiGetRequest(getompanyUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.companiesList = res.response['companiesList'];
            }
          }
          this.spinner.hide();
        });
  }

  getPlantData() {
    const getPlantTypeUrl = String.Join('/', this.apiConfigService.getPlantsList);
    this.apiService.apiGetRequest(getPlantTypeUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.plantsList = res.response['plantsList'];
            }
          }
          this.spinner.hide();
        });
  }

  getdepartmentData() {
    const getdepartmentTypeUrl = String.Join('/', this.apiConfigService.getPlantsList);
    this.apiService.apiGetRequest(getdepartmentTypeUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.plantsList = res.response['plantsList'];
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
    this.modelFormData.controls['numberRange'].enable();
    this.formData.item = this.modelFormData.value;
    this.addOrEditService[this.formData.action](this.formData, (res) => {
      this.dialogRef.close(this.formData);
    });
    if (this.formData.action == 'Edit') {
      this.modelFormData.controls['numberRange'].disable();
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}
