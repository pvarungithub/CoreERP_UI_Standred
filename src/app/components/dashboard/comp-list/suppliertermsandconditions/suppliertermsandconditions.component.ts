import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../../../../services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusCodes } from '../../../../enums/common/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConfigService } from '../../../../services/api-config.service';
import { ApiService } from '../../../../services/api.service';
import { String } from 'typescript-string-operations';
import { AddOrEditService } from '../add-or-edit.service';

interface methodType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-suppliertermsandconditions',
  templateUrl: './suppliertermsandconditions.component.html',
  styleUrls: ['./suppliertermsandconditions.component.scss']
})

export class SupplierTermsandconditionsComponent implements OnInit {

  modelFormData: FormGroup;
  formData: any;
  glList: any;
  methodtype: methodType[] =
    [
      { value: 'Road', viewValue: 'Road' },
      { value: 'Rail', viewValue: 'Rail' },
      { value: 'Ship', viewValue: 'Ship' },
      { value: 'Air', viewValue: 'Air' }
    ];
  constructor(private commonService: CommonService,
    private addOrEditService: AddOrEditService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<SupplierTermsandconditionsComponent>,
    private spinner: NgxSpinnerService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      code: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      description: [null, [Validators.required, Validators.minLength(0), Validators.maxLength(50)]],
      deliveryPeriod: [null],
      deliveryDate: null,
      deliveryMethod: null,
      deliveryPlace: null,
      contactPerson: null,
      phoneNumber: null,
      creditPeriod: null,
      advance: null
    });


    this.formData = { ...data };
    if (!this.commonService.checkNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      this.modelFormData.controls['code'].disable();
    }

  }

  ngOnInit() {
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
