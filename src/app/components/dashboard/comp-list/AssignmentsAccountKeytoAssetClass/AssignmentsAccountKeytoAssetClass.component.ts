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
  selector: 'app-AssignmentsAccountKeytoAssetClass',
  templateUrl: './AssignmentsAccountKeytoAssetClass.component.html',
  styleUrls: ['./AssignmentsAccountKeytoAssetClass.component.scss']
})

export class AssignmentAccountKeytoAssetClassComponent implements OnInit {

  modelFormData: FormGroup;
  isSubmitted = false;
  formData: any;
 
  assetList:any;
  acckeyList: any;
  constructor(
    private addOrEditService: AddOrEditService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AssignmentAccountKeytoAssetClassComponent>,
    private spinner: NgxSpinnerService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      code: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      description: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      assetClass: [null],
      accountKey: [null]
      
    });

    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      this.modelFormData.controls['code'].disable();
    }

  }

  ngOnInit() {
    this.getassetClassData();
    this.getassetkeyData();
  }
  getassetClassData() {
    const getassetclassUrl = String.Join('/', this.apiConfigService.getAssetClassList);
    this.apiService.apiGetRequest(getassetclassUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.assetList = res.response['assetList'];
            }
          }
          this.spinner.hide();
        });
  }
  getassetkeyData() {
    const getassetblockUrl = String.Join('/', this.apiConfigService.getAccountKeyList);
    this.apiService.apiGetRequest(getassetblockUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.acckeyList = res.response['acckeyList'];
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
