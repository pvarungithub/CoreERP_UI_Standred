import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../../../../services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddOrEditService } from '../add-or-edit.service';

interface Nature {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-taxintegration',
  templateUrl: './taxintegration.component.html',
  styleUrls: ['./taxintegration.component.scss']
})

export class TaxIntegrationComponent  implements OnInit {

  modelFormData: FormGroup;
  isSubmitted  =  false;
  formData: any;
  
  TaxTypess: Nature[] =
  [
    { value: '1', viewValue: 'Input' },
    { value: '2', viewValue: 'Output' },    
  ];

  constructor(private commonService: CommonService,
    private formBuilder: FormBuilder,
    private addOrEditService: AddOrEditService,
    public dialogRef: MatDialogRef<TaxIntegrationComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any ) {

      this.modelFormData  =  this.formBuilder.group({
        taxKey: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
        description: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
        nature: [null]
      });

      this.formData = {...data};
      if (!this.commonService.checkNullOrUndefined(this.formData.item)) {
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
    this.addOrEditService[this.formData.action](this.formData, (res) => {
      this.dialogRef.close(this.formData);
    });
    if (this.formData.action == 'Edit') {
      this.modelFormData.controls['taxKey'].disable();
    }
  }
  cancel() {
    this.dialogRef.close();
  }
}
