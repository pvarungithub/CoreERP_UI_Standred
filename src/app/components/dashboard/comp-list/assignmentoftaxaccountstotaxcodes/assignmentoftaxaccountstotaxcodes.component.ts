import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-assignmentoftaxaccountstotaxcodes',
  templateUrl: './assignmentoftaxaccountstotaxcodes.component.html',
  styleUrls: ['./assignmentoftaxaccountstotaxcodes.component.scss']
})
export class AssignmentoftaxaccountstotaxcodesComponent implements OnInit {

  modelFormData: FormGroup;
  isSubmitted = false;
  formData: any;
  voucherClass: any;
  compList: any;
  branchList: any;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AssignmentoftaxaccountstotaxcodesComponent>,
    private spinner: NgxSpinnerService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      code: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      description: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      sgstgl:[null],
      cgstgl:[null],
      igstgl:[null],
      ugstgl:[null]
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
    //debugger;
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
