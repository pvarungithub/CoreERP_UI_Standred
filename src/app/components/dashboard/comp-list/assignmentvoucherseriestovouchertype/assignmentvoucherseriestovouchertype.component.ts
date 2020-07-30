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
@Component({
  selector: 'assignmentvoucherseriestovouchertype',
  templateUrl: './assignmentvoucherseriestovouchertype.component.html',
  styleUrls: ['./assignmentvoucherseriestovouchertype.component.scss']
})

export class AssignmentVoucherSeriestoVoucherTypesComponent implements OnInit {

  modelFormData: FormGroup;
  isSubmitted = false;
  formData: any;
  voucherClass: any;
    vtypeList: any;
    vcList: any;

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AssignmentVoucherSeriestoVoucherTypesComponent>,
    private spinner: NgxSpinnerService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    private commonService: CommonService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      id: ['0'],
      code: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      voucherType: [null] ,
      voucherClass: [null] ,
       ext:[null] 
    });


    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      this.modelFormData.controls['code'].disable();
    }

  }

  ngOnInit() {
    this.getvochertypesList();
    this.getvoucherseriesList();
  }

  getvochertypesList() {
    const getvouchertypeList = String.Join('/', this.apiConfigService.getVoucherTypeList);
    this.apiService.apiGetRequest(getvouchertypeList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.vtypeList = res.response['GLSubCodeList'];
              //console.log(this.voucherClass);
            }
          }
          this.spinner.hide();
        });
  }

  getvoucherseriesList() {
    const getvclassList = String.Join('/', this.apiConfigService.getvocherseriesList);
    this.apiService.apiGetRequest(getvclassList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.vcList = res.response['vseriesList'];
              //console.log(this.voucherClass);
            }
          }
          this.spinner.hide();
        });
  }


  get formControls() { return this.modelFormData.controls; }


  save() {
    debugger;
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
