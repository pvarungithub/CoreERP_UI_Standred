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
  compList: any;
  branchList: any;
  plantList: any;
  
  status: Status[] =
  [
    { value: '1', viewValue: 'Resident' },
    { value: '2', viewValue: 'Non Resident' }
  ];
  tdsratesList: any;
  constructor(
    private formBuilder: FormBuilder,
    private addOrEditService: AddOrEditService,
    public dialogRef: MatDialogRef<PostingComponent>,
    private spinner: NgxSpinnerService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      code: [0],
      // tdstype: [null],
      tdsrate: [null],
      glaccount:[null],
      branch: [null],
      company: [null],
      plant: [null]
    });


    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      // this.modelFormData.controls['code'].disable();
    }

  }

  ngOnInit() {
    this.getTDSTypeList();
    this.getcompaniesList();
    this.getbranchessList();
    this.getplantsList();
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

  getcompaniesList() {
    const getcompanyList = String.Join('/', this.apiConfigService.getCompaniesList);
    this.apiService.apiGetRequest(getcompanyList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.compList = res.response['CompaniesList'];
            }
          }
          this.spinner.hide();
        });
  }

  getbranchessList() {
    const getbranchList = String.Join('/', this.apiConfigService.getVoucherBranchesList);
    this.apiService.apiGetRequest(getbranchList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {             
              this.branchList = res.response['branchesList'];
            }
          }
          this.spinner.hide();
        });
  }

  getplantsList() {
    const getplantsList = String.Join('/', this.apiConfigService.getplantList);
    this.apiService.apiGetRequest(getplantsList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.plantList = res.response['plantList'];
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
    // this.modelFormData.controls['code'].enable();
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