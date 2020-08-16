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
  selector: 'app-assignglaccount',
  templateUrl: './assignglaccount.component.html',
  styleUrls: ['./assignglaccount.component.scss']
})

export class AssignGLaccounttoSubGroupComponent implements OnInit {

  modelFormData: FormGroup;
  formData: any;
  glAccgrpList: any;
  subaccList: any;
  glList: any;
  structkeyList: any;
  constructor(
    private addOrEditService: AddOrEditService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AssignGLaccounttoSubGroupComponent>,
    private spinner: NgxSpinnerService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      code: [0],
      glgroup: [null],
      subAccount: [null],
      fromGl: [null],
      toGl: [null]
    });

    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item))
     {
      this.modelFormData.patchValue(this.formData.item);
      this.getSubacclist();
    }
  }

  ngOnInit() {
    this.getGLaccData();
    this.getglAccgrpList();
    this.geStructurekeyData();
  }
  getglAccgrpList() {
    const getglAccgrpList = String.Join('/', this.apiConfigService.getglAccgrpList);
    this.apiService.apiGetRequest(getglAccgrpList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.glAccgrpList = res.response['GLAccGroupList'];
            }
          }
          this.spinner.hide();
        });
  }
  getSubacclist() {
    const getAccountNamelist = String.Join('/', this.apiConfigService.subgrouplist, this.modelFormData.get('glgroup').value);
    this.apiService.apiGetRequest(getAccountNamelist)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.subaccList = res.response['GetAccountNamelist'];
            }
          }
          this.spinner.hide();
        });
  }
  getGLaccData() {
    const getdptcnUrl = String.Join('/', this.apiConfigService.getGLAccountList);
    this.apiService.apiGetRequest(getdptcnUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.glList = res.response['glList'];
            }
          }
          this.spinner.hide();
        });
  }
  geStructurekeyData() {
    const geStructurekeynUrl = String.Join('/', this.apiConfigService.getStructurekeyList);
    this.apiService.apiGetRequest(geStructurekeynUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.structkeyList = res.response['structkeyList'];
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
    let array = [];
    this.formData.item = {...this.modelFormData.value};
    this.formData.item.fromGl.forEach((res) => {
      this.formData.item['fromGl'] = res;
      array.push({...this.formData.item});
    })
    this.formData.item ={"GLS":array };    
    this.addOrEditService[this.formData.action](this.formData, (res) => {
      this.dialogRef.close(this.formData);
    });
  }

  cancel() {
    this.dialogRef.close();
  }

}
