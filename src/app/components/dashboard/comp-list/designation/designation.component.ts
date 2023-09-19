import { Component, Inject, Optional, OnInit } from '@angular/core';
import { String } from 'typescript-string-operations';
import { ApiService } from '../../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AlertService } from '../../../../services/alert.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../../services/common.service';
import { StatusCodes } from '../../../../enums/common/common';
import { AddOrEditService } from '../add-or-edit.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss']
})
export class DesignationComponent implements OnInit {

  modelFormData: FormGroup;
  isSubmitted = false;
  formData: any;
  apiConfigService: any;
  apiService: any;
  companyList: any;


  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DesignationComponent>,
    private commonService: CommonService,
    private addOrEditService: AddOrEditService,
    private datepipe: DatePipe,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      designationId: ['0'],
      designationName: ['', [Validators.required, Validators.minLength(2)]],
      leaveDays: [null],
      advanceAmount: [null],
      narration: [null],
      extraDate: [null],
      extra1: [null],
      extra2: [null]
    });

    this.formData = { ...data };
    if (!this.commonService.checkNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item)
      //this.modelFormData.controls['code'].disable();
    }

  }

  ngOnInit() {
  }

  get formControls() { return this.modelFormData.controls; }


  save() {
    if (this.modelFormData.invalid) {
      return;
    }
    // this.modelFormData.controls['code'].enable();
    this.formData.item = this.modelFormData.value;
    this.formData.item.extraDate = this.formData.item.extraDate ? this.datepipe.transform(this.formData.item.extraDate, 'yyyy-MM-dd') : '';
    this.addOrEditService[this.formData.action](this.formData, (res) => {
      this.dialogRef.close(this.formData);
    });
    // if (this.formData.action == 'Edit') {
    //   this.modelFormData.controls['code'].disable();
    // }
  }

  cancel() {
    this.dialogRef.close();
  }

}
