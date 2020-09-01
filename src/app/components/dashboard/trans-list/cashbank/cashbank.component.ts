import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiConfigService } from '../../../../services/api-config.service';
import { String } from 'typescript-string-operations';
import { ApiService } from '../../../../services/api.service';
import { StatusCodes, SnackBar } from '../../../../enums/common/common';
import { isNullOrUndefined } from 'util';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddOrEditService } from '../../comp-list/add-or-edit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Static } from '../../../../enums/common/static';
import { AlertService } from '../../../../services/alert.service';

@Component({
  selector: 'app-cashbank',
  templateUrl: './cashbank.component.html',
  styleUrls: ['./cashbank.component.scss']
})

export class CashbankComponent implements OnInit {

  formData: FormGroup;
  routeEdit = '';

  tableData = [];
  dynTableProps = this.tablePropsFunc()

  companyList = [];
  branchList = [];
  voucherClassList = [];
  voucherTypeList = [];
  transactionTypeList = ['Cash', 'Bank']
  natureofTransactionList = ['Receipts', 'Payment'];
  accountList = [];
  glAccountList = [];
  indicatorList = ['Debit', 'Credit'];
  profitCenterList = [];
  segmentList = [];
  costCenterList = [];
  taxCodeList = [];
  functionaldeptList = [];

  constructor(
    private formBuilder: FormBuilder,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    private addOrEditService: AddOrEditService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    public route: ActivatedRoute,
    private router: Router
  ) {
    if (!isNullOrUndefined(this.route.snapshot.params.value)) {
      this.routeEdit = this.route.snapshot.params.value;
    }
  }

  ngOnInit() {
    this.formDataGroup();
    this.getCompanyList();
    this.getfunctionaldeptList();
    this.formData.controls['voucherNumber'].disable();
  }

  formDataGroup() {
    this.formData = this.formBuilder.group({
      company: [null],
      branch: [null],
      voucherClass: [null],
      voucherType: [null],
      voucherDate: [new Date()],
      postingDate: [null],
      period: [null],
      voucherNumber: [null],
      transactionType: [null],
      natureofTransaction: [null],
      account: [null],
      indicator: [null],
      referenceNo: [null],
      referenceDate: [null],
      profitCenter: [null],
      segment: [null],
      narration: [null],
      accounting: [null],
      ext: [null]
    });
  }

  tablePropsFunc() {
    return {
      tableData: {
        glaccount: {
          value: null, type: 'dropdown', list: this.glAccountList, id: 'id', text: 'text', displayMul: true, width: 150
        },
        amount: {
          value: 0, type: 'number', width: 75
        },
        taxCode: {
          value: null, type: 'dropdown', list: this.taxCodeList, id: 'taxRateCode', text: 'description', displayMul: false, width: 150
        },
        sgstamount: {
          value: null, type: 'number', disabled: true, width: 75
        },
        cgstamount: {
          value: null, type: 'number', disabled: true, width: 75
        },
        igstamount: {
          value: null, type: 'number', disabled: true, width: 75
        },
        ugstamount: {
          value: null, type: 'number', disabled: true, width: 75
        },
        referenceNo: {
          value: null, type: 'number', width: 130
        },
        referenceDate: {
          value: new Date(), type: 'datepicker', width: 160
        },
        functionalDept: {
          value: null, type: 'dropdown', list: this.functionaldeptList, id: 'code', text: 'description', displayMul: false, width: 150
        },
        profitCenter: {
          value: null, type: 'dropdown', list: this.profitCenterList, id: 'id', text: 'text', displayMul: false, width: 150
        },
        segment: {
          value: null, type: 'dropdown', list: this.segmentList, id: 'id', text: 'name', displayMul: false, width: 150
        },
        costCenter: {
          value: null, type: 'dropdown', list: this.costCenterList, id: 'id', text: 'text', displayMul: false, width: 150
        },
        narration: {
          value: null, type: 'text', width: 150
        },
        delete: {
          type: 'delete', width: 10
        }
      },
      formControl: {
        glaccount: [null, [Validators.required]]
      }
    }
  }

