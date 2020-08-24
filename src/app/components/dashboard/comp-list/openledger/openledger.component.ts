import { Component, Inject, Optional, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNullOrUndefined } from 'util';
import { ApiService } from '../../../../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConfigService } from '../../../../services/api-config.service';
import { StatusCodes } from 'src/app/enums/common/common';
import { String } from 'typescript-string-operations';
import { AddOrEditService } from '../add-or-edit.service';

@Component({
  selector: 'app-openledger',
  templateUrl: './openledger.component.html',
  styleUrls: ['./openledger.component.scss']
})
export class OpenLedgerComponent implements OnInit {
  modelFormData: FormGroup;
  formData: any;
  ledgerList: any;

  constructor(
    private apiService: ApiService,
    private addOrEditService: AddOrEditService,
    private apiConfigService: ApiConfigService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<OpenLedgerComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      ledgerKey: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      id: ['0'],
      financialYearEndTo: [null],
      accountingYear: [null],
      financialYearStartFrom: [null]
    });

    this.formData = { ...data };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
    }

  }

  ngOnInit() {
    this.getLedgerList();
  }

  get formControls() { return this.modelFormData.controls; }

  save() {
    if (this.modelFormData.invalid) {
      return;
    }
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

  getLedgerList() {
    const getLedgerList = String.Join('/', this.apiConfigService.getLedgerList);
    this.apiService.apiGetRequest(getLedgerList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              console.log(res);
              this.ledgerList = res.response['ledgerList'];
            }
          }
          this.spinner.hide();
        });
  }
}