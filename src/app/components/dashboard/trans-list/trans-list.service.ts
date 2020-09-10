import { Injectable } from '@angular/core';
import { CashbankComponent } from './cashbank/cashbank.component';
import { ApiConfigService } from '../../../services/api-config.service';
import { JournalComponent } from './journals/journal.component';
import { MemoinvoiceComponent } from './invoicesmemos/memoinvoice.component';
import { ReceiptspaymentsComponent } from './receiptspayments/receiptspayments.component';
import { PurchasesaleassetComponent } from './purchasesaleasset/purchasesaleasset.component';
import { SaleassetComponent } from './saleasset/saleasset.component';

@Injectable({
  providedIn: 'root'
})
export class TransListService {

  dynamicComp = { component: null, tableUrl: null, list: null, editKey: null };

  constructor(
    private apiConfigService: ApiConfigService
  ) { }

  getDynComponents(data) {

    switch (data) {
      case 'cashbank':
        this.dynamicComp.component = CashbankComponent;
        this.dynamicComp.tableUrl = this.apiConfigService.getCashBankMaster;
        this.dynamicComp.list = 'CashBankMasters';
        this.dynamicComp.editKey = 'voucherNumber';
        return this.dynamicComp;
        break;
      default:
    }

    switch (data) {
      case 'journals':
        this.dynamicComp.component = JournalComponent;
        this.dynamicComp.tableUrl = this.apiConfigService.getJVMaster;
        this.dynamicComp.list = 'jvMasters';
        this.dynamicComp.editKey = 'voucherNumber';
        return this.dynamicComp;
        break;
      default:
    }
    switch (data) {
      case 'invoicesmemos':
        this.dynamicComp.component = MemoinvoiceComponent;
        this.dynamicComp.tableUrl = this.apiConfigService.getIMMaster;
        this.dynamicComp.list = 'imMasters';
        this.dynamicComp.editKey = 'voucherNumber';
        return this.dynamicComp;
        break;
      default:
    }
    switch (data) {
      case 'receiptspayments':
        this.dynamicComp.component = ReceiptspaymentsComponent;
        this.dynamicComp.tableUrl = this.apiConfigService.getPaymentsreceiptsMaster;
        this.dynamicComp.list = 'paymentreceiptMasters';
        this.dynamicComp.editKey = 'voucherNumber';
        return this.dynamicComp;
        break;
      default:
    }
    switch (data) {
      case 'purchasesaleasset':
        this.dynamicComp.component = PurchasesaleassetComponent;
        this.dynamicComp.tableUrl = this.apiConfigService.getPSIMAssetMaster;
        this.dynamicComp.list = 'assetMasters';
        this.dynamicComp.editKey = 'voucherNumber';
        return this.dynamicComp;
        break;
      default:
    }
    switch (data) {
      case 'saleasset':
        this.dynamicComp.component = SaleassetComponent;
        this.dynamicComp.tableUrl = this.apiConfigService.getAssettransferMaster;
        this.dynamicComp.list = 'assettransferMasters';
        this.dynamicComp.editKey = 'voucherNumber';
        return this.dynamicComp;
        break;
      default:
    }
  }
}
