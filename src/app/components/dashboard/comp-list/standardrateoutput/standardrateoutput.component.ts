import { Component, Inject, Optional, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../../../../services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackBar, StatusCodes } from '../../../../enums/common/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConfigService } from '../../../../services/api-config.service';
import { ApiService } from '../../../../services/api.service';
import { String } from 'typescript-string-operations';
import { AddOrEditService } from '../add-or-edit.service';
import { TableComponent } from 'src/app/reuse-components';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { Static } from 'src/app/enums/common/static';

interface Type {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-standardrateoutput',
  templateUrl: './standardrateoutput.component.html',
  styleUrls: ['./standardrateoutput.component.scss']
})

export class StandardRateComponent implements OnInit {

  @ViewChild(TableComponent, { static: false }) tableComponent: TableComponent;


  formData: FormGroup;
  formData1: FormGroup;

  tableData = [];
  instruments = [];
  materialList = [];
  UomList = [];

  Type: Type[] =
    [
      { value: 'Balancing', viewValue: 'Balancing' },
      { value: 'Inspection', viewValue: 'Inspection' },
    ];

  routeEdit = '';

  constructor(private commonService: CommonService,
    private addOrEditService: AddOrEditService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    public route: ActivatedRoute,
    public router: Router,
    private alertService: AlertService,

  ) {
    if (!this.commonService.checkNullOrUndefined(this.route.snapshot.params.value)) {
      this.routeEdit = this.route.snapshot.params.value;
    }

    this.formData = this.formBuilder.group({
      code: [null, Validators.required],
      type: [null, Validators.required],
      materialCode: [null, Validators.required],
    });

    this.formData1 = this.formBuilder.group({
      parameter: [''],
      uom: [''],
      spec: [''],
      minValue: [''],
      maxValue: [''],
      instrument: [''],
      id: [0],
      action: 'edit',
      index: 0
    });

  }

  get formControls() { return this.formData.controls; }

  ngOnInit() {
    this.getmaterialData();
    this.getuomTypeData();
    this.getCommitmentList('instruments');
  }

  getuomTypeData() {
    const getuomTypeUrl = String.Join('/', this.apiConfigService.getuomList);
    this.apiService.apiGetRequest(getuomTypeUrl)
      .subscribe(
        response => {
          const res = response;
          console.log(res);
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.UomList = res.response['UOMList'];
            }
          }
          this.spinner.hide();
        });
  }

  getmaterialData() {
    const getmaterialUrl = String.Join('/', this.apiConfigService.getMaterialList);
    this.apiService.apiGetRequest(getmaterialUrl)
      .subscribe(
        response => {
          this.spinner.hide();
          const res = response;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.materialList = res.response['materialList'];
            }
          }
        });
  }

  getCommitmentList(flag) {
    debugger
    this.tableData = [];
    if (this.tableComponent) {
      this.tableComponent.defaultValues();
    }
    const bomUrl = String.Join('/', this.apiConfigService.getCommitmentList, flag);
    this.apiService.apiGetRequest(bomUrl)
      .subscribe(
        response => {
          this.spinner.hide();
          const res = response;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              if (flag == 'instruments') {
                this.instruments = res.response.citemList;
              } else {
                res.response['citemList'].forEach((s: any, index: number) => {
                  s.parameter = s.description;
                  s.uom = s.uom;
                  s.spec = s.spec;
                  s.minValue = s.minValue;
                  s.maxValue = s.maxValue;
                  s.instrument = s.instrument;
                  s.action = 'edit';
                  s.index = index + 1;
                })
                this.tableData = res.response.citemList;
              }
            }
          }
        });
  }

  saveForm() {
    debugger
    if (this.formData1.invalid) {
      return;
    }
    this.formData1.patchValue({
      highlight: true
    });
    let data: any = this.tableData;
    this.tableData = null;
    this.tableComponent.defaultValues();
    const obj = data.find((d: any) => d.materialCode == this.formData1.value.materialCode)
    if (this.formData1.value.index == 0 && !obj) {
      this.formData1.patchValue({
        index: data ? (data.length + 1) : 1
      });
      data = [this.formData1.value, ...data];
    } else {
      if (this.formData1.value.index == 0) {
        data.forEach((res: any) => { if (res.materialCode == this.formData1.value.materialCode) { (res.qty = res.qty + this.formData1.value.qty) } });
      } else {
        data = data.map((res: any) => res = res.index == this.formData1.value.index ? this.formData1.value : res);
      }
    }
    setTimeout(() => {
      this.tableData = data;
    });
    this.resetForm();
  }

  resetForm() {
    this.formData1.reset();
    this.formData1.patchValue({
      index: 0,
      action: 'edit',
      id: 0
    });
  }


  editOrDeleteEvent(value) {
    if (value.action === 'Delete') {
    } else {
      this.formData1.patchValue(value.item);
    }
  }

  back() {
    this.router.navigate(['dashboard/transaction/saleorder'])
  }

  save() {
    if (this.tableData.length == 0 || this.formData.invalid) {
      return;
    }
    this.addSaleOrder();
  }

  addSaleOrder() {
    const addsq = String.Join('/', this.apiConfigService.registerStandardRate);
    const requestObj = { qcdHdr: this.formData.value, qcdDtl: this.tableData };
    this.apiService.apiPostRequest(addsq, requestObj).subscribe(
      response => {
        this.spinner.hide();
        const res = response;
        if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!this.commonService.checkNullOrUndefined(res.response)) {
            this.alertService.openSnackBar('Quotation Supplier created Successfully..', Static.Close, SnackBar.success);
            this.router.navigate(['/dashboard/transaction/standardrateoutput'])
          }
        }
      });
  }

  reset() {
    this.tableData = [];
    this.formData.reset();
  }

}
