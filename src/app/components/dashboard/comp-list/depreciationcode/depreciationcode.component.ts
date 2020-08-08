import { Component, Inject, Optional, OnInit } from '@angular/core';
import { String } from 'typescript-string-operations';
import { ApiService } from '../../../../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConfigService } from '../../../../services/api-config.service';
import { StatusCodes } from '../../../../enums/common/common';

interface Methodofdepreciation {
  value: string;
  viewValue: string;
}
interface Upto {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-depreciationcode',
  templateUrl: './depreciationcode.component.html',
  styleUrls: ['./depreciationcode.component.scss']
})
export class DepreciationcodeComponent implements OnInit {

  modelFormData: FormGroup;
  isSubmitted  =  false;
  formData: any;
 
  Methodofdepreciation: Methodofdepreciation[] =
  [
    { value: 'Straight line', viewValue: 'Straight line' },
    { value: 'Written down value', viewValue: 'Written down value' },
    { value: 'Useful life ', viewValue: 'Useful life' }   
  ];
values: Upto[] =
  [
    { value: '1', viewValue: 'Upto-1' },
    { value: '3', viewValue: 'Upto-3' },
    { value: '4', viewValue: 'Upto-4' } ,  
    { value: '5', viewValue: 'Upto-5' } ,  
    { value: '6', viewValue: 'Upto-6' } 
  ];
  constructor(
    private apiService: ApiService,
    private apiConfigService: ApiConfigService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DepreciationcodeComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any ) {

    this.modelFormData = this.formBuilder.group({
      code: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      description: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      depreciationMethod: [null],
      purchaseWithin: [null],
      ratePercentage: [null],
      maxDepreciationAmount: [null],
      uptoDate :[null],
      depreciationDuringLife:[null],
      maxDepreciationRate:[null],
      upto:   [null],     
      noofYears:[null],
      noofMonths  :[null],
      rate:[null]
      });

      this.formData = {...data};
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