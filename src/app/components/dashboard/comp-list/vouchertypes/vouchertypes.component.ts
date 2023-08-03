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

interface accountType {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'vouchertypes',
  templateUrl: './vouchertypes.component.html',
  styleUrls: ['./vouchertypes.component.scss']
})

export class VoucherTypesComponent implements OnInit {
  modelFormData: FormGroup;
  formData: any;
  voucherClass: any;

  voucherNatures: accountType[] =
    [
      { value: '1', viewValue: 'Asset' },
      { value: '2', viewValue: 'Bank' },
      { value: '3', viewValue: 'Cash' },
      { value: '4', viewValue: 'Customer' },
      { value: '5', viewValue: 'Material' },
      { value: '6', viewValue: 'Vendor' }
    ];

  constructor(private commonService: CommonService,
    private formBuilder: FormBuilder,
    private addOrEditService: AddOrEditService,
    public dialogRef: MatDialogRef<VoucherTypesComponent>,
    private spinner: NgxSpinnerService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      voucherTypeId: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      voucherTypeName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      voucherClass: [null],
      printText: [null],
      accountType: [null]
    });

    this.formData = { ...data };
    if (!this.commonService.checkNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      this.modelFormData.controls['voucherTypeId'].disable();
    }
  }

  ngOnInit() {
    this.getVoucherClassList();
  }

  getVoucherClassList() {
    const getVoucherClassList = String.Join('/', this.apiConfigService.getvocherclassList);
    this.apiService.apiGetRequest(getVoucherClassList)
      .subscribe(
        response => {
          const res = response;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.voucherClass = res.response['vcList'];
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
    this.modelFormData.controls['voucherTypeId'].enable();
    this.formData.item = this.modelFormData.value;
    this.addOrEditService[this.formData.action](this.formData, (res) => {
      this.dialogRef.close(this.formData);
    });
    if (this.formData.action == 'Edit') {
      this.modelFormData.controls['voucherTypeId'].disable();
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}