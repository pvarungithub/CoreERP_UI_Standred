import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiConfigService } from '../../../../services/api-config.service';
import { String } from 'typescript-string-operations';
import { ApiService } from '../../../../services/api.service';
import { StatusCodes, SnackBar } from '../../../../enums/common/common';
import { CommonService } from '../../../../services/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { Static } from '../../../../enums/common/static';
import { AlertService } from '../../../../services/alert.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../../../directives/format-datepicker';

@Component({
  selector: 'app-quotationsupplier',
  templateUrl: './quotationsupplier.component.html',
  styleUrls: ['./quotationsupplier.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class QuotationSupplierComponent implements OnInit {

  // form control
  formData: FormGroup;
  sendDynTableData: any;

  // header props
  companyList = [];
  plantList = [];
  deptList = [];
  branchList = [];
  costcenterList = [];
  profitCenterList = [];
  projectNameList = [];
  wbsList = [];

  tableData = [];
  dynTableProps: any;
  routeEdit = '';
  costunitList: any;
  materialList: any;
  UomList: any;
  ptypeList: any;

  constructor(
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    public route: ActivatedRoute,
    private router: Router
  ) {
    if (!this.commonService.checkNullOrUndefined(this.route.snapshot.params.value)) {
      this.routeEdit = this.route.snapshot.params.value;
    }
  }

  ngOnInit() {
    this.formDataGroup();
    this.getCompanyList();
  }

  tablePropsFunc() {
    return {
      tableData: {
        itemCode: {
          value: null, type: 'dropdown', list: this.materialList, id: 'id', text: 'text', displayMul: true, width: 100
        },
        description: {
          value: null, type: 'text', width: 100, maxLength: 50
        },
        qty: {
          value: null, type: 'number', width: 100, maxLength: 50
        },
        price: {
          value: null, type: 'number', width: 100, maxLength: 50
        },

        unit: {
          value: null, type: 'dropdown', list: this.UomList, id: 'id', text: 'text', displayMul: true, width: 100
        },
        discount: {
          value: null, type: 'number', width: 100, maxLength: 50
        },
        discountAmount: {
          value: null, type: 'number', width: 100, maxLength: 50
        },
        tax: {
          value: null, type: 'number', width: 100, maxLength: 50
        },
        delete: {
          type: 'delete', width: 10
        }
      },

      formControl: {
        tax: [null, [Validators.required]],
      }
    };
  }

  formDataGroup() {
    this.formData = this.formBuilder.group({
      company: [null, [Validators.required]],
      plant: [null],
      branch: [null],
      profitCenter: [null],
      quotationNumber: [null],
      quotationDate: [null],
      supplierQuoteDate: [null],
      supplier: [null],
      deliveryPeriod: [null],
      creditDays: [null],
      deliveryMethod: [null],
      advance: [null],
      transportMethod: [null]

    });
  }

  getCompanyList() {
    const companyUrl = String.Join('/', this.apiConfigService.getCompanyList);
    this.apiService.apiGetRequest(companyUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.companyList = res.response['companiesList'];
            }
          }
          this.getmaterialData();
        });
  }
  getmaterialData() {
    const getmaterialUrl = String.Join('/', this.apiConfigService.getMaterialList);
    this.apiService.apiGetRequest(getmaterialUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.materialList = res.response['materialList'];
            }
          }
          this.getptypeList();
        });
  }

  getptypeList() {
    const getcurrencyList = String.Join('/', this.apiConfigService.getPartnerTypeList);
    this.apiService.apiGetRequest(getcurrencyList)
      .subscribe(
        response => {
          const res = response.body;

          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.ptypeList = res.response['ptypeList'];
              this.ptypeList = res.response['ptypeList'].filter(resp => resp.bpcategory == 'Vendor')
            }
          }
          this.getplantList();
        });
  }
  getplantList() {
    const getplantList = String.Join('/', this.apiConfigService.getplantList);
    this.apiService.apiGetRequest(getplantList)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.plantList = res.response['plantList'];
            }
          }
          this.getuomList();
        });
  }


  getuomList() {
    const getsecondelementUrl = String.Join('/', this.apiConfigService.getuomList);
    this.apiService.apiGetRequest(getsecondelementUrl)
      .subscribe(
        response => {
          const res = response.body;

          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.UomList = res.response['UOMList'];
            }
          }
          this.getBranchList();
        });
  }
  getBranchList() {
    const branchUrl = String.Join('/', this.apiConfigService.getBranchList);
    this.apiService.apiGetRequest(branchUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.branchList = res.response['branchsList'];
            }
          }
          this.getProfitcenterData();
        });
  }


  getProfitcenterData() {
    const getpcUrl = String.Join('/', this.apiConfigService.getProfitCenterList);
    this.apiService.apiGetRequest(getpcUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.profitCenterList = res.response['profitCenterList'];
            }
          }

          this.getWbsList();
        });
  }

  getWbsList() {
    const segUrl = String.Join('/', this.apiConfigService.getwbselement);
    this.apiService.apiGetRequest(segUrl)
      .subscribe(
        response => {
          this.spinner.hide();
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.wbsList = res.response['wbsList'];
            }
          }
          this.dynTableProps = this.tablePropsFunc();
          if (this.routeEdit != '') {
            this.getQuotationSuppliersDetails(this.routeEdit);
          }
        });
  }

  getQuotationSuppliersDetails(val) {
    const qsDetUrl = String.Join('/', this.apiConfigService.getsupplierqsDetail, val);
    this.apiService.apiGetRequest(qsDetUrl)
      .subscribe(
        response => {
          this.spinner.hide();
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.formData.setValue(res.response['qsmasters']);
              //console.log(res.response['qsDetail']);
              this.sendDynTableData = { type: 'edit', data: res.response['qsDetail'] };
              this.formData.disable();
            }
          }
        });
  }

  emitColumnChanges(data) {
  this.tableData = data.data;
    // this.calculateAmount(data);
  }

 
  back() {
    this.router.navigate(['dashboard/transaction/supplierquotation'])
  }

  save() {
this.tableData = this.commonService.formatTableData(this.tableData);
    if (this.tableData.length == 0 && this.formData.invalid) {
      return;
    }
    this.savesupplierquotation();
  }

  savesupplierquotation() {
    const addsq = String.Join('/', this.apiConfigService.addsupplierqs);
    const requestObj = { qsHdr: this.formData.value, qsDtl: this.tableData };
    this.apiService.apiPostRequest(addsq, requestObj).subscribe(
      response => {
        const res = response.body;
  this.tableData = [];
        if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!this.commonService.checkNullOrUndefined(res.response)) {
            this.alertService.openSnackBar('Quotation Supplier created Successfully..', Static.Close, SnackBar.success);
          }
          this.reset();
          this.spinner.hide();
        }
      });
  }

  return() {
    const addCashBank = String.Join('/', this.apiConfigService.returnsupplierqs, this.routeEdit);
    this.apiService.apiGetRequest(addCashBank).subscribe(
      response => {
        const res = response.body;
        if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!this.commonService.checkNullOrUndefined(res.response)) {
            this.alertService.openSnackBar(res.response, Static.Close, SnackBar.success);
          }
        }
      });
  }

  reset() {
    this.tableData = [];
    this.formData.reset();
    //this.formData.controls['voucherNumber'].disable();
    this.sendDynTableData = { type: 'reset', data: this.tableData };
  }

}
