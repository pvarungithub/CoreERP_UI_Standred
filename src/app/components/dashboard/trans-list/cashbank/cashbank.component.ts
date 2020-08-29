import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiConfigService } from '../../../../services/api-config.service';
import { String } from 'typescript-string-operations';
import { ApiService } from '../../../../services/api.service';
import { StatusCodes } from '../../../../enums/common/common';
import { isNullOrUndefined } from 'util';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddOrEditService } from '../../comp-list/add-or-edit.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cashbank',
  templateUrl: './cashbank.component.html',
  styleUrls: ['./cashbank.component.scss']
})
export class CashbankComponent implements OnInit {

  formData: FormGroup;

  tableData = [];
  dynTableProps = this.tablePropsFunc()

  companyList = [];
  branchList = [];
  voucherClassList = [];
  voucherTypeList = [];
  transactionTypeList = ['Cash', 'Bank']
  natureofTransactionList = ['Receipts', 'Payment'];
  accountList = [];
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

    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.formDataGroup();
    this.getCompanyList();
    console.log(this.route.snapshot.params.value);
    if(!isNullOrUndefined(this.route.snapshot.params.value)) {
        this.getCashBankDetail(this.route.snapshot.params.value);
    }
  }

  formDataGroup() {
    this.formData = this.formBuilder.group({
      company: [null],
      branch: [null],
      voucherClass: [null],
      voucherType: [null],
      voucherDate: [null],
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
    });
  }

  tablePropsFunc() {
    return {
      tableData: {
        company: {
          value: null, type: 'dropdown', list: this.companyList, id: 'id', text: 'text', disabled: false, displayMul: true
        },
        branch: {
          value: null, type: 'dropdown', list: this.branchList, id: 'id', text: 'text', disabled: false, displayMul: true
        },
        voucherNumber: {
          value: null, type: 'text', disabled: false
        },
        voucherDate: {
          value: null, type: 'datepicker', disabled: false
        },
        postingDate: {
          value: new Date(), type: 'datepicker', disabled: false
        },
        glaccount: {
          value: null, type: 'dropdown', list: this.accountList, id: 'accGroup', text: 'chartAccountName', disabled: false, displayMul: true
        },
        amount: {
          value: null, type: 'number', disabled: false
        },
        taxCode: {
          value: null, type: 'dropdown', list: this.taxCodeList, id: 'code', text: 'description', disabled: false, displayMul: true
        },
        sgstamount: {
          value: null, type: 'number', disabled: true
        },
        cgstamount: {
          value: null, type: 'number', disabled: true
        },
        igstamount: {
          value: null, type: 'number', disabled: true
        },
        ugstamount: {
          value: null, type: 'number', disabled: true
        },
        referenceNo: {
          value: null, type: 'number', disabled: false
        },
        referenceDate: {
          value: new Date(), type: 'datepicker', disabled: false
        },
        functionalDept: {
          value: null, type: 'dropdown', list: this.functionaldeptList, id: 'code', text: 'description', disabled: false, displayMul: true
        },
        profitCenter: {
          value: null, type: 'dropdown', list: this.profitCenterList, id: 'id', text: 'name', disabled: false, displayMul: true
        },
        segment: {
          value: null, type: 'dropdown', list: this.segmentList, id: 'id', text: 'name', disabled: false, displayMul: true
        },
        costCenter: {
          value: null, type: 'dropdown', list: this.costCenterList, id: 'id', text: 'name', disabled: false, displayMul: true
        },
        workBreakStructureElement: {
          value: null, type: 'dropdown', list: this.costCenterList, id: 'id', text: 'name', disabled: false, displayMul: true
        },
        delete: {
          type: 'delete',
          newObject: true
        }
      },
      formControl: {
        company: [null, [Validators.required]]
      }
    }
  }

  getCashBankDetail(val) {
    const cashDetUrl = String.Join('/', this.apiConfigService.getCashBankDetail, val);
    this.apiService.apiGetRequest(cashDetUrl)
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
          this.getGLAccountList();
        });
  }


  getGLAccountList() {
    const glAccUrl = String.Join('/', this.apiConfigService.getGLAccountList);
    this.apiService.apiGetRequest(glAccUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.accountList = res.response['glList'];
            }
          }
          this.getProfitCenterList();
        });
  }

  getProfitCenterList() {
    const profCentUrl = String.Join('/', this.apiConfigService.getProfitCenterList);
    this.apiService.apiGetRequest(profCentUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.profitCenterList = res.response['profitCenterList'];
            }
          }
          this.getSegmentList();
        });
  }

  getSegmentList() {
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
          this.getTaxTransactionList();
        });
  }


  getTaxTransactionList() {
    const taxCodeUrl = String.Join('/', this.apiConfigService.getTaxTransactionList);
    this.apiService.apiGetRequest(taxCodeUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.taxCodeList = res.response['TaxtransactionList'];
              this.dynTableProps = this.tablePropsFunc()
            }
          }
          this.getSegments();
        });
  }


  getSegments() {
    const segUrl = String.Join('/', this.apiConfigService.getSegments);
    this.apiService.apiGetRequest(segUrl)
      .subscribe(
        response => {
          this.spinner.hide();
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.segmentList = res.response['TaxtransactionList'];
              this.getSegments();
            }
          }
        });
  }

  getCostcenters() {
    const costCenUrl = String.Join('/', this.apiConfigService.getCostcenters);
    this.apiService.apiGetRequest(costCenUrl)
      .subscribe(
        response => {
          this.spinner.hide();
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.costCenterList = res.response['TaxtransactionList'];
              this.dynTableProps = this.tablePropsFunc()
            }
          }
        });
  }



  emitColumnChanges(data) {
    this.addOrEditService.sendDynTableData(data);
  }

  emitTableData(data) {
    this.tableData = data;
  }

  save() {
    if (this.tableData.length == 0) {
      return;
    }
    this.saveCashBank();
  }

  reset() {
    this.tableData = [];
    this.formData.reset();
    this.addOrEditService.sendDynTableData(this.tableData);
  }

  saveCashBank() {
    const addCashBank = String.Join('/', this.apiConfigService.addCashBank);
    const requestObj = { cashbankHdr: this.formData.value, cashbankDtl: this.tableData };
    this.apiService.apiPostRequest(addCashBank, requestObj).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            // this.alertService.openSnackBar('Billing Successfully..', Static.Close, SnackBar.success);
          }
          this.reset();
          this.spinner.hide();
        }
      });
  }




}
