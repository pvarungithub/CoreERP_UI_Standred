import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  formData: any;
  voucherClass: any;

  voucherNatures: voucherNature[] =
  [
    { value: '1', viewValue: 'Invoice' },
    { value: '2', viewValue: 'Memo' },
    { value: '3', viewValue: 'General' },
    { value: '4', viewValue: 'Payments' },
    { value: '5', viewValue: 'Receipts' },
    { value: '6', viewValue: 'General Memo' }
  ];
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<VoucherClassComponent>,
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