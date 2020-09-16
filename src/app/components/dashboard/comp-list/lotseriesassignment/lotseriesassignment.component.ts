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
  selector: 'app-lotseriesassignment',
  templateUrl: './lotseriesassignment.component.html',
  styleUrls: ['./lotseriesassignment.component.scss']
})

export class StoresAssignmentComponent implements OnInit {

  modelFormData: FormGroup;
  formData: any;
  companiesList: any;
  plantsList: any; 
    porangeList: any;
    porderList: any;
    lotList: any;
  constructor(
    private addOrEditService: AddOrEditService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<StoresAssignmentComponent>,
    private spinner: NgxSpinnerService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      lotSeries: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      company: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      plant: [null],
      materialType: [null],
      currentNumber: [null]
      
    });


    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      this.modelFormData.controls['lotSeries'].disable();
    }

  }

  ngOnInit() {
    this.getLotSeriesData();
    this.getcompanyData();
    this.getPlantData();
    this.getpurchaseOrderTypeData();
  }
  getLotSeriesData() {
    const getLotSeriesUrl = String.Join('/', this.apiConfigService.getLotSeriesUrlList);
    this.apiService.apiGetRequest(getLotSeriesUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.lotList = res.response['lotList'];
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

  getpurchaseOrderTypeData() {
    const getpurchaseOrderTypeUrl = String.Join('/', this.apiConfigService.getpurchaseOrderTypeList);
    this.apiService.apiGetRequest(getpurchaseOrderTypeUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.porderList = res.response['porderList'];
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
    this.modelFormData.controls['lotSeries'].enable();
    this.formData.item = this.modelFormData.value;
    this.addOrEditService[this.formData.action](this.formData, (res) => {
      this.dialogRef.close(this.formData);
    });
    if (this.formData.action == 'Edit') {
      this.modelFormData.controls['lotSeries'].disable();
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}
