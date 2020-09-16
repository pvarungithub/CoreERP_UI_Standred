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
  selector: 'app-purchaseordertype',
  templateUrl: './purchaseordertype.component.html',
  styleUrls: ['./purchaseordertype.component.scss']
})

export class PurchaseordertypeComponent implements OnInit {

  modelFormData: FormGroup;
  formData: any;
  glList: any;
  constructor(
    private addOrEditService: AddOrEditService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PurchaseordertypeComponent>,
    private spinner: NgxSpinnerService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      purchaseType: [null],
      description: [null]
     
    });


    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      this.modelFormData.controls['purchaseType'].disable();
    }

  }

  ngOnInit() {
  }
  
  get formControls() { return this.modelFormData.controls; }

  save() {
    debugger;
    if (this.modelFormData.invalid) {
      return;
    }
    this.modelFormData.controls['purchaseType'].enable();
    this.formData.item = this.modelFormData.value;
    this.addOrEditService[this.formData.action](this.formData, (res) => {
      this.dialogRef.close(this.formData);
    });
    if (this.formData.action == 'Edit') {
      this.modelFormData.controls['purchaseType'].disable();
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}
