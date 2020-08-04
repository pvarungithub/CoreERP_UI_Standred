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

interface voucherNature {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'voucherclass',
  templateUrl: './voucherclass.component.html',
  styleUrls: ['./voucherclass.component.scss']
})

export class VoucherClassComponent implements OnInit {

  modelFormData: FormGroup;
  isSubmitted = false;
  formData: any;
  voucherClass: any;
  compList: any;
  branchList: any;

  voucherNatures: voucherNature[] =
  [
    { value: 'Invoice', viewValue: 'Invoice' },
    { value: 'memo', viewValue: 'memo' },
    { value: 'general', viewValue: 'general' },
    { value: 'payments', viewValue: 'payments' },
    { value: 'recipts', viewValue: 'recipts' },
    { value: 'general memo', viewValue: 'general memo' }
  ];
  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<VoucherClassComponent>,
    private spinner: NgxSpinnerService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    private commonService: CommonService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      voucherKey: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      description: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      voucherNature:[null]
    });


    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      this.modelFormData.controls['voucherKey'].disable();
    }

  }

  ngOnInit() {
   
  }


  get formControls() { return this.modelFormData.controls; }


  save() {
    //debugger;
    if (this.modelFormData.invalid) {
      return;
    }
     this.modelFormData.controls['voucherKey'].enable();
    this.formData.item = this.modelFormData.value;
    this.dialogRef.close(this.formData);
  }

  cancel() {
    this.dialogRef.close();
  }

}
