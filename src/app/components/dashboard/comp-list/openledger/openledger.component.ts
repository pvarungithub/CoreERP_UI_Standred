import { Component, Inject, Optional, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../../../../services/common.service';
import { ApiService } from '../../../../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConfigService } from '../../../../services/api-config.service';
import { StatusCodes } from '../../../../enums/common/common';
import { String } from 'typescript-string-operations';
import { AddOrEditService } from '../add-or-edit.service';

interface MonthList {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-openledger',
  templateUrl: './openledger.component.html',
  styleUrls: ['./openledger.component.scss']
})
export class OpenLedgerComponent implements OnInit {
  modelFormData: FormGroup;
  formData: any;
  ledgerList: any;

  financialYearEndTo: MonthList[] =
    [
      { value: '1', viewValue: 'January' },
      { value: '2', viewValue: 'February' },
      { value: '3', viewValue: 'March' },
      { value: '4', viewValue: 'April' },
      { value: '5', viewValue: 'May' },
      { value: '6', viewValue: 'June' },
      { value: '7', viewValue: 'July' },
      { value: '8', viewValue: 'August' },
      { value: '9', viewValue: 'September' },
      { value: '10', viewValue: 'October' },
      { value: '11', viewValue: 'November' },
      { value: '12', viewValue: 'December' }

    ];
  constructor(private commonService: CommonService,
    private apiService: ApiService,
    private addOrEditService: AddOrEditService,
    private apiConfigService: ApiConfigService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<OpenLedgerComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      ledgerKey: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      id: ['0'],
      financialYearEndTo: [null],
      accountingYear: [null],
      financialYearStartFrom: [null]
    });

    this.formData = { ...data };
    if (!this.commonService.checkNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
    }

  }

  ngOnInit() {
    this.getLedgerList();
  }

  get formControls() { return this.modelFormData.controls; }

  save() {
    if (this.modelFormData.invalid) {
      return;
    }
    this.formData.item = this.modelFormData.value;
    this.addOrEditService[this.formData.action](this.formData, (res) => {
      this.dialogRef.close(this.formData);
    });
    if (this.formData.action == 'Edit') {
      this.modelFormData.controls['id'].disable();
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  getLedgerList() {
    const getLedgerList = String.Join('/', this.apiConfigService.getLedgerList);
    this.apiService.apiGetRequest(getLedgerList)
      .subscribe(
        response => {
          const res = response;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.ledgerList = res.response['ledgerList'];
            }
          }
          this.spinner.hide();
        });
  }
}