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
  selector: 'app-receiptspayments',
  templateUrl: './receiptspayments.component.html',
  styleUrls: ['./receiptspayments.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})

export class ReceiptspaymentsComponent implements OnInit {

  formData: FormGroup;
  routeEdit = '';
  bpList = [];
  tableData = [];
  dynTableProps = this.tablePropsFunc();
  bpgLists: any;
  companyList = [];
  branchList = [];
  voucherClassList = [];
  voucherTypeList = [];
  transactionTypeList = ['Cash', 'Bank']
  natureofTransactionList = ['Receipts', 'Payment'];
  accountList = [];
  accountFilterList = [];
  glAccountList = [];
  indicatorList = [{ id: 'Debit', text: 'Debit' }, { id: 'Credit', text: 'Credit' }];
  profitCenterList = [];
  bpTypeList = [];
  segmentList = [];
  costCenterList = [];
  taxCodeList = [];
  functionaldeptList = [];
  purchaseinvoice = [];
  amount = [];
  date = [];
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
    if (!this.commonService.checkNullOrUndefined(this.formData.get('bpcategory').value)) {
      let data = this.bpTypeList.find(res => res.code == this.formData.get('bpcategory').value);
      this.bpgLists = this.bpList.filter(res => res.bptype == data.code);
      this.formData.patchValue({
        partyAccount: this.bpgLists.length ? this.bpgLists[0].id : null
      })
      this.puchaseinvoiceselect();
    }
  }

  ngOnInit() {
    this.formDataGroup();
    this.getCompanyList();
    this.formData.controls['voucherNumber'].disable();
  }

  formDataGroup() {
    this.formData = this.formBuilder.group({
      company: [null, [Validators.required]],
      branch: [null, [Validators.required]],
      voucherClass: [null],
      voucherType: [null, [Validators.required]],
      voucherDate: [new Date()],
      postingDate: [new Date()],
      period: [null],
      voucherNumber: [null, [Validators.required]],
      transactionType: ['Cash', [Validators.required]],
      natureofTransaction: ['Receipts', [Validators.required]],
      account: [null],
      accountingIndicator: [null],
      referenceNo: [null],
      referenceDate: [null],
      profitCenter: [null],
      segment: [null],
      narration: [null],
      addWho: [null],
      editWho: [null],
      addDate: [null],
      editDate: [null],
      amount: [null, [Validators.required]],
      chequeNo: [null],
      chequeDate: [null],
      bpcategory: [null, [Validators.required]],
      partyAccount: [null, [Validators.required]]
    });
    this.checkTransType();
  }


  tablePropsFunc() {
    return {
      tableData: {
        id: {
          value: 0, type: 'autoInc', width: 10, disabled: true, fieldEnable: true
        },
        checkAll:
        {
          value: false, type: 'checkbox'
        },

        partyInvoiceNo: {
          value: null, type: 'number', width: 150, disabled: true
        },
        partyInvoiceDate: {
          // value: null, type: 'dropdown', list: this.date, id: 'date', text: 'date', displayMul: true, width: 100
          value: new Date(), type: 'datepicker', width: 100, disabled: true
        },
        dueDate: {
          value: null, type: 'datepicker', width: 100, disabled: true
        },
        totalAmount: {
          //value: null, type: 'dropdown', list: this.amount, id: 'amount', text: 'amount', displayMul: true, width: 100
          value: 0, type: 'number', width: 75, disabled: true
        },
        memoAmount: {
          value: 0, type: 'number', width: 75, disabled: true
        },
        clearedAmount: {
          value: 0, type: 'number', width: 75, disabled: true
        },
        balanceDue: {
          value: 0, type: 'number', width: 75, disabled: true
        },
        notDue: {
          value: 0, type: 'number', width: 75, disabled: true, fieldEnable: true
        },
        adjustmentAmount: {
          value: 0, type: 'number', width: 75, disabled: true, fieldEnable: true
        },
        discount: {
          value: 0, type: 'number', width: 75, disabled: true
        },
        writeOffAmount: {
          value: 0, type: 'number', width: 75, disabled: true, fieldEnable: true
        },
        partyAccount: {
          value: 0, type: 'text', width: 75, disabled: true
        },
        paymentterms: {
          value: 0, type: 'text', width: 75, disabled: true
        },
        postingDate: {
          value: 0, type: 'text', width: 75, disabled: true
        },
        discountGl: {
          value: null, type: 'dropdown', list: this.glAccountList, id: 'id', text: 'text', displayMul: true, width: 100, disabled: true, fieldEnable: true
        },
        writeOffGl: {
          value: null, type: 'dropdown', list: this.glAccountList, id: 'id', text: 'text', displayMul: true, width: 100, disabled: true, fieldEnable: true
        },

        narration: {
          value: null, type: 'text', width: 150, disabled: true, fieldEnable: true
        },
        // delete: {
        //   type: 'delete', width: 10
        // }
      },
      formControl: {}
    }
  }

  puchaseinvoiceselect() {
    let data = [];
    let newData = [];
    if (!this.commonService.checkNullOrUndefined(this.formData.get('partyAccount').value)) {
      data = this.functionaldeptList.filter(resp => resp.partyAccount == this.formData.get('partyAccount').value);
    }
    if (data.length) {
      console.log(data, this.tablePropsFunc());
      data.forEach((res, index) => {
        newData.push(this.tablePropsFunc().tableData);
        newData[index].dueDate.value = res.dueDate;
        newData[index].partyAccount.value = res.partyAccount;
        newData[index].partyInvoiceNo.value = res.partyInvoiceNo;
        newData[index].paymentterms.value = res.paymentterms;
        newData[index].postingDate.value = res.postingDate;
        newData[index].totalAmount.value = res.totalAmount;
      })
    }
    //
    this.addOrEditService.sendDynTableData({ type: 'add', data: newData, removeEmptyRow: 0 });
  }

  getreceiptpaymentDetail(val) {
    const cashDetUrl = String.Join('/', this.apiConfigService.getPaymentsReceiptsDetail, val);
    this.apiService.apiGetRequest(cashDetUrl)
      .subscribe(
        response => {
          this.spinner.hide();
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              //console.log( res.response['paymentreceiptMasters']);
              //console.log( res.response['paymentreceiptDetail']);
              this.formData.setValue(res.response['paymentreceiptMasters']);
              this.addOrEditService.sendDynTableData({ type: 'edit', data: res.response['paymentreceiptDetail'] });
              this.formData.disable();
              this.accountSelect();
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
              this.formData.patchValue({
                branch: this.branchList.length ? this.branchList[0].id : null
              })
            }
          }
          this.getTransVoucherClassList();
        });
  }

  getTransVoucherClassList() {
    const voucherClassList = String.Join('/', this.apiConfigService.getvocherclassList);
    this.apiService.apiGetRequest(voucherClassList)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.voucherClassList = res.response['vcList'];
            }
          }
          this.getVoucherTypes();
        });
  }

  getVoucherTypes() {
    const voucherTypes = String.Join('/', this.apiConfigService.getVoucherTypesList);
    this.apiService.apiGetRequest(voucherTypes)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.voucherTypeList = res.response['vouchertypeList'];
              this.formData.patchValue({
                voucherType: this.voucherTypeList.length ? this.voucherTypeList[0].voucherTypeId : null
              })
            }
          }
          this.getGLAccountsList();
        });
  }

  getGLAccountsList() {
    const glAccUrl = String.Join('/', this.apiConfigService.getGLAccountsList);
    this.apiService.apiGetRequest(glAccUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.accountFilterList = res.response['glList'];
              this.glAccountList = res.response['glList'].filter(resp => resp.taxCategory != 'Cash' || resp.taxCategory != 'Bank' || resp.taxCategory != 'Control Account');
            }
          }
          this.getfunctionaldeptList();
        });
  }

  accountSelect() {
    this.accountList = [];
    if (!this.commonService.checkNullOrUndefined(this.formData.get('transactionType').value)) {
      this.accountList = this.accountFilterList.filter(resp => resp.taxCategory == this.formData.get('transactionType').value);
    }
  }

  checkTransType() {
    this.formData.patchValue({
      chequeNo: null,
      chequeDate: null
    })
    if (this.formData.get('transactionType').value == 'Cash') {
      this.formData.controls['chequeNo'].disable();
      this.formData.controls['chequeDate'].disable();
    } else {
      this.formData.controls['chequeNo'].enable();
      this.formData.controls['chequeDate'].enable();
    }
  }



  getfunctionaldeptList() {
    const taxCodeUrl = String.Join('/', this.apiConfigService.getpurchaseinvoiceList);
    this.apiService.apiGetRequest(taxCodeUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.functionaldeptList = res.response['purchaseinvoiceList'];
            }
          }
          this.getTaxRatesList();
        });
  }

  getTaxRatesList() {
    const taxCodeUrl = String.Join('/', this.apiConfigService.getTaxRatesList);
    this.apiService.apiGetRequest(taxCodeUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.taxCodeList = res.response['TaxratesList'];
            }
          }
          this.getProfitCentersList();
        });
  }

  getProfitCentersList() {
    const profCentUrl = String.Join('/', this.apiConfigService.getProfitCentersList);
    this.apiService.apiGetRequest(profCentUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.profitCenterList = res.response['profitCenterList'];
            }
          }
          this.getSegments();
        });
  }

  getSegments() {
    const segUrl = String.Join('/', this.apiConfigService.getSegmentList);
    this.apiService.apiGetRequest(segUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.segmentList = res.response['segmentList'];
            }
          }
          this.getbpList();
        });
  }


  getbpList() {
    const costCenUrl = String.Join('/', this.apiConfigService.getBPList);
    this.apiService.apiGetRequest(costCenUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.bpList = res.response['bpList'];
            }
          }
          this.getPartnerTypeList();
        });
  }

  getPartnerTypeList() {
    const costCenUrl = String.Join('/', this.apiConfigService.getPartnerTypeList);
    this.apiService.apiGetRequest(costCenUrl)
      .subscribe(
        response => {
          this.spinner.hide();
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.bpTypeList = res.response['ptypeList'];
              this.formData.patchValue({
                bpcategory: this.bpTypeList.length ? this.bpTypeList[0].code : null
              })
              this.onbpChange();
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
          if (this.routeEdit != '') {
            this.getreceiptpaymentDetail(this.routeEdit);
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

  voucherNoCalculate() {
    this.formData.patchValue({
      voucherNumber: null
    })
    if (!this.commonService.checkNullOrUndefined(this.formData.get('voucherType').value)) {
      const voucherNoUrl = String.Join('/', this.apiConfigService.getVoucherNumber, this.formData.get('voucherType').value);
      this.apiService.apiGetRequest(voucherNoUrl)
        .subscribe(
          response => {
            this.spinner.hide();
            const res = response.body;
            if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
              if (!this.commonService.checkNullOrUndefined(res.response)) {
                this.formData.patchValue({
                  voucherNumber: !this.commonService.checkNullOrUndefined(res.response['VoucherNumber']) ? res.response['VoucherNumber'] : null
                })
              }
            }
          });
    }
  }

  emitColumnChanges(data) {
    this.spinner.show();
    if (data.column == 'adjustmentAmount') {
      this.loopTableData(data);
      this.checkAjectAmount(true)
    }
    if (data.column == 'checkAll') {
      if(data.data[data.index].checkAll.value) {
        this.getDiscount(data);
      } else {
        data.data[data.index].discount.value = 0;
        this.addOrEditService.sendDynTableData({ type: 'add', data: data.data });
      }
    }

  }

  loopTableData(row) {
    const dublicateRow = [...row.data];
    let flag = false;
    // let checkAjectAmount = 0;
    // for (let r = 0; r < row.data.length; r++) {
    // if (row.column == 'adjustmentAmount' && r == row.index) {
    if (row.column == 'adjustmentAmount') {
      if (+row.data[row.index].adjustmentAmount.value > +row.data[row.index].totalAmount.value) {
        this.alertService.openSnackBar(`AdjustmentAmount can't be more than totalAmount`, Static.Close, SnackBar.error);
        row.data[row.index].adjustmentAmount.value = 0;
        flag = true;
        // break;
      }
      // checkAjectAmount = checkAjectAmount + (+row.data[r].adjustmentAmount.value);
      // if (checkAjectAmount == +this.formData.get('amount').value) {
      //   this.alertService.openSnackBar(`AdjustmentAmount can't be same as total amount`, Static.Close, SnackBar.error);
      //   row.data[row.index].adjustmentAmount.value = 0;
      //   flag = true;
      //   break;
      // }
    }

    // }
    if (flag) {
      this.spinner.show();
      this.addOrEditService.sendDynTableData({ type: 'add', data: dublicateRow });
    }
  }

  getDiscount(row) {
    const getDiscountUrl = String.Join('/', this.apiConfigService.getDiscount);
    const requestObj = {
      dueDate: row.data[row.index].dueDate.value, partyAccount: row.data[row.index].partyAccount.value,
      partyInvoiceNo: row.data[row.index].partyInvoiceNo.value, paymentterms: row.data[row.index].paymentterms.value,
      postingDate: row.data[row.index].postingDate.value, totalAmount: row.data[row.index].totalAmount.value
    };
    this.apiService.apiPostRequest(getDiscountUrl, requestObj)
      .subscribe(
        response => {
          this.spinner.hide();
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              row.data[row.index].discount.value = res.response['discount']
              this.addOrEditService.sendDynTableData({ type: 'add', data: row.data });
            }
          }
          if (this.routeEdit != '') {
            this.getreceiptpaymentDetail(this.routeEdit);
          }
        });
  }

  emitTableData(data) {
    this.tableData = data;
    console.log(this.tableData)
  }

  back() {
    this.router.navigate(['dashboard/transaction/receiptspayments'])
  }

  checkAjectAmount(flag = false) {
    let adjustmentAmount = 0;
    if (this.tableData.length) {
      this.tableData.forEach(res => {
        if (res.adjustmentAmount) {
          adjustmentAmount = adjustmentAmount + (+res.adjustmentAmount)
        }
      });
      if (adjustmentAmount == +this.formData.get('amount').value && !this.commonService.checkNullOrUndefined(adjustmentAmount) && flag) {
        this.alertService.openSnackBar(`AdjustmentAmount can't be same as total amount`, Static.Close, SnackBar.error);
      }
      return (adjustmentAmount == +this.formData.get('amount').value && !this.commonService.checkNullOrUndefined(adjustmentAmount)) ? false : true;
    }
    return true;
  }

  save() {
    if (this.tableData.length == 0) {
      return;
    }
    this.savePaymentsReceipts();
  }

  return() {
    const addCashBank = String.Join('/', this.apiConfigService.returnCashBank, this.routeEdit);
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
    this.formData.controls['voucherNumber'].disable();
    this.addOrEditService.sendDynTableData({ type: 'add', data: this.tableData });
  }

  savePaymentsReceipts() {
    debugger;
    this.formData.controls['voucherNumber'].enable();
    const addCashBank = String.Join('/', this.apiConfigService.addPaymentsReceipts);
    const requestObj = { pcbHdr: this.formData.value, pcbDtl: this.tableData };
    this.apiService.apiPostRequest(addCashBank, requestObj).subscribe(
      response => {
        const res = response.body;
        if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!this.commonService.checkNullOrUndefined(res.response)) {
            this.alertService.openSnackBar('Payments Receipts created Successfully..', Static.Close, SnackBar.success);
          }
          this.reset();
          this.spinner.hide();
        }
      });
  }
}
