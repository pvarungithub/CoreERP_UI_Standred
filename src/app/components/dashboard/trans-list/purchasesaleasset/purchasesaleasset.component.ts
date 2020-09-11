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
  selector: 'app-purchasesaleasset',
  templateUrl: './purchasesaleasset.component.html',
  styleUrls: ['./purchasesaleasset.component.scss']
})

export class PurchasesaleassetComponent implements OnInit {

  formData: FormGroup;
  routeEdit = '';
  btList = [];
  tableData = [];
  dynTableProps: any;
  ptermsList = [];
  companyList = [];
  branchList = [];
  voucherClassList = [];
  voucherTypeList = [];
  vouchersTypeList = [];
  transactionTypeList = ['Invoice', 'Memo']
  natureofTransactionList = ['Sale', 'Purchase', 'Scrapping', 'Transfer'];
  accountList = [];
  glAccountList = [];
  indicatorList = [{ id: 'Debit', text: 'Debit' }, { id: 'Credit', text: 'Credit' }];
  profitCenterList = [];
  segmentList = [];
  costCenterList = [];
  bpTypeList = [];
  bpList = [];
  taxCodeList = [];
  functionaldeptList = [];
  partyInvoiceNo = [];
  partyInvoiceDate = [];
  grnno = [];
  grndate = [];
  bpgLists: any;
  taxAmount = [];
  totalAmount = [];
  saList = [];
  mamList = [];

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
  onbpChange() {
    this.bpgLists = [];
    if (!isNullOrUndefined(this.formData.get('bpcategory').value)) {
      let data = this.bpTypeList.find(res => res.code == this.formData.get('bpcategory').value);
      this.bpgLists = this.bpList.filter(res => res.bptype == data.code);
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
      partyInvoiceNo: [null, [Validators.required]],
      partyInvoiceDate: [null],
      grnno: [null],
      grndate: [null],
      period: [null],
      voucherNumber: [null, [Validators.required]],
      transactionType: [null, [Validators.required]],
      paymentterms: [null],
      assetTransactionType: [null],
      referenceNumber: [null],
      referenceDate: [null],
      bpcategory: [null, [Validators.required]],
      totalAmount: [null],
      ext: [null],
      partyAccount: [null, [Validators.required]],
      accountingIndicator: [null],
      taxAmount: [null],
      narration: [null],
      status: [null],
      addWho: [null],
      editWho: [null],
      addDate: [null],
      editDate: [null],
      amount: [null]
    });
  }

  tablePropsFunc() {
    return {
      tableData: {
        id: {
          value: 0, type: 'autoInc', width: 10, disabled: true
        },
        mainAssetNo: {
          value: null, type: 'dropdown', list: this.mamList, id: 'id', text: 'text', displayMul: true, width: 100
        },
        subAssetNo: {
          value: null, type: 'dropdown', list: this.saList, id: 'id', text: 'text', displayMul: true, width: 100
        },
        glaccount: {
          value: null, type: 'dropdown', list: this.glAccountList, id: 'id', text: 'text', displayMul: true, width: 100
        },
        accountingIndicator: {
          value: null, type: 'dropdown', list: this.indicatorList, id: 'id', text: 'text', displayMul: false, width: 100
        },
        amount: {
          value: null, type: 'number', width: 100
        },
        taxCode: {
          value: null, type: 'dropdown', list: this.taxCodeList, id: 'taxRateCode', text: 'description', displayMul: false, width: 100
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
          value: null, type: 'number', width: 75
        },
        referenceDate: {
          value: new Date(), type: 'datepicker', width: 100
        },
        functionalDept: {
          value: null, type: 'dropdown', list: this.functionaldeptList, id: 'code', text: 'description', displayMul: false, width: 100
        },
        profitCenter: {
          value: null, type: 'dropdown', list: this.profitCenterList, id: 'id', text: 'text', displayMul: false, width: 100
        },
        segment: {
          value: null, type: 'dropdown', list: this.segmentList, id: 'id', text: 'name', displayMul: false, width: 100
        },
        bttypes: {
          value: null, type: 'dropdown', list: this.btList, id: 'code', text: 'description', displayMul: false, width: 100
        },
        costCenter: {
          value: null, type: 'dropdown', list: this.costCenterList, id: 'id', text: 'text', displayMul: false, width: 100
        },
        narration: {
          value: null, type: 'text', width: 100, maxLength: 50
        },
        workBreakStructureElement: {
          value: null, type: 'dropdown', list: this.costCenterList, id: 'id', text: 'text', displayMul: false, width: 100
        },
        netWork: {
          value: null, type: 'dropdown', list: this.costCenterList, id: 'id', text: 'text', displayMul: false, width: 100
        },
        orderNo: {
          value: null, type: 'dropdown', list: this.costCenterList, id: 'id', text: 'text', displayMul: false, width: 100
        },
        fundCenter: {
          value: null, type: 'dropdown', list: this.costCenterList, id: 'id', text: 'text', displayMul: false, width: 100
        },
        commitment: {
          value: null, type: 'dropdown', list: this.costCenterList, id: 'id', text: 'text', displayMul: false, width: 100
        },
        hsnsac: {
          value: null, type: 'dropdown', list: this.costCenterList, id: 'id', text: 'text', displayMul: false, width: 100
        },
        delete: {
          type: 'delete', width: 10
        }
      },
      formControl: {
        glaccount: [null, [Validators.required]],
        amount: [null, [Validators.required]],
        accountingIndicator: [null, [Validators.required]]
      }
    }
  }
  accountSelect() {
    this.vouchersTypeList = [];
    if (!isNullOrUndefined(this.formData.get('transactionType').value)) {
    }
    this.vouchersTypeList = this.voucherTypeList.filter(resp => resp.voucherNature == this.formData.get('transactionType').value);
  }
  getPSIMAssetDetail(val) {
    const cashDetUrl = String.Join('/', this.apiConfigService.getPSIMAssetDetail, val);
    this.apiService.apiGetRequest(cashDetUrl)
      .subscribe(
        response => {
          this.spinner.hide();
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.formData.setValue(res.response['assetMasters']);
              this.addOrEditService.sendDynTableData({ type: 'add', data: res.response['assetDetail'] });
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
          this.getBusienessTransactionTypeList();
        });
  }
  getBusienessTransactionTypeList() {
    const segUrl = String.Join('/', this.apiConfigService.getBusienessTransactionTypeList);
    this.apiService.apiGetRequest(segUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.btList = res.response['bpttList'];
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
          this.getfunctionaldeptList();
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
          this.getPartnerTypeList();
        });
  }
  getPartnerTypeList() {
    const costCenUrl = String.Join('/', this.apiConfigService.getPartnerTypeList);
    this.apiService.apiGetRequest(costCenUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.bpTypeList = res.response['ptypeList'];

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
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.bpList = res.response['bpList'];

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
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.ptermsList = res.response['ptermsList'];
            }
          }
          this.getmainassetclassTableData();
        });
  }

  getmainassetclassTableData() {
    const getCompanyUrl = String.Join('/', this.apiConfigService.getAssetMasterList);
    this.apiService.apiGetRequest(getCompanyUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.mamList = res.response['mamList'];
            }
          }
          this.getSubassetList();
        });
  }
  getSubassetList() {
    const getplantList = String.Join('/', this.apiConfigService.getSubAssetMasterList);
    this.apiService.apiGetRequest(getplantList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.saList = res.response['saList'];
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
            this.getPSIMAssetDetail(this.routeEdit);
          }
        });
  }

  voucherTypeSelect() {
    const record = this.voucherTypeList.find(res => res.id == this.formData.get('voucherClass').value)
    this.formData.patchValue({
      voucherClass: !isNullOrUndefined(record) ? record.voucherClass : null
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
      const code = row.data[row.index]['taxCode'].list.find(res => res.taxRateCode == row.data[row.index]['taxCode'].value);
      if (!isNullOrUndefined(code)) {
        row.data[row.index].cgstamount.value = (row.data[row.index].amount.value * code.cgst) / 100;
        row.data[row.index].igstamount.value = (row.data[row.index].amount.value * code.igst) / 100;
        row.data[row.index].cgstamount.value = (row.data[row.index].amount.value * code.sgst) / 100;
        row.data[row.index].cgstamount.value = (row.data[row.index].amount.value * code.cgst) / 100;
        this.addOrEditService.sendDynTableData({ type: 'add', data: row.data });
      }
    }
  }

  emitTableData(data) {
    this.tableData = data;
  }

  back() {
    this.router.navigate(['dashboard/transaction/purchasesaleasset'])
  }

  save() {
    if (this.tableData.length == 0) {
      return;
    }
    this.saveAssetSalePurchase();
  }

  return() {
    const addPSIMAsset = String.Join('/', this.apiConfigService.returnCashBank, this.routeEdit);
    this.apiService.apiGetRequest(addPSIMAsset).subscribe(
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
    this.addOrEditService.sendDynTableData({ type: 'edit', data: this.tableData });
  }

  saveAssetSalePurchase() {
    this.formData.controls['voucherNumber'].enable();
    const addPSIMAsset = String.Join('/', this.apiConfigService.addPSIMAsset);
    const requestObj = { imHdr: this.formData.value, imDtl: this.tableData };
    this.apiService.apiPostRequest(addPSIMAsset, requestObj).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            this.alertService.openSnackBar('Asset created Successfully..', Static.Close, SnackBar.success);
          }
          this.reset();
          this.spinner.hide();
        }
      });
  }
}