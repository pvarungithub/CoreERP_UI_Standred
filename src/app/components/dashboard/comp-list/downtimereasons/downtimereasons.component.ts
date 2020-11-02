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


interface Type{
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-downtimereasons',
  templateUrl: './downtimereasons.component.html',
  styleUrls: ['./downtimereasons.component.scss']
})

export class DownTimeReasonComponent implements OnInit {

  modelFormData: FormGroup;
  formData: any;
  
  Type: Type[] =
    [
      { value: 'Break down', viewValue: 'Break down' },
      { value: 'Absenteeism', viewValue: 'Absenteeism' },
      { value: 'Lack of material', viewValue: 'Lack of material' },
      { value: 'Other', viewValue: 'Other' }
    ];
  constructor(private commonService: CommonService,
    private addOrEditService: AddOrEditService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DownTimeReasonComponent>,
    private spinner: NgxSpinnerService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      reasonCode: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      description: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      type: [null],
   });


    this.formData = { ...data };
    if (!this.commonService.checkNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      this.modelFormData.controls['reasonCode'].disable();
    }

  }

  ngOnInit() {
  }
  
 
  get formControls() { return this.modelFormData.controls; }

  save() {
    if (this.modelFormData.invalid) {
      return;
    }
    this.modelFormData.controls['reasonCode'].enable();
    this.formData.item = this.modelFormData.value;
    this.addOrEditService[this.formData.action](this.formData, (res) => {
      this.dialogRef.close(this.formData);
    });
    if (this.formData.action == 'Edit') {
      this.modelFormData.controls['reasonCode'].disable();
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}
