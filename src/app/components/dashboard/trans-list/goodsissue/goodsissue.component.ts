import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiConfigService } from '../../../../services/api-config.service';
import { String } from 'typescript-string-operations';
import { ApiService } from '../../../../services/api.service';
import { StatusCodes, SnackBar } from '../../../../enums/common/common';
import { CommonService } from '../../../../services/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddOrEditService } from '../../comp-list/add-or-edit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Static } from '../../../../enums/common/static';
import { AlertService } from '../../../../services/alert.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../../../directives/format-datepicker';
@Component({
  selector: 'app-goodsissue',
  templateUrl: './goodsissue.component.html',
  styleUrls: ['./goodsissue.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})

export class GoodsissueComponent implements OnInit {

  formData: FormGroup;
  routeEdit = '';
  hsnsacList = [];
  debitValue = 0;
  creditValue = 0;
  totalTaxValue = 0;
  tableData = [];
  dynTableProps: any;
  btList = [];
  companyList = [];
  branchList = [];
  voucherClassList = [];
  voucherTypeList = [];
  glAccountList = [];
  profitCenterList = [];
  segmentList = [];
  costCenterList = [];
  taxCodeList = [];
  functionaldeptList = [];
    employeesList: any;
    fdeptList: any;
    plantList: any;
    movementList: any;
    wbsElementList: any;
    ordertypeList: any;
    locationList: any;

  constructor(private commonService: CommonService,
    private formBuilder: FormBuilder,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    private addOrEditService: AddOrEditService,
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
    this.getfunctionaldeptList();
   /// this.formData.controls['requisitionNumber'].disable();
  }

  formDataGroup() {
    this.formData = this.formBuilder.group({
      company: [null, [Validators.required]],
      plant: [null, [Validators.required]],
      goodsIssueId: ['0'],
      storesPerson: [null],
      department: [null],
      requisitionNumber: [null],
      movementType: [null],
      status: [null],
    });
  }

  tablePropsFunc() {
    return {
      tableData: {
        id: {
          value: 0, type: 'autoInc', width: 10, disabled: true
        },
        qty: {
          value: null, type: 'text', width: 75, maxLength: 15
        },
        plant: {
          value: null, type: 'dropdown', list: this.plantList, id: 'id', text: 'text', displayMul: false, width: 100
        },

        location: {
          value: null, type: 'dropdown', list: this.locationList, id: 'locationId', text: 'description', displayMul: false, width: 100
        },
        JoborProject: {
          value: null, type: 'text', width: 100, maxLength: 50
        },
        order: {
          value: null, type: 'dropdown', list: this.ordertypeList, id: 'id', text: 'text', displayMul: false, width: 100
        },
        
        costCenter: {
          value: null, type: 'dropdown', list: this.costCenterList, id: 'id', text: 'text', displayMul: false, width: 100
        },
        
        wbs: {
          value: null, type: 'dropdown', list: this.costCenterList, id: 'id', text: 'text', displayMul: false, width: 100
        },
       
        delete: {
          type: 'delete', width: 10
        }
      },
      formControl: {
        costCenter: [null, [Validators.required]],
      }
    }
  }

  getGIDetail(val) {
    const jvDetUrl = String.Join('/', this.apiConfigService.getGoodsissueDetail, val);
    this.apiService.apiGetRequest(jvDetUrl)
      .subscribe(
        response => {
          this.spinner.hide();
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.formData.setValue(res.response['goodsissueasters']);
              console.log(res.response['goodsissueastersDetail']);
              this.addOrEditService.sendDynTableData({ type: 'editValue', data: res.response['goodsissueastersDetail'] });
              this.formData.disable();
            }
          }
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
          this.getEmployeesList();
        });
  }

  getEmployeesList() {
    const getEmployeeList = String.Join('/', this.apiConfigService.getEmployeeList);
    this.apiService.apiGetRequest(getEmployeeList)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.employeesList = res.response['emplist'];
            }
          }
          this.getDepartmentData();
        });
  }

  getDepartmentData() {
    const getdepteUrl = String.Join('/', this.apiConfigService.getfunctionaldeptList);
    this.apiService.apiGetRequest(getdepteUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.fdeptList = res.response['fdeptList'];
            }
          }
          this.getplantData();
        });
  }

  getplantData() {
    const getplantUrl = String.Join('/', this.apiConfigService.getPlantsList);
    this.apiService.apiGetRequest(getplantUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.plantList = res.response['plantsList'];
            }
          }
          this.getMomentTypeList();
        });
  }

  getMomentTypeList() {
    const MomentTypeList = String.Join('/', this.apiConfigService.getmomenttypeList);
    this.apiService.apiGetRequest(MomentTypeList)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.movementList = res.response['movementList'];
            }
          }
          this.getWbselementList();
        });
  }
  getWbselementList() {
    const getwbselementUrl = String.Join('/', this.apiConfigService.getwbselement);
    this.apiService.apiGetRequest(getwbselementUrl)
      .subscribe(
        response => {
          const res = response.body;
          console.log(res);
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.wbsElementList = res.response['wbsList'];
            }
          }
          this.getOrderTypeList();
        });
  }
  getOrderTypeList() {
    const getOrderTypeUrl = String.Join('/', this.apiConfigService.getordernolist);
    this.apiService.apiGetRequest(getOrderTypeUrl)
      .subscribe(
        response => {
          const res = response.body;
          console.log(res);
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.ordertypeList = res.response['ordertypeList'];
            }
          }
          this.getlocationList();
        });
  }
 
  getlocationList() {
    const getlocationUrl = String.Join('/', this.apiConfigService.getlocationList);
    this.apiService.apiGetRequest(getlocationUrl)
      .subscribe(
        response => {
          const res = response.body;
          console.log(res);
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.locationList = res.response['locationList'];
            }
          }
          this.getfunctionaldeptList();
        });
  }
  getfunctionaldeptList() {
    const taxCodeUrl = String.Join('/', this.apiConfigService.getfunctionaldeptList);
    this.apiService.apiGetRequest(taxCodeUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.functionaldeptList = res.response['fdeptList'];
            }
          }
          this.getCostcenters();
        });
  }
  getCostcenters() {
    const costCenUrl = String.Join('/', this.apiConfigService.getCostCentersList);
    this.apiService.apiGetRequest(costCenUrl)
      .subscribe(
        response => {
          this.spinner.hide();
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.costCenterList = res.response['costcenterList'];
            }
          }
          this.dynTableProps = this.tablePropsFunc();
          if (this.routeEdit != '') {
            this.getGIDetail(this.routeEdit);
          }
        });
  }

  emitColumnChanges(data) {
    this.dataChange(data);
  }

  dataChange(row) {
    this.addOrEditService.sendDynTableData({ type: 'add', data: row.data });
  }

  emitTableData(data) {
    this.tableData = data;
  }


  back() {
    this.router.navigate(['dashboard/transaction/goodsissue']);
  }

  save() {
    if (this.tableData.length == 0) {
      return;
    }
   
    this.savegoodsissue();
  }

  return() { }

  reset() {
    this.tableData = [];
    this.formData.reset();
    this.addOrEditService.sendDynTableData({ type: 'reset', data: this.tableData });
  }

  savegoodsissue() {
    const addJournal = String.Join('/', this.apiConfigService.addGoodsissue);
    const requestObj = { gibHdr: this.formData.value, gibDtl: this.tableData };
    this.apiService.apiPostRequest(addJournal, requestObj).subscribe(
      response => {
        const res = response.body;
        if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!this.commonService.checkNullOrUndefined(res.response)) {
            this.alertService.openSnackBar('GoodsIssue created Successfully..', Static.Close, SnackBar.success);
          }
          this.reset();
          this.spinner.hide();
        }
      });
  }
}
