import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface LedgerType {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss']
})

export class LedgerComponent implements OnInit {

  modelFormData: FormGroup;
  formData: any;

  ledgertype: LedgerType[] =
    [
      { value: '1', viewValue: 'Day ledger' },
      { value: '2', viewValue: 'Weekly' },
      { value: '3', viewValue: 'Fortnight' },
      { value: '4', viewValue: 'Monthly' },
      { value: '5', viewValue: 'quarterly' }
    ];
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LedgerComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      code: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      description: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      ledgerType: [null],
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