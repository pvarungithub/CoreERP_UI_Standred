import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusCodes } from '../../../../enums/common/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConfigService } from '../../../../services/api-config.service';
import { ApiService } from '../../../../services/api.service';
import { String } from 'typescript-string-operations';

interface Status {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  styleUrls: ['./posting.component.scss']
})

export class PostingComponent implements OnInit {

  modelFormData: FormGroup;
  formData: any;
  tdsList:any;
  incmList:any;
  
  status: Status[] =
  [
    { value: '1', viewValue: 'Resident' },
    { value: '2', viewValue: 'Non Resident' }
  ];
  tdsratesList: any;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PostingComponent>,
    private spinner: NgxSpinnerService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      code: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      description: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      tdstype: [null],
      incomeType: [null],
      tdsrate: [null],
      glaccount:[null],
      date: null
    });


    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      this.modelFormData.controls['code'].disable();
    }

  }

  ngOnInit() {
    this.getTdsTypeList();
    this.getIncomeTypeList();
    this.getTDSTypeList();
  }
  getTdsTypeList() {
    const getTDSList = String.Join('/', this.apiConfigService.getTDStypeList);
    this.apiService.apiGetRequest(getTDSList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.tdsList = res.response['tdsList'];
            }
          }
          this.spinner.hide();
        });
  }
  getIncomeTypeList() {
    const getIncomeList = String.Join('/', this.apiConfigService.getIncomeTypeList);
    this.apiService.apiGetRequest(getIncomeList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.incmList = res.response['incmList'];
            }
          }
          this.spinner.hide();
        });
  }
  getTDSTypeList() {
    const getTDSList = String.Join('/', this.apiConfigService.getTDSRatesList);
    this.apiService.apiGetRequest(getTDSList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.tdsratesList = res.response['tdsratesList'];
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