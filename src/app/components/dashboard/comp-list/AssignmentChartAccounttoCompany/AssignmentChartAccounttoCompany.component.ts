import { Component, Inject, Optional, OnInit } from '@angular/core';
import { AlertService } from '../../../../services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusCodes } from '../../../../enums/common/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConfigService } from '../../../../services/api-config.service';
import { ApiService } from '../../../../services/api.service';
import { String } from 'typescript-string-operations';
import { CommonService } from '../../../../services/common.service';
import { AddOrEditService } from '../add-or-edit.service';

interface Status {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-AssignmentChartAccounttoCompany',
  templateUrl: './AssignmentChartAccounttoCompany.component.html',
  styleUrls: ['./AssignmentChartAccounttoCompany.component.scss']
})

export class AssignmentChartAccounttoCompanyComponent implements OnInit {

  modelFormData: FormGroup;
  isSubmitted = false;
  formData: any;
  taxcodeList: any;
  taxaccList: any;
  tdsList:any;
  incmList:any;
  
  status: Status[] =
  [
    { value: 'Resident', viewValue: 'Resident' },
    { value: 'Non Resident', viewValue: 'Non Resident' }
  ];
  companyList: any;
  constructor(
    private alertService: AlertService,
    private addOrEditService: AddOrEditService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AssignmentChartAccounttoCompanyComponent>,
    private spinner: NgxSpinnerService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    private commonService: CommonService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      code: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      description: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      operationCoa: [null],
      groupCoa: [null],
      company: [null]
      
    });


    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      this.modelFormData.controls['code'].disable();
    }

  }

  ngOnInit() {
    this.getcompanyData();
  }
  getcompanyData() {
    const getCompanyUrl = String.Join('/', this.apiConfigService.getCompanysList);
    this.apiService.apiGetRequest(getCompanyUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
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
