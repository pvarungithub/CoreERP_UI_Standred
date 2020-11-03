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
  selector: 'app-receipt-of-goods',
  templateUrl: './receipt-of-goods.component.html',
  styleUrls: ['./receipt-of-goods.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class ReceiptOfGoodsComponent implements OnInit {

  formData: FormGroup;
  routeEdit = '';

  tableData = [];


  dynTableProps: any;
  sendDynTableData: any;
  grnDate: any;
  // header props
  porderList = [];
  companyList = [];
  plantList = [];
  branchList = [];
  profitCenterList = [];
  employeesList = [];
  movementList = [];
  stlocList = [];
  materialList = [];
  purchaseordernoList: any;
  podetailsList: any;
  bpaList: any;

  constructor(
    private formBuilder: FormBuilder,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    public commonService: CommonService,
    public route: ActivatedRoute,
    private router: Router) {
    if (!this.commonService.checkNullOrUndefined(this.route.snapshot.params.value)) {
      this.routeEdit = this.route.snapshot.params.value;
    }
  }

  ngOnInit(): void {
    this.formDataGroup();
    this.getpurchaseOrderTypeData();
  }
  approveOrReject(event) {
    //debugger;
    if (event) {
      this.formData.patchValue({
        qualityCheck: "Accpt",
        reject: null
      });
    } else {
      this.formData.patchValue({
        qualityCheck: null,
        reject: "Reject"
      });
    }
  }

  formDataGroup() {
    this.formData = this.formBuilder.group({
      purchaseOrderNo: [null],
      company: [null, [Validators.required]],
      plant: [null],
      branch: [null],
      profitCenter: [null],
      supplierCode: [null],
      //supplierName: [null],
      supplierReferenceNo: [null],

      receivedBy: [null],
      receivedDate: [null],
      receiptDate: [null],
      supplierGinno: [null],
      movementType: [null],
      grnno: [null],
      grndate: [null],
      qualityCheck: [null],
      storageLocation: [null],
      inspectionNoteNo: [null, [Validators.required]],
      id: ['0'],
      rrno: [null],
      vehicleNo: [null],
      addWho: [null],
      addDate: [null],
      editWho: [null],
      editDate: [null],
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
          //value: null, type: 'dropdown', list: this.materialList, id: 'id', text: 'text', displayMul: true, width: 100
        },
        description: {
          value: null, type: 'text', width: 75, maxLength: 15, disabled: true,
        },
        poqty: {
          value: null, type: 'number', width: 75, maxLength: 15, disabled: true,
        },
        receivedQty: {
          value: null, type: 'number', width: 75, maxLength: 15, disabled: true, fieldEnable: true
        },
        plant: {
          value: null, type: 'text', width: 75, maxLength: 15, disabled: true,
          //value: null, type: 'dropdown', list: this.plantList, id: 'plantCode', text: 'plantname', displayMul: true, width: 100
        },
        storageLocation: {
          value: null, type: 'text', width: 75, maxLength: 15, disabled: true,
          //value: null, type: 'dropdown', list: this.stlocList, id: 'code', text: 'name', displayMul: true, width: 100
        },
        profitCenter: {
          value: null, type: 'text', width: 75, maxLength: 15, disabled: true,
          //value: null, type: 'dropdown', list: this.profitCenterList, id: 'code', text: 'description', displayMul: true, width: 100
        },
        project: {
          value: null, type: 'text', width: 75, maxLength: 15, disabled: true,
        },
        branch: {
          value: null, type: 'text', width: 75, maxLength: 15, disabled: true,
          //value: null, type: 'dropdown', list: this.branchList, id: 'id', text: 'text', displayMul: true, width: 100
        },
        movementType: {
          value: null, type: 'text', width: 75, maxLength: 15, disabled: true,
          // value: null, type: 'dropdown', list: this.movementList, id: 'code', text: 'description', displayMul: true, width: 100, 
        },
        lotNo: {
          value: null, type: 'number', width: 100, maxLength: 50, fieldEnable: true
        },
        lotDate: {
          value: null, type: 'datepicker', width: 100, fieldEnable: true
        },
        delete: {
          type: 'delete', width: 10
        }
      },

      formControl: {
        materialCode: [null, [Validators.required]],
      }
    };
  }

  grndatechange() {
    if (this.tableData.length) {
      this.tableData.map(resp => resp.lotDate.value === this.formData.get('grndate').value)
      this.sendDynTableData = { type: 'add', data: this.tableData };
    }
  }

  ponoselect() {
    let data = [];
    let newData = [];
    if (!this.commonService.checkNullOrUndefined(this.formData.get('purchaseOrderNo').value)) {
      data = this.podetailsList.filter(resp => resp.purchaseOrderNumber == this.formData.get('purchaseOrderNo').value);
    }
    if (data.length) {
      // console.log(data, this.tablePropsFunc());
      data.forEach((res, index) => {
        newData.push(this.tablePropsFunc().tableData);
        //this.getLotNumberData(res.materialCode);
        newData[index].poqty.value = res.qty;
        newData[index].materialCode.value = res.materialCode;
        newData[index].storageLocation.value = res.location;
        newData[index].description.value = res.description;
        newData[index].project.value = res.joborProject;
        newData[index].profitCenter.value = res.profitCenter;
        newData[index].branch.value = res.branch;
        newData[index].plant.value = res.plant;
        newData[index].lotDate.value = new Date();
      })
    }
    //
  this.tableData = newData;
    this.sendDynTableData = { type: 'add', data: newData };

  }

  getpurchaseOrderTypeData() {
    const getpurchaseOrderTypeUrl = String.Join('/', this.apiConfigService.getpurchaseOrderTypeList);
    this.apiService.apiGetRequest(getpurchaseOrderTypeUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.porderList = res.response['porderList'];
            }
          }
          this.getCompanyList();
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
          this.getpodetailsList();
        });
  }
  getpodetailsList() {
    const getpodetailsListUrl = String.Join('/', this.apiConfigService.getpodetailsList);
    this.apiService.apiGetRequest(getpodetailsListUrl)
      .subscribe(
        response => {
          const res = response.body;
          console.log(res);
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.podetailsList = res.response['podetailsList'];
            }
          }
          this.getpurchasenoList();
        });
  }
  getpurchasenoList() {
    const poUrl = String.Join('/', this.apiConfigService.getpurchasenoList);
    this.apiService.apiGetRequest(poUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.purchaseordernoList = res.response['purchaseordernoList'];
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
          console.log(res);
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
          this.getEmployeesList()
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
          this.getstorageLocationData();
        });
  }

  getstorageLocationData() {
    const getstorageUrl = String.Join('/', this.apiConfigService.getStList);
    this.apiService.apiGetRequest(getstorageUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.stlocList = res.response['stlocList'];
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
          this.spinner.hide();
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.materialList = res.response['materialList'];
            }
          }
          this.dynTableProps = this.tablePropsFunc();
          if (this.routeEdit != '') {
            this.getRecepitOfGoodsDetails(this.routeEdit);
          }
        });
  }

  getRecepitOfGoodsDetails(val) {
    const cashDetUrl = String.Join('/', this.apiConfigService.getgoodsreceiptDetail, val);
    this.apiService.apiGetRequest(cashDetUrl)
      .subscribe(
        response => {
          this.spinner.hide();
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.formData.setValue(res.response['grmasters']);
              this.sendDynTableData = { type: 'edit', data: res.response['grDetail'] };
              this.formData.disable();
            }
          }
        });
  }
  getLotNumData(row) {

    const getlotnos = String.Join('/', this.apiConfigService.gettinglotNumbers, row.data[row.index].materialCode.value);
    this.apiService.apiGetRequest(getlotnos)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {

              row.data[row.index].lotNo.value = res.response['lotNum']
              //row.data[row.index].lotDate.value =JSON.stringify(this.grnDate);
              this.sendDynTableData = { type: 'add', data: row.data};
              this.tableData = row.data;
            }
          }
          //this.spinner.hide();
        });

  }

  emitColumnChanges(data) {
 this.tableData = data.data;
    if (data.column == 'checkAll') {
      if (data.data[data.index].checkAll.value) {
        this.getLotNumData(data);
      }

    }
   
  }

  

  back() {
    this.router.navigate(['dashboard/transaction/goodsreceipts'])
  }

  save() {
    this.tableData = this.commonService.formatTableData(this.tableData, 0);
    if (this.tableData.length == 0 && this.formData.invalid) {
      return;
    }
    this.savegoodsreceipt();
  }

  savegoodsreceipt() {
    const addgoodsreceipt = String.Join('/', this.apiConfigService.addgoodsreceipt);
    const requestObj = { grHdr: this.formData.value, grDtl: this.tableData };
    this.apiService.apiPostRequest(addgoodsreceipt, requestObj).subscribe(
      response => {
        const res = response.body;
this.tableData = [];
        if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!this.commonService.checkNullOrUndefined(res.response)) {
            this.alertService.openSnackBar('Goods Receipt created Successfully..', Static.Close, SnackBar.success);
          }
          this.reset();
          this.spinner.hide();
        }
      });
  }

  return() {
    const addCashBank = String.Join('/', this.apiConfigService.returngoodsreceipt, this.routeEdit);
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
