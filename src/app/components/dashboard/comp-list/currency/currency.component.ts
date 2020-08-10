import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddOrEditService } from '../add-or-edit.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

  modelFormData: FormGroup;
  isSubmitted = false;
  formData: any;
  companyList: any;

  constructor(
    private formBuilder: FormBuilder,
    private addOrEditService: AddOrEditService,
    public dialogRef: MatDialogRef<CurrencyComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({

      currencySymbol: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      currencyName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      noOfDecimalPlaces:[null],
    });

    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      this.modelFormData.controls['currencySymbol'].disable();
    }

  }

  ngOnInit() {
  }

  get formControls() { return this.modelFormData.controls; }


  save() {
    if (this.modelFormData.invalid) {
      return;
    }
    this.modelFormData.controls['currencySymbol'].enable();
    this.formData.item = this.modelFormData.value;
    this.addOrEditService[this.formData.action](this.formData, (res) => {
      this.dialogRef.close(this.formData);
    });
    if (this.formData.action == 'Edit') {
      this.modelFormData.controls['currencySymbol'].disable();
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}

