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
  selector: 'app-purchasing',
  templateUrl: './purchasing.component.html',
  styleUrls: ['./purchasing.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class PurchasingComponent implements OnInit {

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
  listOfProdList = [{ id: "Stores consumption", text: "Stores consumption" }, { id: "General services", text: "General services" }];

  // details props
  tableData = [];
  dynTableProps: any;
  routeEdit = '';
  materialList: any;
  pcgroupList: any;
  functionaldeptList: any;

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
    this.getPurchaseGroupData();
  }

  tablePropsFunc() {
    return {
      tableData: {
        materialCode: {
          value: null, type: 'dropdown', list: this.materialList, id: 'id', text: 'text', displayMul: true, width: 100
        },
        description: {
          value: null, type: 'text', width: 100, maxLength: 50
        },
        requiredQty: {
          value: null, type: 'text', width: 100, maxLength: 50
        },
        stockQty: {
          value: null, type: 'text', width: 100, maxLength: 50
        },
        requiredDate: {
          value: new Date(), type: 'datepicker', width: 100, disabled: true
        },
        purchaseGroup: {
          value: null, type: 'dropdown', list: this.materialList, id: 'id', text: 'text', displayMul: true, width: 100
          //value: null, type: 'dropdown', list: this.pcgroupList, id: 'pruchaseGroup', text: 'description', displayMul: true, width: 100
        },
        productionOrder: {
          value: null, type: 'text', width: 100, maxLength: 50
        },
        reservationNumber: {
          value: null, type: 'text', width: 100, maxLength: 50
        },
        delete: {
          type: 'delete', width: 10
        }
      },

      formControl: {
        reservationNumber: [null, [Validators.required]],
      }
    };
  }

  formDataGroup() {
    this.formData = this.formBuilder.group({
      company: [null, [Validators.required]],
      plant: [null],
      department: [null],
      branch: [null],
      costCenter: [null],
      profitCenter: [null],
      wbs: [null],
      requiredfor: [null],
      projectName: [null],
      requisitionNumber: [null],
      requisitionDate: [null],
      narration: [null],
      addWho: [null],
      addDate: [null],
      editWho: null,
      editDate: [null],
      recomendedBy: null,
      recomendedDate: [null],
      approvedBy: null,
      approvedDate: [null],
      status: [null],
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
          this.getdepartmentData();
        });
  }

  getdepartmentData() {
    const getdepartmentTypeUrl = String.Join('/', this.apiConfigService.getfunctionaldeptList);
    this.apiService.apiGetRequest(getdepartmentTypeUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.functionaldeptList = res.response['fdeptList'];
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
          this.getCostCenterData();
        });
  }

  getCostCenterData() {
    const getccUrl = String.Join('/', this.apiConfigService.GetCostCenterList);
    this.apiService.apiGetRequest(getccUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.costcenterList = res.response['costcenterList'];
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

          this.getmaterialData()
        });
  }
  getPurchaseGroupData() {
    const getpcUrl = String.Join('/', this.apiConfigService.getPurchaseGroupList);
    this.apiService.apiGetRequest(getpcUrl)
      .subscribe(
        response => {
          const res = response.body;
          console.log(res);
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.pcgroupList = res.response['pcgroupList'];
            }
          }

          this.spinner.hide()
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
            this.getPurchasingDetails(this.routeEdit);
          }
        });
  }

  getPurchasingDetails(val) {
    const cashDetUrl = String.Join('/', this.apiConfigService.getpurchasereqDetail, val);
    this.apiService.apiGetRequest(cashDetUrl)
      .subscribe(
        response => {
          this.spinner.hide();
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.formData.setValue(res.response['preqmasters']);
              this.sendDynTableData = { type: 'edit', data: res.response['preqDetail'] };
              this.formData.disable();
            }
          }
        });
  }

  emitColumnChanges(data) {
    // this.calculateAmount(data);
  }

  emitTableData(data) {
    this.tableData = data;
  }


  back() {
    this.router.navigate(['dashboard/transaction/purcahserequisition'])
  }

  save() {
    if (this.tableData.length == 0 && this.formData.invalid) {
      return;
    }
    this.savepurcahserequisition();
  }

  savepurcahserequisition() {
    const addprreq = String.Join('/', this.apiConfigService.addpurchasereq);
    const requestObj = { preqHdr: this.formData.value, preqDtl: this.tableData };
    this.apiService.apiPostRequest(addprreq, requestObj).subscribe(
      response => {
        const res = response.body;
        if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!this.commonService.checkNullOrUndefined(res.response)) {
            this.alertService.openSnackBar('Purchase Requisition created Successfully..', Static.Close, SnackBar.success);
            //this.spinner.hide();
          }
          this.reset();
          this.spinner.hide();
        }
      });
  }

  return() {
    const addCashBank = String.Join('/', this.apiConfigService.returnpurchasereq, this.routeEdit);
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
    this.sendDynTableData = { type: 'reset', data: this.tableData };
  }

}
