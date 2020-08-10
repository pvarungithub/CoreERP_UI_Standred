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

interface classType {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-AssetClass',
  templateUrl: './AssetClass.component.html',
  styleUrls: ['./AssetClass.component.scss']
})

export class AssetClassComponent implements OnInit {

  modelFormData: FormGroup;
  isSubmitted = false;
  formData: any;
  taxcodeList: any;
  taxaccList: any;
  tdsList:any;
  nrrList:any;

  classtype: classType[] =
  [
    { value: 'Normal', viewValue: 'Normal' },
    { value: 'AUC', viewValue: 'AUC' }
  ];
  companyList: any;
  constructor(
    private addOrEditService: AddOrEditService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AssetClassComponent>,
    private spinner: NgxSpinnerService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      code: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      description: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      numberRange: [null],
      classType: [null],
      lowValueAssetClass: [null],
      assetLowValue: [null]
      
    });


    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      this.modelFormData.controls['code'].disable();
    }

  }

  ngOnInit() {
    this.getyNumberrangeData();
  }
  getyNumberrangeData() {
    const getnumrangeUrl = String.Join('/', this.apiConfigService.getNumberRangeList);
    this.apiService.apiGetRequest(getnumrangeUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.nrrList = res.response['nrrList'];
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
      this.dialogRef.close(this.formData);
    });
    if (this.formData.action == 'Edit') {
      this.modelFormData.controls['code'].disable();
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}
