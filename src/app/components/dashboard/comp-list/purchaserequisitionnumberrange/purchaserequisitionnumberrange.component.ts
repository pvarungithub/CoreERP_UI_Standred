import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../../../../services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConfigService } from '../../../../services/api-config.service';
import { ApiService } from '../../../../services/api.service';
import { String } from 'typescript-string-operations';
import { AddOrEditService } from '../add-or-edit.service';
import { Static } from '../../../../enums/common/static';
import { AlertService } from '../../../../services/alert.service';
import { StatusCodes, SnackBar } from '../../../../enums/common/common';
@Component({
  selector: 'app-purchaserequisitionnumberrange',
  templateUrl: './purchaserequisitionnumberrange.component.html',
  styleUrls: ['./purchaserequisitionnumberrange.component.scss']
})

export class PurchaseRequisitionNumberRangeComponent implements OnInit {

  modelFormData: FormGroup;
  formData: any;
  companiesList: any;
  plantsList: any; 
    porangeList: any;
    porderList: any;
    lotList: any;
  mseriesnoList: any;
  constructor(private commonService: CommonService,
    private addOrEditService: AddOrEditService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PurchaseRequisitionNumberRangeComponent>,
    private spinner: NgxSpinnerService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    private alertService: AlertService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      plant: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      code: [null],
      department: [null],
      fromInterval: [null],
      toInterval: [null],
      currentNumber: [null],
      prefix:[null]
     
   });


    this.formData = { ...data };
    if (!this.commonService.checkNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      this.modelFormData.controls['plant'].disable();
    }

  }
  onChangeEvent()
  {
    this.validationcode();
  }
  onChangeEvents() {
    this.validationcode();
  }

  validationcode() {
    let i = 0;
    let j = 0;
    i = parseInt(this.modelFormData.get('fromInterval').value);
    j = parseInt(this.modelFormData.get('toInterval').value);
    if (i <= j) {
    }
    else {
      this.alertService.openSnackBar("Enter correct Value", Static.Close, SnackBar.error);
    }

  }
  ngOnInit() {
    this.getPlantData();
    this.getpurchaseOrderTypeData();
  }

  getPlantData() {
    const getPlantTypeUrl = String.Join('/', this.apiConfigService.getPlantsList);
    this.apiService.apiGetRequest(getPlantTypeUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
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
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
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
    this.modelFormData.controls['plant'].enable();
    this.formData.item = this.modelFormData.value;
    this.addOrEditService[this.formData.action](this.formData, (res) => {
      this.dialogRef.close(this.formData);
    });
    if (this.formData.action == 'Edit') {
      this.modelFormData.controls['plant'].disable();
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}
