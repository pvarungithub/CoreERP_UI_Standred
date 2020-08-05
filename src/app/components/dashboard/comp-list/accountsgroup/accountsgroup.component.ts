import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface groupType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-accountsgroup',
  templateUrl: './accountsgroup.component.html',
  styleUrls: ['./accountsgroup.component.scss']
})

export class AccountsGroupComponent  implements OnInit {
  modelFormData: FormGroup;
  formData: any;

  groupTypes: groupType[] =
  [
    { value: '1', viewValue: 'Balance Sheet' },
    { value: '2', viewValue: 'Profit & Loss Account' },
    { value: '3', viewValue: 'PL Appropriation accounts' },
    { value: '4', viewValue: 'Costing Internal purpose' },
  ];
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AccountsGroupComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any ) {
      this.modelFormData  =  this.formBuilder.group({
        groupCode: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        groupName: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
        numberRangeFrom: [null],
        numberRangeTo: [null],
        groupType: [null],
        active: [null]
      });
      this.formData = {...data};
      if (!isNullOrUndefined(this.formData.item)) {
        this.modelFormData.patchValue(this.formData.item);
        this.modelFormData.controls['groupCode'].disable();
      }
  }

  ngOnInit() {

  }

  get formControls() { return this.modelFormData.controls; }

  save() {
    if (this.modelFormData.invalid) {
      return;
    }
    this.modelFormData.controls['groupCode'].enable();
    this.formData.item = this.modelFormData.value;
    this.dialogRef.close(this.formData);
  }

  cancel() {
    this.dialogRef.close();
  }

}
