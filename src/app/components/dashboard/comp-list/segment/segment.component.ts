import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddOrEditService } from '../add-or-edit.service';

interface Active {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.scss']
})
export class SegmentComponent implements OnInit {

  modelFormData: FormGroup;
  isSubmitted  =  false;
  formData: any;
  active: Active[] =
    [
      { value: 'Y', viewValue: 'Y' },
      { value: 'N', viewValue: 'N' }
    ];

  constructor(
    private formBuilder: FormBuilder,
    private addOrEditService: AddOrEditService,
    public dialogRef: MatDialogRef<SegmentComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any ) {

      this.modelFormData  =  this.formBuilder.group({
       
        id: [null, [Validators.required, Validators.minLength(1)]],
        name: [null, [Validators.required, Validators.minLength(0), Validators.maxLength(40)]],
        active: ['Y']
      });

      this.formData = {...data};
      if (!isNullOrUndefined(this.formData.item)) {
        this.modelFormData.patchValue(this.formData.item);
       this.modelFormData.controls['id'].disable();
      }

  }

  ngOnInit() {
  }

  get formControls() { return this.modelFormData.controls; }

  save() {
    if (this.modelFormData.invalid) {
      return;
    }
    this.modelFormData.controls['id'].enable();
    this.formData.item = this.modelFormData.value;
    this.addOrEditService[this.formData.action](this.formData, (res) => {
      this.dialogRef.close(this.formData);
    });
    if (this.formData.action == 'Edit') {
      this.modelFormData.controls['id'].disable();
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}
