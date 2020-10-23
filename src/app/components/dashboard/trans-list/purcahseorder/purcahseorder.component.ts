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
  selector: 'app-purcahseorder',
  templateUrl: './purcahseorder.component.html',
  styleUrls: ['./purcahseorder.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class PurchaseOrderComponent implements OnInit {

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
  termsofDeliveryList = [{ id: "FOR", text: "FOR" },
  { id: "FOB", text: "FOB" }, { id: "CIF", text: "CIF" }, { id: "FAS", text: "FAS" }];

  // details props
  tableData = [];
  dynTableProps: any;
  routeEdit = '';
  materialList: any;
  pcgroupList: any;
  functionaldeptList: any;
  porderList: any;
  fcList: any;
  citemList: any;
  locList: any;
  employeesList: any;
  qnoList: any;
  ptypeList: any;
  ptermsList: any;

  // user details
  loginUser: any;
  bpaList: any;

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
    this.loginUser = JSON.parse(localStorage.getItem('user'));
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
        qty: {
          value: null, type: 'number', width: 100, maxLength: 50
        },
        rate: {
          value: null, type: 'number', width: 100, maxLength: 50
        },
        discount: {
          value: null, type: 'number', width: 100, maxLength: 50
        },
        tax: {
          value: null, type: 'number', width: 100, maxLength: 50
        },
        profitCenter: {
          value: null, type: 'dropdown', list: this.profitCenterList, id: 'code', text: 'description', displayMul: true, width: 100
        },
        branch: {
          value: null, type: 'dropdown', list: this.branchList, id: 'id', text: 'text', displayMul: true, width: 100
        },
        costCenter: {
          value: null, type: 'dropdown', list: this.costcenterList, id: 'code', text: 'costCenterName', displayMul: true, width: 100
        },
        wbs: {
          value: null, type: 'dropdown', list: this.wbsList, id: 'id', text: 'text', displayMul: true, width: 100
        },
        fundCenter: {
          value: null, type: 'dropdown', list: this.fcList, id: 'code', text: 'description', displayMul: true, width: 100
        },
        commitment: {
          value: null, type: 'dropdown', list: this.citemList, id: 'code', text: 'description', displayMul: true, width: 100
        },
        plant: {
          value: null, type: 'dropdown', list: this.plantList, id: 'plantCode', text: 'plantname', displayMul: true, width: 100
        },
        department: {
          value: null, type: 'dropdown', list: this.functionaldeptList, id: 'code', text: 'description', displayMul: true, width: 100
        },

        location: {
          value: null, type: 'dropdown', list: this.locList, id: 'id', text: 'text', displayMul: true, width: 100
        },
        // preparedBy: {
        //   value: null, type: 'dropdown', list: this.employeesList, id: 'roleId', text: 'role', displayMul: true, width: 100
        // },

        delete: {
          type: 'delete', width: 10
        }
      },

      formControl: {
        materialCode: [null, [Validators.required]],
      }
    };
  }

  formDataGroup() {
    this.formData = this.formBuilder.group({

      company: [null, [Validators.required]],
      plant: [null],
      branch: [null],
      profitCenter: [null],
      purchaseOrderType: [null],
      purchaseOrderNumber: [null, [Validators.required]],
      quotationDate: [null],
      supplierCode: [null],
      gstno: [null],
      deliveryDate: [null],
      deliveryPeriod: [null],
      termsofDelivery: null,
      paymentTerms: [null],
      purchaseOrderDate: null,
      addWho: [null],
      addDate: [null],
      editWho: null,
      editDate: [null],
      filePath: [null],
      advance: [null],
      quotationNumber: [null, [Validators.required]],
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formData.patchValue({
        filePath: file
      });
    }
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
          this.getPaymenttermsList();
        });
  }
  getPaymenttermsList() {
    const getpmList = String.Join('/', this.apiConfigService.getPaymentsTermsList);
    this.apiService.apiGetRequest(getpmList)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.ptermsList = res.response['ptermsList'];
            }
          }
          this.getsuppliercodeList();
        });
  }
  getsuppliercodeList() {
    const getsuppliercodeList = String.Join('/', this.apiConfigService.getBusienessPartnersAccList);
    this.apiService.apiGetRequest(getsuppliercodeList)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.bpaList = res.response['bpaList'];
              this.bpaList = res.response['bpaList'].filter(resp => resp.bpTypeName == 'Vendor')

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
          this.getquotationnoData();
        });
  }
  getquotationnoData() {
    const getquotationnoUrl = String.Join('/', this.apiConfigService.getquotationnoList);
    this.apiService.apiGetRequest(getquotationnoUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.qnoList = res.response['qnoList'];
            }
          }
          this.getpurchaseordertypetData();
        });
  }
  getpurchaseordertypetData() {
    const getpurchaseordertypeUrl = String.Join('/', this.apiConfigService.getpurchaseOrderTypeList);
    this.apiService.apiGetRequest(getpurchaseordertypeUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.porderList = res.response['porderList'];
            }
          }
          this.getFundCenterList();
        });
  }
  getFundCenterList() {
    const fcUrl = String.Join('/', this.apiConfigService.getfundcenterList);
    this.apiService.apiGetRequest(fcUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.fcList = res.response['fcList'];
            }
          }
          this.getCommitmentList();
        });
  }
  getCommitmentList() {
    const cmntUrl = String.Join('/', this.apiConfigService.getCommitmentList);
    this.apiService.apiGetRequest(cmntUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.citemList = res.response['citemList'];
            }
          }
          this.getlocationsList();
        });
  }
  getlocationsList() {
    const getlocationsList = String.Join('/', this.apiConfigService.getlocationsList);
    this.apiService.apiGetRequest(getlocationsList)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.locList = res.response['locationList'];
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

          this.getRolesList()
        });
  }
  getRolesList() {
    const getEmployeeList = String.Join('/', this.apiConfigService.getrolelist);
    this.apiService.apiGetRequest(getEmployeeList)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.employeesList = res.response['roleList'];
              this.employeesList = res.response['roleList'].filter(resp => resp.roleId == this.loginUser.role)
            }
          }
          this.getmaterialData();
        });
  }
  getPurchaseGroupData() {
    const getpcUrl = String.Join('/', this.apiConfigService.getPurchaseGroupList);
    this.apiService.apiGetRequest(getpcUrl)
      .subscribe(
        response => {
          const res = response.body;
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
            this.getPurchaseorderDetails(this.routeEdit);
          }
        });
  }

  getPurchaseorderDetails(val) {
    const cashDetUrl = String.Join('/', this.apiConfigService.getpurchaseorderDetail, val);
    this.apiService.apiGetRequest(cashDetUrl)
      .subscribe(
        response => {
          this.spinner.hide();
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.formData.setValue(res.response['pomasters']);

              this.sendDynTableData = { type: 'edit', data: res.response['poDetail'] };
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
    this.router.navigate(['dashboard/transaction/purchaseorder'])
  }

  save() {
    if (this.tableData.length == 0 && this.formData.invalid) {
      return;
    }
    this.savepurcahseorder();
  }

  savepurcahseorder() {

    const addprorder = String.Join('/', this.apiConfigService.addpurchaseorder);
    const requestObj = { poHdr: this.formData.value, poDtl: this.tableData };
    this.apiService.apiPostRequest(addprorder, requestObj).subscribe(
      response => {
        // this.saveimage();
        const res = response.body;
        if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!this.commonService.checkNullOrUndefined(res.response)) {
            this.alertService.openSnackBar('Purchase Order created Successfully..', Static.Close, SnackBar.success);
            //this.spinner.hide();

          }
          this.reset();
          this.spinner.hide();
        }
      });
  }
  saveimage() {

    const requestObj = this.formData.get('filePath').value;
    const getLoginUrl = String.Join('/', this.apiConfigService.saveimage);
    this.apiService.apiPostRequest(getLoginUrl, requestObj)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.alertService.openSnackBar('Image Saved Successfully..', Static.Close, SnackBar.success);
            }
          }
          this.spinner.hide();
        });
  }
  return() {
    const addpo = String.Join('/', this.apiConfigService.returnpurchaseorder, this.routeEdit);
    this.apiService.apiGetRequest(addpo).subscribe(
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
