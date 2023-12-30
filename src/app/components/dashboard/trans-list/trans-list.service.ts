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
import { SourceOfSupplyComponent } from './source-of-supply/source-of-supply.component'
import { PurchasingComponent } from './purcahserequisition/purchasing.component'
import { QuotationSupplierComponent } from './quotationsupplier/quotationsupplier.component'
import { QuotationAnalysisComponent } from './quotationanalysis/quotationanalysis.component'
import { PurchaseOrderComponent } from './purcahseorder/purcahseorder.component'
import { ReceiptOfGoodsComponent } from './goodsreceipts/receipt-of-goods.component'
import { InspectioncheckComponent } from './inspectioncheck/inspectioncheck.component'
import { SampleRequisitionFormComponent } from './samplerequisitionform/samplerequisitionform.component'
import { SampleServiceComponent } from './sampleservice/sampleservice.component';
import { SalesorderComponent } from './salesorder/salesorder.component';
import { SalesInvoiceComponent, StandardRateComponent } from '../comp-list';
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
        this.dynamicComp.editKey = 'saleOrderNumber';
        return this.dynamicComp;
        break;
      }
      case 'materialrequisition': {
        this.dynamicComp.component = MaterialrequisitionComponents;
        this.dynamicComp.tableUrl = this.apiConfigService.getProductionissue;
        this.dynamicComp.list = 'Productionissue';
        this.dynamicComp.editKey = 'saleOrderNumber';
        return this.dynamicComp;
        break;
      }
      case 'purcahserequisition': {
        this.dynamicComp.component = PurchasingComponent;
        this.dynamicComp.tableUrl = this.apiConfigService.getpurchasereqMaster;
        this.dynamicComp.list = 'purchasereq';
        this.dynamicComp.editKey = 'requisitionNumber';
        return this.dynamicComp;
        break;
      }
      case 'sourceofsupply': {
        this.dynamicComp.component = SourceOfSupplyComponent;
        this.dynamicComp.tableUrl = this.apiConfigService.getsupplierreqMaster;
        this.dynamicComp.list = 'sorcesupply';
        this.dynamicComp.editKey = 'supplierCode';
        return this.dynamicComp;
        break;
      }
      case 'supplierquotation': {
        this.dynamicComp.component = QuotationSupplierComponent;
        this.dynamicComp.tableUrl = this.apiConfigService.getsupplierqsMaster;
        this.dynamicComp.list = 'quotationsupplier';
        this.dynamicComp.editKey = 'quotationNumber';
        return this.dynamicComp;
        break;
      }
      case 'quotationanalysis': {
        this.dynamicComp.component = QuotationAnalysisComponent;
        this.dynamicComp.tableUrl = this.apiConfigService.getquotationanalysisMaster;
        this.dynamicComp.list = 'quotationanalysis';
        this.dynamicComp.editKey = 'quotationNumber';
        return this.dynamicComp;
        break;
      }
      case 'purchaseorder': {
        this.dynamicComp.component = PurchaseOrderComponent;
        this.dynamicComp.tableUrl = this.apiConfigService.getpurchaseorderMaster;
        this.dynamicComp.list = 'podetails';
        this.dynamicComp.editKey = 'purchaseOrderNumber';
        return this.dynamicComp;
        break;
      }
      case 'goodsreceipts': {
        this.dynamicComp.component = ReceiptOfGoodsComponent;
        this.dynamicComp.tableUrl = this.apiConfigService.getgoodsreceipt;
        this.dynamicComp.list = 'grdetails';
        this.dynamicComp.editKey = 'purchaseOrderNo';
        return this.dynamicComp;
        break;
      }
      case 'inspectioncheck': {
        this.dynamicComp.component = InspectioncheckComponent;
        this.dynamicComp.tableUrl = this.apiConfigService.getProductionissue;
        this.dynamicComp.list = 'Productionissue';
        this.dynamicComp.editKey = 'saleOrderNumber';
        return this.dynamicComp;
        break;
      }
      case 'standardrateoutput': {
        this.dynamicComp.component = StandardRateComponent;
        this.dynamicComp.tableUrl = this.apiConfigService.getStandardRateList;
        this.dynamicComp.list = 'sropList';
        this.dynamicComp.editKey = 'code';
        return this.dynamicComp;
        break;
      }
      case 'samplerequisitionform': {
        this.dynamicComp.component = SampleRequisitionFormComponent;
        this.dynamicComp.tableUrl = this.apiConfigService.getCashBankMaster;
        this.dynamicComp.list = 'CashBankMasters';
        this.dynamicComp.editKey = 'voucherNumber';
        return this.dynamicComp;
        break;
      }
      case 'sampleservice': {
        this.dynamicComp.component = SampleServiceComponent;
        this.dynamicComp.tableUrl = this.apiConfigService.getCashBankMaster;
        this.dynamicComp.list = 'CashBankMasters';
        this.dynamicComp.editKey = 'voucherNumber';
        return this.dynamicComp;
        break;
      }
      case 'saleorder': {
        this.dynamicComp.component = SalesorderComponent;
        this.dynamicComp.tableUrl = this.apiConfigService.getSaleOrder;
        this.dynamicComp.list = 'saleOrderMaster';
        this.dynamicComp.editKey = 'saleOrderNo';
        return this.dynamicComp;
        break;
      }
      case 'salesinvoice': {
        this.dynamicComp.component = SalesInvoiceComponent;
        this.dynamicComp.tableUrl = this.apiConfigService.getInvoiceList;
        this.dynamicComp.list = 'InvoiceList';
        this.dynamicComp.editKey = 'saleOrderNo';
        return this.dynamicComp;
      }
      default:
        this.dynamicComp.component = NotFoundComponent;
        return this.dynamicComp;
    }

  }
}
