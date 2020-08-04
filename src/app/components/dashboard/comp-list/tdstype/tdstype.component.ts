import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tdstype',
  templateUrl: './tdstype.component.html',
  styleUrls: ['./tdstype.component.scss']
})

export class TDSComponent implements OnInit {

  modelFormData: FormGroup;
  formData: any;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<TDSComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      tdsCode: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      desctiption: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    });

    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      this.modelFormData.controls['tdsCode'].disable();
    }

  }

  ngOnInit() {
  }

  get formControls() { return this.modelFormData.controls; }

  save() {
    if (this.modelFormData.invalid) {
      return;
    }
    this.modelFormData.controls['tdsCode'].enable();
    this.formData.item = this.modelFormData.value;
    this.dialogRef.close(this.formData);
  }

  cancel() {
    this.dialogRef.close();
  }

}
