import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-taxintegration',
  templateUrl: './taxintegration.component.html',
  styleUrls: ['./taxintegration.component.scss']
})

export class TaxIntegrationComponent  implements OnInit {

  modelFormData: FormGroup;
  isSubmitted  =  false;
  formData: any;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<TaxIntegrationComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any ) {

      this.modelFormData  =  this.formBuilder.group({
        taxKey: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
        description: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      });

      this.formData = {...data};
      if (!isNullOrUndefined(this.formData.item)) {
        this.modelFormData.patchValue(this.formData.item);
        this.modelFormData.controls['taxKey'].disable();
      }
  }

  ngOnInit()
  {
  }
 
  get formControls() { return this.modelFormData.controls; }

  save() {
    if (this.modelFormData.invalid) {
      return;
    }
    this.modelFormData.controls['taxKey'].enable();
    this.formData.item = this.modelFormData.value;
    this.dialogRef.close(this.formData);
  }
  cancel() {
    this.dialogRef.close();
  }
}
