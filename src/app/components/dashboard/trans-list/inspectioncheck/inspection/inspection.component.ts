import { Component, Inject, Optional, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { String } from 'typescript-string-operations';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { TableComponent } from 'src/app/reuse-components';
import { CommonService } from 'src/app/services/common.service';
import { ApiConfigService } from 'src/app/services/api-config.service';
import { ApiService } from 'src/app/services/api.service';
import { AlertService } from 'src/app/services/alert.service';
import { SnackBar, StatusCodes } from 'src/app/enums/common/common';
import { Static } from 'src/app/enums/common/static';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.scss']
})
export class InspectionComponent {

  @ViewChild(TableComponent, { static: false }) tableComponent: TableComponent;


  formData: FormGroup;

  tableData = [];

  constructor(public commonService: CommonService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    public route: ActivatedRoute,
    public router: Router,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<InspectionComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.formData = this.formBuilder.group({
      parameter: [''],
      uom: [''],
      spec: [''],
      minValue: [''],
      maxValue: [''],
      instrument: [''],
      id: [0],
      result: [''],
      action: 'edit',
      tags: this.formBuilder.array([]),
      index: 0
    });
  }


  model() {
    return this.formBuilder.group({
      tagName: [''],
      tagAmount: [''],
      trackingId: this.generateUniqueId(),
    });
  }

  generateUniqueId() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  trackByFn(index: number, item: any) {
    return item.trackingId;
  }


  get formControls() { return this.formData.controls; }

  ngOnInit() {
    this.getCommitmentList();
  }

  resultChange() {
    if (!((+(this.formData.value.result) > +(this.formData.value.minValue)) && (+(this.formData.value.result) < +(this.formData.value.maxValue)))) {
      this.formData.patchValue({
        result: ''
      })
      this.alertService.openSnackBar('Result Should be in between min and max value', Static.Close, SnackBar.error);
    }
  }

  getCommitmentList() {
    this.tableData = [];
    if (this.tableComponent) {
      this.tableComponent.defaultValues();
    }
    const url = String.Join('/', this.apiConfigService.getSaleOrderDetailbymaterialcode, this.data.materialcode);
    this.apiService.apiGetRequest(url)
      .subscribe(
        response => {
          this.spinner.hide();
          const res = response;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              let arr = [];
              res.response.QCConfigDetail.forEach((s: any, index: number) => {
                arr.push({
                  parameter: s.parameter,
                  uom: s.uom,
                  spec: s.spec,
                  minValue: s.minValue,
                  maxValue: s.maxValue,
                  instrument: s.instrument,
                  action: 'edit',
                  result: s.result,
                  index: index + 1
                })
              })
              this.tableData = arr;
            }
          }
        });
  }

  saveForm() {
    if (this.formData.invalid) {
      return;
    }
    this.formData.patchValue({
      highlight: true
    });
    let data: any = this.tableData;
    this.tableData = null;
    this.tableComponent.defaultValues();
    const obj = data.find((d: any) => d.parameter == this.formData.value.parameter)
    if (this.formData.value.index == 0 && !obj) {
      this.formData.patchValue({
        index: data ? (data.length + 1) : 1
      });
      data = [this.formData.value, ...data];
    } else {
      if (this.formData.value.index == 0) {
        // data.forEach((res: any) => { if (res.parameter == this.formData.value.parameter) { (res.qty = res.qty + this.formData.value.qty) } });
      } else {
        data = data.map((res: any) => res = res.index == this.formData.value.index ? this.formData.value : res);
      }
    }
    setTimeout(() => {
      this.tableData = data;
    });
    this.resetForm();
  }

  resetForm() {
    this.formData.reset();
    this.formData.patchValue({
      index: 0,
      action: 'edit',
      id: 0
    });
  }


  editOrDeleteEvent(value) {
    if (value.action === 'Delete') {
    } else {
      this.formData.patchValue(value.item);
      let items: any = this.formData.get('tags') as FormArray;
      items.clear();
      this.data.tableData.forEach((t: any) => {
        const obj = this.model();
        obj.patchValue({
          tagName: t.productionTag
        })
        items.push(obj);
      })
    }
  }

  back() {
    this.dialogRef.close();
  }

  save() {
    if (this.tableData.length == 0) {
      return;
    }
    this.registerQCResults();
  }

  registerQCResults() {
    debugger
    const addsq = String.Join('/', this.apiConfigService.registerQCResults);
    this.data.tableData.forEach((d: any) => {
      const arr = [];
      this.tableData.forEach((t: any) => {
        let result: any;
        if (t && t.tags && t.tags.length) {
          const obj = t.tags.find((t: any) => t.tagName == d.productionTag);
          result = obj ? obj.tagAmount : ''
        }
        t.result = result;
        arr.push(t);
      });
      d.inspectionCheck = arr;
    });
    const requestObj = { qtyDtl: this.data.tableData };

    this.apiService.apiPostRequest(addsq, requestObj).subscribe(
      response => {
        this.spinner.hide();
        const res = response;
        if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!this.commonService.checkNullOrUndefined(res.response)) {
            this.alertService.openSnackBar('Quotation Supplier created Successfully..', Static.Close, SnackBar.success);
            this.dialogRef.close();
          }
        }
      });
  }

  reset() {
    this.tableData = [];
    this.formData.reset();
  }

}
