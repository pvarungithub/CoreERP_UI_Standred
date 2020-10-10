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
  selector: 'app-goodsissue',
  templateUrl: './goodsissue.component.html',
  styleUrls: ['./goodsissue.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})

export class GoodsissueComponent implements OnInit {

  sendDynTableData: any;

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
  mreqList: any;
  mreqdetailsList: any;
  mmasterList: any;

  constructor(private commonService: CommonService,
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
    this.getfunctionaldeptList();
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

        checkAll:
        {
          value: false, type: 'checkbox'
        },

        materialCode: {
          value: null, type: 'text', width: 75, maxLength: 15, disabled: true,
        },
        qty: {
          value: null, type: 'text', width: 75, maxLength: 15, disabled: true,
        },
        location: {
          value: null, type: 'text', width: 75, maxLength: 15, disabled: true,
        },


        joborProject: {
          value: null, type: 'text', width: 100, maxLength: 50, disabled: true,
        },
        order: {
          value: null, type: 'text', width: 75, maxLength: 15, disabled: true,
        },

        costCenter: {
          value: null, type: 'text', width: 75, maxLength: 15, disabled: true,
        },
        wbs: {
          value: null, type: 'text', width: 75, maxLength: 15, disabled: true,
        },


        availableqty: {
          value: null, type: 'number', width: 100, maxLength: 7, disabled: true, fieldEnable: true
        },
        allocatedqty: {
          value: null, type: 'number', width: 100, maxLength: 7, disabled: true, fieldEnable: true
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
              this.sendDynTableData = { type: 'edit', data: res.response['goodsissueastersDetail'] };
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
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.ordertypeList = res.response['ordertypeList'];
            }
          }
          this.getmaterialList();
        });
  }
  getmaterialList() {
    const getmaterialList = String.Join('/', this.apiConfigService.getmaterialdata);
    this.apiService.apiGetRequest(getmaterialList)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.mmasterList = res.response['mmasterList'];
            }
          }
          this.getreqList();
        });
  }
  getreqList() {
    const getreqListUrl = String.Join('/', this.apiConfigService.getreqList);
    this.apiService.apiGetRequest(getreqListUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.mreqList = res.response['mreqList'];
            }
          }
          this.getreqdetailsList();
        });
  }

  getreqdetailsList() {
    const getreqdetailsListUrl = String.Join('/', this.apiConfigService.getreqdetailsList);
    this.apiService.apiGetRequest(getreqdetailsListUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.mreqdetailsList = res.response['mreqdetailsList'];
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
    //this.dataChange(data);
    if (data.column == 'checkAll') {
      if (data.data[data.index].checkAll.value) {
        //this.getDiscount(data);
      }
      else {
        data.data[data.index].discount.value = 0;
        this.sendDynTableData = { type: 'add', data: data.data };
      }
    }
  }

  dataChange(row) {
    //this.sendDynTableData = { type: 'add', data: row.data };
  }
  reqnoselect() {
    let data = [];
    let newData = [];
    if (!this.commonService.checkNullOrUndefined(this.formData.get('requisitionNumber').value)) {
      data = this.mreqdetailsList.filter(resp => resp.requisitionNumber == this.formData.get('requisitionNumber').value);
    }
    if (data.length) {
      console.log(data, this.tablePropsFunc());
      data.forEach((res, index) => {
        newData.push(this.tablePropsFunc().tableData);
        newData[index].qty.value = res.qty;
        newData[index].materialCode.value = res.materialCode;
        newData[index].location.value = res.sotrageLocation;
        newData[index].joborProject.value = res.joborProject;
        newData[index].order.value = res.order;
        newData[index].costCenter.value = res.costCenter;
        newData[index].wbs.value = res.wbs;
      })
    }
    //
    this.sendDynTableData = { type: 'add', data: newData, removeEmptyRow: 0 };
  }

  emitTableData(data) {
    this.tableData = data;
  }


  back() {
    this.router.navigate(['dashboard/transaction/goodsissue']);
  }

  checkAjectAmount(flag = false) {
    // let adjustmentAmount = 0;
    return true;
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
    this.sendDynTableData = { type: 'reset', data: this.tableData };
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
