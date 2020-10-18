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
  selector: 'app-materialrequisition',
  templateUrl: './materialrequisition.component.html',
  styleUrls: ['./materialrequisition.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})

export class MaterialrequisitionComponents implements OnInit {

  formData: FormGroup;
  sendDynTableData: any;

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
  mmasterList: any;
  costunitList: any;

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
    /// this.formData.controls['requisitionNumber'].disable();
  }

  formDataGroup() {
    this.formData = this.formBuilder.group({
      company: [null, [Validators.required]],
      plant: [null, [Validators.required]],
      branch: [null],
      project: [null],
      department: [null],
      requisitionNmber: [null],
      bomorderNumber: [null],
      requisitionDate: [null],
      addWho: [null],
      addDate: [null],
      editDate: [null],
      editWho: [null],
      status: [null],
    });
  }

  tablePropsFunc() {
    return {
      tableData: {
        //id: {
        //  value: 0, type: 'autoInc', width: 10, disabled: true
        //},
        materialCode: {
          value: null, type: 'dropdown', list: this.mmasterList, id: 'id', text: 'text', displayMul: false, width: 100
        },
        description: {
          value: null, type: 'text', width: 75, maxLength: 15
        },
        qty: {
          value: null, type: 'number', width: 75, maxLength: 15
        },

        sotrageLocation: {
          value: null, type: 'dropdown', list: this.locationList, id: 'locationId', text: 'description', displayMul: false, width: 100
        },

        joborProject: {
          value: null, type: 'dropdown', list: this.costunitList, id: 'id', text: 'text', displayMul: false, width: 100
        },
        costCenter: {
          value: null, type: 'dropdown', list: this.costCenterList, id: 'id', text: 'text', displayMul: false, width: 100
        },

        profitCenter: {
          value: null, type: 'dropdown', list: this.profitCenterList, id: 'id', text: 'text', displayMul: false, width: 100
        },
        wbs: {
          value: null, type: 'dropdown', list: this.wbsElementList, id: 'id', text: 'text', displayMul: false, width: 100
        },
        order: {
          value: null, type: 'dropdown', list: this.ordertypeList, id: 'orderType', text: 'description', displayMul: false, width: 100
        },
        price: {
          value: null, type: 'number', width: 75, maxLength: 15
        },
        value: {
          value: null, type: 'text', width: 75, maxLength: 15
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

  getMreqDetail(val) {
    const jvDetUrl = String.Join('/', this.apiConfigService.getmreqDetail, val);
    this.apiService.apiGetRequest(jvDetUrl)
      .subscribe(
        response => {
          this.spinner.hide();
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.formData.setValue(res.response['mreqmasters']);
              console.log(res.response['mreqDetail']);
              this.sendDynTableData = { type: 'edit', data: res.response['mreqDetail'] };
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
          this.getcostunitsData();
        });
  }
  getcostunitsData() {
    const getsecondelementUrl = String.Join('/', this.apiConfigService.getcostingunitsList);
    this.apiService.apiGetRequest(getsecondelementUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.costunitList = res.response['costunitList'];
              this.costunitList = res.response['costunitList'].filter(resp => resp.costUnitType == 'Project')
            }
          }
          this.getbranchList();
        });
  }
  getbranchList() {
    const getbranchList = String.Join('/', this.apiConfigService.getBranchList);
    this.apiService.apiGetRequest(getbranchList)
      .subscribe(
        response => {
          const res = response.body;

          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.branchList = res.response['branchsList'];
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
          this.getprofircenterData();
        });
  }

  getprofircenterData() {
    const getprofircenterData = String.Join('/', this.apiConfigService.getProfitCentersList);
    this.apiService.apiGetRequest(getprofircenterData)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.profitCenterList = res.response['profitCenterList'];
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
            this.getMreqDetail(this.routeEdit);
          }
        });
  }

  emitColumnChanges(data) {
    this.dataChange(data);
  }

  dataChange(row) {
    this.sendDynTableData = { type: 'add', data: row.data };
  }

  emitTableData(data) {
    this.tableData = data;
  }


  back() {
    this.router.navigate(['dashboard/transaction/materialrequisition']);
  }

  save() {
    if (this.tableData.length == 0) {
      return;
    }

    this.savemreq();
  }

  return() { }

  reset() {
    this.tableData = [];
    this.formData.reset();
    this.sendDynTableData = { type: 'reset', data: this.tableData };
  }

  savemreq() {
    const addJournal = String.Join('/', this.apiConfigService.addmareq);
    const requestObj = { mreqHdr: this.formData.value, mreqDtl: this.tableData };
    this.apiService.apiPostRequest(addJournal, requestObj).subscribe(
      response => {
        const res = response.body;
        if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!this.commonService.checkNullOrUndefined(res.response)) {
            this.alertService.openSnackBar('Material Req created Successfully..', Static.Close, SnackBar.success);
          }
          this.reset();
          this.spinner.hide();
        }
      });
  }
}
