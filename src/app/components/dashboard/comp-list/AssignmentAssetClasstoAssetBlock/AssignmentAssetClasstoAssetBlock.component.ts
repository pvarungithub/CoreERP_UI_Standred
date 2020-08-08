import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusCodes } from '../../../../enums/common/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConfigService } from '../../../../services/api-config.service';
import { ApiService } from '../../../../services/api.service';
import { String } from 'typescript-string-operations';

@Component({
  selector: 'AssignmentAssetClasstoAssetBlock',
  templateUrl: './AssignmentAssetClasstoAssetBlock.component.html',
  styleUrls: ['./AssignmentAssetClasstoAssetBlock.component.scss']
})

export class AseetClassToAssetBlockComponent implements OnInit {

  modelFormData: FormGroup;
  isSubmitted = false;
  formData: any;
  voucherClass: any;
  assetList: any;
  assetblockList: any;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AseetClassToAssetBlockComponent>,
    private spinner: NgxSpinnerService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      code: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      description: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      assetClass: [null],
      assetBlock: [null]
     
    });

    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      this.modelFormData.controls['code'].disable();
    }
  }

  ngOnInit() {
    this.getassetclassList();
    this.getassetblockList();
  }

  getassetclassList() {
    const getassetist = String.Join('/', this.apiConfigService.getAssetClassList);
    this.apiService.apiGetRequest(getassetist)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.assetList = res.response['assetList'];
              console.log(this.voucherClass);
            }
          }
          this.spinner.hide();
        });
  }

  getassetblockList() {
    const getassetblocksList = String.Join('/', this.apiConfigService.getAssetBlockList);
    this.apiService.apiGetRequest(getassetblocksList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.assetblockList = res.response['assetblockList'];
              console.log(this.voucherClass);
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
    this.dialogRef.close(this.formData);
  }

  cancel() {
    this.dialogRef.close();
  }

}