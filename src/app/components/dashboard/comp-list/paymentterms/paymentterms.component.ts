import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddOrEditService } from '../add-or-edit.service';

interface Term {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-paymentterms',
  templateUrl: './paymentterms.component.html',
  styleUrls: ['./paymentterms.component.scss']
})

export class PaymentTermsComponent implements OnInit {

  modelFormData: FormGroup;
  isSubmitted = false;
  formData: any;
  taxcodeList: any;
  taxaccList: any;
  tdsList:any;
  incmList:any;
  
  pterm: Term[] =
  [
    { value: '1Day', viewValue: '1St Day' },
    { value: '2Day', viewValue: '2nd Day' },
    { value: '3ay', viewValue: '3rd Day' },
    { value: '4Day', viewValue: '4th Day' },
    { value: '5Day', viewValue: '5th Day' },
    { value: '6Day', viewValue: '6th Day' },
    { value: '7Day', viewValue: '7th Day' }
  ];
  companyList: any;
  constructor(
    private addOrEditService: AddOrEditService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PaymentTermsComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      code: [null],
      days: [null],
      discount: [null],
      narration: [null]
      
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
    
this.addOrEditService[this.formData.action](this.formData, (res) => {
  this.dialogRef.close(this.formData);
});
if (this.formData.action == 'Edit') {
  this.modelFormData.controls['code'].disable();
}
  }

  cancel() {
    this.dialogRef.close();
  }

}
