import { Injectable } from '@angular/core';
import { CashbankComponent } from './cashbank/cashbank.component';
import { ApiConfigService } from '../../../services/api-config.service';
import { JournalComponent } from './journals/journal.component';
import { MemoinvoiceComponent } from './invoicesmemos/memoinvoice.component';
import { ReceiptspaymentsComponent } from './receiptspayments/receiptspayments.component';
import { PurchasesaleassetComponent } from './purchasesaleasset/purchasesaleasset.component';
import { SaleassetComponent } from './saleasset/saleasset.component';
import { NotFoundComponent } from '../../not-found/not-found.component';
import { BillOfMaterialComponent } from './bom/bom.component'
import { GoodsissueComponent } from './goodsissue/goodsissue.component'
import { MaterialrequisitionComponents } from './materialrequisition/materialrequisition.component'
@Injectable({
  providedIn: 'root'
})
export class TransListService {

  dynamicComp = { component: null, tableUrl: null, list: null, editKey: null, searchCol: null };

  constructor(
    private apiConfigService: ApiConfigService
  ) { }

  getDynComponents(data) {
    switch (data) {
      case 'cashbank': {
        this.dynamicComp.component = CashbankComponent;
        this.dynamicComp.tableUrl = this.apiConfigService.getCashBankMaster;
        this.dynamicComp.list = 'CashBankMasters';
        this.dynamicComp.editKey = 'voucherNumber';
        return this.dynamicComp;
        break;
      }
      case 'journals': {
        this.dynamicComp.component = JournalComponent;
        this.dynamicComp.tableUrl = this.apiConfigService.getJVMaster;
        this.dynamicComp.list = 'jvMasters';
        this.dynamicComp.editKey = 'voucherNumber';
        return this.dynamicComp;
        break;
      }
      case 'invoicesmemos': {
        this.dynamicComp.component = MemoinvoiceComponent;
        this.dynamicComp.tableUrl = this.apiConfigService.getIMMaster;
        this.dynamicComp.list = 'imMasters';
        this.dynamicComp.editKey = 'voucherNumber';
        return this.dynamicComp;
        break;
      }
      case 'receiptspayments': {
        this.dynamicComp.component = ReceiptspaymentsComponent;
        this.dynamicComp.tableUrl = this.apiConfigService.getPaymentsreceiptsMaster;
        this.dynamicComp.list = 'paymentreceiptMasters';
        this.dynamicComp.editKey = 'voucherNumber';
        return this.dynamicComp;
        break;
      }
      case 'purchasesaleasset': {
        this.dynamicComp.component = PurchasesaleassetComponent;
        this.dynamicComp.tableUrl = this.apiConfigService.getPSIMAssetMaster;
        this.dynamicComp.list = 'assetMasters';
        this.dynamicComp.editKey = 'voucherNumber';
        return this.dynamicComp;
        break;
      }
      case 'saleasset': {
        this.dynamicComp.component = SaleassetComponent;
        this.dynamicComp.tableUrl = this.apiConfigService.getAssettransferMaster;
        this.dynamicComp.list = 'assettransferMasters';
        this.dynamicComp.editKey = 'voucherNumber';
        return this.dynamicComp;
        break;
      }
      case 'bom': {
        this.dynamicComp.component = BillOfMaterialComponent;
        this.dynamicComp.tableUrl = this.apiConfigService.getBOMMaster;
        this.dynamicComp.list = 'bomMasters';
        this.dynamicComp.editKey = 'bomnumber';
        return this.dynamicComp;
        break;
      }
      case 'goodsissue': {
        this.dynamicComp.component = GoodsissueComponent;
        this.dynamicComp.tableUrl = this.apiConfigService.getGoodsissueMaster;
        this.dynamicComp.list = 'Goodsissue';
        this.dynamicComp.editKey = 'goodsIssueId';
        return this.dynamicComp;
        break;
      }
      case 'materialrequisition': {
        this.dynamicComp.component = MaterialrequisitionComponents;
        this.dynamicComp.tableUrl = this.apiConfigService.getmreqMaster;
        this.dynamicComp.list = 'materialreq';
        this.dynamicComp.editKey = 'requisitionNmber';
        return this.dynamicComp;
        break;
      }
      default:
        this.dynamicComp.component = NotFoundComponent;
        return this.dynamicComp;
    }

  }
}