  getCashBankDetail(val) {
    const cashDetUrl = String.Join('/', this.apiConfigService.getCashBankDetail, val);
    this.apiService.apiGetRequest(cashDetUrl)
      .subscribe(
        response => {
          this.spinner.hide();
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.formData.setValue(res.response['CashBankMasters']);
              this.addOrEditService.sendDynTableData(res.response['CashBankDetail']);
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
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.companyList = res.response['companiesList'];
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
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.branchList = res.response['branchsList'];
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
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
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
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.voucherTypeList = res.response['vouchertypeList'];
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
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.accountList = res.response['glList'].filter(resp => resp.taxCategory == 'Cash' || resp.taxCategory == 'Bank');
              this.glAccountList = res.response['glList'].filter(resp => resp.taxCategory != 'Cash' || resp.taxCategory != 'Bank' || resp.taxCategory != 'Control Account');
            }
          }
          this.getTaxRatesList();
        });
  }

  getfunctionaldeptList() {
    const taxCodeUrl = String.Join('/', this.apiConfigService.getfunctionaldeptList);
    this.apiService.apiGetRequest(taxCodeUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.functionaldeptList = res.response['fdeptList'];
            }
          }
        });
  }

  getTaxRatesList() {
    const taxCodeUrl = String.Join('/', this.apiConfigService.getTaxRatesList);
    this.apiService.apiGetRequest(taxCodeUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
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
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
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
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.segmentList = res.response['segmentList'];
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
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.costCenterList = res.response['costcenterList'];

            }
          }
          this.dynTableProps = this.tablePropsFunc();
          if (this.routeEdit != '') {
            this.getCashBankDetail(this.routeEdit);
          }
        });
  }

  voucherTypeSelect() {
    const record = this.voucherTypeList.find(res => res.id == this.formData.get('voucherType').value)
    this.formData.patchValue({
      voucherClass: !isNullOrUndefined(record) ? record.voucherClassName : null
    })
  }

  voucherNoCalculate() {
    this.formData.patchValue({
      voucherNumber: null
    })
    if (!isNullOrUndefined(this.formData.get('voucherType').value)) {
      const voucherNoUrl = String.Join('/', this.apiConfigService.getVoucherNumber, this.formData.get('voucherType').value);
      this.apiService.apiGetRequest(voucherNoUrl)
        .subscribe(
          response => {
            this.spinner.hide();
            const res = response.body;
            if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
              if (!isNullOrUndefined(res.response)) {
                this.formData.patchValue({
                  voucherNumber: !isNullOrUndefined(res.response['VoucherNumber']) ? res.response['VoucherNumber'] : null
                })
              }
            }
          });
    }
  }

  emitColumnChanges(data) {
    this.calculateAmount(data)
  }

  calculateAmount(row) {
    if (row.column == 'taxCode' || row.column == 'amount') {
      let code = row.value['taxCode'].list.find(res => res.taxRateCode == row.value['taxCode'].value)
      row.value.cgstamount.value = (row.value.amount.value * code.cgst) / 100
      row.value.igstamount.value = (row.value.amount.value * code.igst) / 100
      row.value.cgstamount.value = (row.value.amount.value * code.sgst) / 100
      row.value.cgstamount.value = (row.value.amount.value * code.cgst) / 100
    }
    this.addOrEditService.sendDynTableData(row);
  }

  emitTableData(data) {
    this.tableData = data;
  }

  back() {
    this.router.navigate(['dashboard/transaction/cashbank'])
  }

  save() {
    if (this.tableData.length == 0) {
      return;
    }
    this.saveCashBank();
  }

  return() {
    const addCashBank = String.Join('/', this.apiConfigService.returnCashBank, this.routeEdit);
    this.apiService.apiGetRequest(addCashBank).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
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
    this.addOrEditService.sendDynTableData(this.tableData);
  }

  saveCashBank() {
    this.formData.controls['voucherNumber'].enable();
    const addCashBank = String.Join('/', this.apiConfigService.addCashBank);
    const requestObj = { cashbankHdr: this.formData.value, cashbankDtl: this.tableData };
    this.apiService.apiPostRequest(addCashBank, requestObj).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            this.alertService.openSnackBar('Cash bank created Successfully..', Static.Close, SnackBar.success);
          }
          this.reset();
          this.spinner.hide();
        }
      });
  }
}