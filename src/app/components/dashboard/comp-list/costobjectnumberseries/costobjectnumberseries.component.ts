import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../../../../services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConfigService } from '../../../../services/api-config.service';
import { ApiService } from '../../../../services/api.service';
import { String } from 'typescript-string-operations';
import { AddOrEditService } from '../add-or-edit.service';
import { Static } from '../../../../enums/common/static';
import { AlertService } from '../../../../services/alert.service';
import { StatusCodes, SnackBar } from '../../../../enums/common/common';
@Component({
  selector: 'app-costobjectnumberseries',
  templateUrl: './costobjectnumberseries.component.html',
  styleUrls: ['./costobjectnumberseries.component.scss']
})

export class CostingObjectNumberSeriesComponent implements OnInit {

  modelFormData: FormGroup;
  formData: any;
  glList: any;
  constructor(private commonService: CommonService,
    private addOrEditService: AddOrEditService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CostingObjectNumberSeriesComponent>,
    private spinner: NgxSpinnerService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    private alertService: AlertService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      numberObject: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      fromInterval: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      toInterval: [null],
      nonNumaric: [false],
      prefix: [null],
      presentNumber: [null]

    });


    this.formData = { ...data };
    if (!this.commonService.checkNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      this.modelFormData.patchValue({
        nonNumaric: (+this.formData.item.nonNumaric == 0) ? false : true
      })
      this.modelFormData.controls['numberObject'].disable();
    }

  }

  ngOnInit() {
  }
  onChangeEvent() {
    this.validationcode();
  }
  onChangeEvents() {
    this.validationcode();
  }

  validationcode() {
    let i = 0;
    let j = 0;
    i = parseInt(this.modelFormData.get('fromInterval').value);
    j = parseInt(this.modelFormData.get('toInterval').value);
    if (i <= j) {
    }
    else {
      this.alertService.openSnackBar("To Interval Greatee than to From Interval", Static.Close, SnackBar.error);
    }

  }

  get formControls() { return this.modelFormData.controls; }

  save() {
    if (this.modelFormData.invalid) {
      return;
    }
    this.modelFormData.patchValue({
      nonNumaric: this.modelFormData.get('nonNumaric').value ? 1 : 0
    })
    this.modelFormData.controls['numberObject'].enable();
    this.formData.item = this.modelFormData.value;
    this.addOrEditService[this.formData.action](this.formData, (res) => {
      this.dialogRef.close(this.formData);
    });
    if (this.formData.action == 'Edit') {
      this.modelFormData.controls['numberObject'].disable();
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}
