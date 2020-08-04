import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hsnsac',
  templateUrl: './hsnsac.component.html',
  styleUrls: ['./hsnsac.component.scss']
})

export class HsnSacComponent implements OnInit {
  modelFormData: FormGroup;
  formData: any;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<HsnSacComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      code: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(5)]],
      description: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(50)]],
    });

    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
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
    this.dialogRef.close(this.formData);
  }

  cancel() {
    this.dialogRef.close();
  }
}