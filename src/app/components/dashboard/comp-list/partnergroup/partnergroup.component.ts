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

interface Status {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-partnergroup',
  templateUrl: './partnergroup.component.html',
  styleUrls: ['./partnergroup.component.scss']
})

export class BusienessPartnerGroupsComponent implements OnInit {

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
  ptypeList: any;
  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<BusienessPartnerGroupsComponent>,
    private spinner: NgxSpinnerService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    private commonService: CommonService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      bpgroup: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      description: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
       bptype: [null]
    });


    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      this.modelFormData.controls['bpgroup'].disable();
    }

  }

  ngOnInit() {
    this.getPartnerTypeList();
  }
  getPartnerTypeList() {
    const getPTList = String.Join('/', this.apiConfigService.getPartnerTypeList);
    this.apiService.apiGetRequest(getPTList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.ptypeList = res.response['ptypeList'];
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
    this.modelFormData.controls['bpgroup'].enable();
    this.formData.item = this.modelFormData.value;
    this.dialogRef.close(this.formData);
  }

  cancel() {
    this.dialogRef.close();
  }

}
