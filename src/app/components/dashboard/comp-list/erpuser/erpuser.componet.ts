import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../../../../services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusCodes } from '../../../../enums/common/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConfigService } from '../../../../services/api-config.service';
import { ApiService } from '../../../../services/api.service';
import { String } from 'typescript-string-operations';

@Component({
  selector: 'app-erpuser',
  templateUrl: './erpuser.component.html',
  styleUrls: ['./erpuser.component.scss']
})

export class ErpUsersComponent implements OnInit {
  modelFormData: FormGroup;
  isSubmitted = false;
  formData: any;
  companyList: any;
  employeesList: any;
  RolesList: any;

  constructor(private commonService: CommonService,
    private apiService: ApiService,
    private apiConfigService: ApiConfigService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ErpUsersComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.modelFormData = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(4)]],
      password: ['', [Validators.required, Validators.minLength(2)]],
      role: [null],
      seqId: ['0'],
      branchCode: [null],
      companyCode: [null],
      addDate: [null]
    });

    this.formData = { ...data };
    if (!this.commonService.checkNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      this.modelFormData.controls['userName'].disable();
    }
  }

  ngOnInit() {
    this.getRolesList();
    this.getTableData();
  }

  getRolesList() {
    const getRolesListsUrl = String.Join('/', this.apiConfigService.getrolelist);
    this.apiService.apiGetRequest(getRolesListsUrl).subscribe(
      response => {
        const res = response.body;
        if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!this.commonService.checkNullOrUndefined(res.response)) {
            if (!this.commonService.checkNullOrUndefined(res.response['roleList']) && res.response['roleList'].length) {
              this.RolesList = res.response['roleList'];
              this.spinner.hide();
            }
          }
        }
      });
  }

  getTableData() {
    const getCompanyUrl = String.Join('/', this.apiConfigService.getCompanysList);
    this.apiService.apiGetRequest(getCompanyUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.companyList = res.response['companiesList'];
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
    this.modelFormData.controls['userName'].enable();
    this.formData.item = this.modelFormData.value;
    this.dialogRef.close(this.formData);
  }

  cancel() {
    this.dialogRef.close();
  }
}