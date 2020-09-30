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

interface BomType {
  value: string;
  viewValue: string;
}
interface LevelType {
  value: string;
  viewValue: string;
}
interface Level {
  value: string;
  viewValue: string;
}
interface Type {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-bom',
  templateUrl: './bom.component.html',
  styleUrls: ['./bom.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})

export class BillOfMaterialComponent implements OnInit {

  formData: FormGroup;
  routeEdit = '';
  bpList = [];
  tableData = [];
  dynTableProps: any;
  bpgLists: any;
  companyList = [];
  UomList = [];
  voucherClassList = [];
  voucherTypeList = [];
  natureofTransactionList = ['Receipts', 'Payment'];
  accountList = [];
  accountFilterList = [];
  glAccountList = [];
  level = [{ id: '1', text: '1' }, { id: '2', text: '2' }, { id: '3', text: '3' },
  { id: '4', text: '4' }, { id: '5', text: '5' }, { id: '6', text: '6' },
  { id: '7', text: '7' }, { id: '8', text: '8' }, { id: '9', text: '9' }, { id: '10', text: '10' }
  ];
  maftype = [{ id: 'Sub Assembly', text: 'Sub Assembly' },
  { id: 'Component', text: 'Component' }, { id: 'Raw Material', text: 'Raw Material' }];

  type = [{ id: 'BOM', text: 'BOM' }, { id: 'Item', text: 'Item' }]

  profitCenterList = [];
  bpTypeList = [];
  segmentList = [];
  costCenterList = [];
  taxCodeList = [];
  functionaldeptList = [];
  purchaseinvoice = [];
  amount = [];
  date = [];
  mmasterList = [];
  BomType: BomType[] =
    [
      { value: 'Engineering BOM', viewValue: 'Engineering BOM' },
      { value: 'Sale Order BOM', viewValue: 'Sale Order BOM' },
      { value: 'Production BOM', viewValue: 'Production BOM' },
      { value: 'Service BOM', viewValue: 'Service BOM' },
      { value: 'Maintenance BOM', viewValue: 'Maintenance BOM' }
    ];

  LevelType: LevelType[] =
    [
      { value: 'Single', viewValue: 'Single' },
      { value: 'Multiple', viewValue: 'Multiple' }
    ];
  plantList: any;
  costunitList: any;
  // mmasterList: any;
  employeesList: any;
  batchmasterList: any;
  //UomList: any;
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

  onbpChange() {
    this.bpgLists = [];
    //if (!this.commonService.checkNullOrUndefined(this.formData.get('bpcategory').value)) {
    //  let data = this.bpTypeList.find(res => res.code == this.formData.get('bpcategory').value);
    //  this.bpgLists = this.bpList.filter(res => res.bptype == data.code);
    //  this.formData.patchValue({
    //    partyAccount: this.bpgLists.length ? this.bpgLists[0].id : null
    //  })
    //  this.puchaseinvoiceselect();
    //}
  }

  ngOnInit() {
    this.formDataGroup();
    this.getCompanyList();
    this.formData.controls['bomnumber'].disable();
  }

  formDataGroup() {
    this.formData = this.formBuilder.group({
      company: [null, [Validators.required]],
      plant: [null, [Validators.required]],
      bomtype: [null],
      bomnumber: [null, [Validators.required]],
      description: [null],
      costUnit: [null],
      material: [null],
      batch: [null],
      createdBy: [null],
      levelType: [null]

    });
    // this.checkTransType();
  }

  tablePropsFunc() {
    return {
      tableData: {
        id: {
          value: 0, type: 'autoInc', width: 10, disabled: true
        },

        bomLevel: {
          value: null, type: 'dropdown', list: this.level, id: 'id', text: 'text', displayMul: false, width: 100
        },
        component: {
          value: null, type: 'dropdown', list: this.mmasterList, id: 'materialCode', text: 'materialName', displayMul: false, width: 100
        },
        description: {
          value: null, type: 'text', width: 100, maxLength: 50
        },

        manufacturingType: {
          value: null, type: 'dropdown', list: this.maftype, id: 'id', text: 'text', displayMul: false, width: 100
        },
        type: {
          value: null, type: 'dropdown', list: this.type, id: 'id', text: 'text', displayMul: false, width: 100
        },
        aboveLevel: {
          value: null, type: 'dropdown', list: this.level, id: 'id', text: 'text', displayMul: false, width: 100
        },

        qty: {
          value: null, type: 'number', width: 75
        },
        uom: {
          value: null, type: 'dropdown', list: this.UomList, id: 'id', text: 'text', displayMul: false, width: 100
        },
        delete: {
          type: 'delete', width: 10
        }
      },

      formControl: {
        uom: [null, [Validators.required]]
      }
    };
  }



  //puchaseinvoiceselect() {
  //  let data = [];
  //  let newData = [];
  //  if (!this.commonService.checkNullOrUndefined(this.formData.get('partyAccount').value)) {
  //    data = this.functionaldeptList.filter(resp => resp.partyAccount == this.formData.get('partyAccount').value);
  //  }
  //  if (data.length) {
  //    console.log(data, this.tablePropsFunc());
  //    data.forEach((res, index) => {
  //      newData.push(this.tablePropsFunc().tableData);
  //      newData[index].dueDate.value = res.dueDate;
  //      newData[index].partyAccount.value = res.partyAccount;
  //      newData[index].partyInvoiceNo.value = res.partyInvoiceNo;
  //      newData[index].paymentterms.value = res.paymentterms;
  //      newData[index].postingDate.value = res.postingDate;
  //      newData[index].totalAmount.value = res.totalAmount;
  //    })
  //  }
  //  //
  //  this.addOrEditService.sendDynTableData({ type: 'add', data: newData, removeEmptyRow: 0 });
  //}

  getbomDetail(val) {
    debugger;
    const bomUrl = String.Join('/', this.apiConfigService.getBOMDetail, val);
    this.apiService.apiGetRequest(bomUrl)
      .subscribe(
        response => {
          this.spinner.hide();
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.formData.setValue(res.response['bomMasters']);
              this.addOrEditService.sendDynTableData({ type: 'edit', data: res.response['bomDetail'] });
              this.formData.disable();
              //this.accountSelect();
              this.onbpChange();
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
              this.formData.patchValue({
                company: this.companyList.length ? this.companyList[0].id : null
              })
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
          this.getCostUnitList();
        });
  }

  getCostUnitList() {
    const voucherClassList = String.Join('/', this.apiConfigService.getCostUnitListList);
    this.apiService.apiGetRequest(voucherClassList)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.costunitList = res.response['costunitList'];
            }
          }
          this.getMaterialList();
        });
  }

  getMaterialList() {
    const voucherClassList = String.Join('/', this.apiConfigService.getmaterialdata);
    this.apiService.apiGetRequest(voucherClassList)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.mmasterList = res.response['mmasterList'];
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
          this.getBatchList();
        });
  }
  getBatchList() {
    const getbatchList = String.Join('/', this.apiConfigService.getbatchList);
    this.apiService.apiGetRequest(getbatchList)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.batchmasterList = res.response['batchmasterList'];
            }
          }
          this.getuomTypeData();
        });
  }

  getuomTypeData() {
    const getuomTypeUrl = String.Join('/', this.apiConfigService.getuomList);
    this.apiService.apiGetRequest(getuomTypeUrl)
      .subscribe(
        response => {
          this.spinner.hide();
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.UomList = res.response['UomList'];
            }
          }
          this.dynTableProps = this.tablePropsFunc();
          if (this.routeEdit != '') {
            this.getbomDetail(this.routeEdit);
          }
        });
  }



  voucherTypeSelect() {
    //debugger;
    //alert(this.formData.get('voucherType').value);
    const record = this.voucherTypeList.find(res => res.voucherTypeId == this.formData.get('voucherType').value)
    this.formData.patchValue({
      voucherClass: !this.commonService.checkNullOrUndefined(record) ? record.voucherClass : null
    })
  }



  emitColumnChanges(data) {
    if (data.column == 'adjustmentAmount') {
      //this.loopTableData(data);
      this.checkAjectAmount(true)
    }
    if (data.column == 'checkAll') {
      //this.getDiscount(data);
    }

  }

  //loopTableData(row) {
  //  const dublicateRow = [...row.data];
  //  let flag = false;
  //  // let checkAjectAmount = 0;
  //  // for (let r = 0; r < row.data.length; r++) {
  //  // if (row.column == 'adjustmentAmount' && r == row.index) {
  //  //if (row.column == 'adjustmentAmount') {
  //  //  if (+row.data[row.index].adjustmentAmount.value > +row.data[row.index].totalAmount.value) {
  //  //    this.alertService.openSnackBar(`AdjustmentAmount can't be more than totalAmount`, Static.Close, SnackBar.error);
  //  //    row.data[row.index].adjustmentAmount.value = 0;
  //  //    flag = true;
  //  //    // break;
  //  //  }
  //  //  // checkAjectAmount = checkAjectAmount + (+row.data[r].adjustmentAmount.value);
  //  //  // if (checkAjectAmount == +this.formData.get('amount').value) {
  //  //  //   this.alertService.openSnackBar(`AdjustmentAmount can't be same as total amount`, Static.Close, SnackBar.error);
  //  //  //   row.data[row.index].adjustmentAmount.value = 0;
  //  //  //   flag = true;
  //  //  //   break;
  //  //  // }
  //  //}

  //  // }
  //  if (flag) {
  //    this.spinner.show();
  //    this.addOrEditService.sendDynTableData({ type: 'add', data: dublicateRow });
  //  }
  //}

  //getDiscount(row) {
  //  const getDiscountUrl = String.Join('/', this.apiConfigService.getDiscount);
  //  const requestObj = {
  //    dueDate: row.data[row.index].dueDate.value, partyAccount: row.data[row.index].partyAccount.value,
  //    partyInvoiceNo: row.data[row.index].partyInvoiceNo.value, paymentterms: row.data[row.index].paymentterms.value,
  //    postingDate: row.data[row.index].postingDate.value, totalAmount: row.data[row.index].totalAmount.value
  //  };
  //  this.apiService.apiPostRequest(getDiscountUrl, requestObj)
  //    .subscribe(
  //      response => {
  //        this.spinner.hide();
  //        const res = response.body;
  //        if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
  //          if (!this.commonService.checkNullOrUndefined(res.response)) {
  //            row.data[row.index].discount.value = res.response['discount']
  //            this.addOrEditService.sendDynTableData({ type: 'add', data: row.data });
  //          }
  //        }
  //        if (this.routeEdit != '') {
  //          this.getbomDetail(this.routeEdit);
  //        }
  //      });
  //}

  emitTableData(data) {
    this.tableData = data;
    console.log(this.tableData)
  }

  back() {
    this.router.navigate(['dashboard/transaction/bom'])
  }

  checkAjectAmount(flag = false) {
    let adjustmentAmount = 0;
    //if (this.tableData.length) {
    //  this.tableData.forEach(res => {
    //    if (res.adjustmentAmount) {
    //      adjustmentAmount = adjustmentAmount + (+res.adjustmentAmount)
    //    }
    //  });
    //  if (adjustmentAmount == +this.formData.get('amount').value && !this.commonService.checkNullOrUndefined(adjustmentAmount) && flag) {
    //    this.alertService.openSnackBar(`AdjustmentAmount can't be same as total amount`, Static.Close, SnackBar.error);
    //  }
    //  return (adjustmentAmount == +this.formData.get('amount').value && !this.commonService.checkNullOrUndefined(adjustmentAmount)) ? false : true;
    //}
    return true;
  }

  save() {
    debugger;
    if (this.tableData.length == 0) {
      return;
    }
    this.savebom();
  }

  return() {
    const addCashBank = String.Join('/', this.apiConfigService.returnBOM, this.routeEdit);
    this.apiService.apiGetRequest(addCashBank).subscribe(
      response => {
        const res = response.body;
        if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!this.commonService.checkNullOrUndefined(res.response)) {
            this.alertService.openSnackBar(res.response, Static.Close, SnackBar.success);
          }
          this.spinner.hide();
        }
      });
  }

  reset() {
    this.tableData = [];
    this.formData.reset();
    this.formData.controls['bomnumber'].disable();
    this.addOrEditService.sendDynTableData({ type: 'add', data: this.tableData });
  }

  savebom() {
    this.formData.controls['bomnumber'].enable();
    const addbom = String.Join('/', this.apiConfigService.addBOM);
    const requestObj = { bomHdr: this.formData.value, bomDtl: this.tableData };
    this.apiService.apiPostRequest(addbom, requestObj).subscribe(
      response => {
        const res = response.body;
        if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!this.commonService.checkNullOrUndefined(res.response)) {
            this.alertService.openSnackBar('BOM created Successfully..', Static.Close, SnackBar.success);
          }
          this.reset();
          this.spinner.hide();
        }
      });
  }
}
