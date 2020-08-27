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
  selector: 'assignmentofvoucherseriestovouchertype',
  templateUrl: './assignmentvoucherseriestovouchertype.component.html',
  styleUrls: ['./assignmentvoucherseriestovouchertype.component.scss']
})

export class AssignmentVoucherSeriestoVoucherTypesComponent implements OnInit {
  modelFormData: FormGroup;
  formData: any;
  vtypeList: any;
  vcList: any;

  constructor(
    private formBuilder: FormBuilder,
    private addOrEditService: AddOrEditService,
    public dialogRef: MatDialogRef<AssignmentVoucherSeriestoVoucherTypesComponent>,
    private spinner: NgxSpinnerService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      code: [0],
      voucherType: [null],
      voucherSeries: [null],
      ext: null
    });

    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      // this.modelFormData.controls['code'].disable();
    }
  }

  ngOnInit() {
    this.getvochertypesList();
    this.getvoucherseriesList();
  }

  getvochertypesList() {
    const getvouchertypeList = String.Join('/', this.apiConfigService.getVoucherTypesList);
    this.apiService.apiGetRequest(getvouchertypeList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.vtypeList = res.response['vouchertypeList'];
            }
          }
          this.spinner.hide();
        });
  }

  getvoucherseriesList() {
    const getvclassList = String.Join('/', this.apiConfigService.getvochersseriesList);
    this.apiService.apiGetRequest(getvclassList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.vcList = res.response['vseriesList'];
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