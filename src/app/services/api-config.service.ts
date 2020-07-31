import { Injectable } from '@angular/core';
import { RuntimeConfigService } from './runtime-config.service';


const user = JSON.parse(localStorage.getItem('user'))

@Injectable({
   providedIn: 'root'
})
export class ApiConfigService {

   constructor(private environment: RuntimeConfigService) {
      // environment.loadRuntimeConfig()
   }

   // login Url
   loginUrl = `${this.environment.runtimeConfig.serverUrl}Auth/login`;
   logoutUrl = `${this.environment.runtimeConfig.serverUrl}Auth/logout`;
   shiftTerminate = `${this.environment.runtimeConfig.serverUrl}Auth/ShiftTerminate`;
   shiftStart = `${this.environment.runtimeConfig.serverUrl}Auth/ShiftStart`;
   getBranchesForUser = `${this.environment.runtimeConfig.serverUrl}Auth/GetBranchesForUser`;
   getComponentInfo = `${this.environment.runtimeConfig.serverUrl}Settings/GetComponentInfo`;

   // ******************************** sales *********************************
   getInvoiceList = `${this.environment.runtimeConfig.serverUrl}sales/Billing/GetInvoiceList`;
   getCashPartyAccountList = `${this.environment.runtimeConfig.serverUrl}sales/Billing/GetCashPartyAccountList`;
   getBillingBranchesList = `${this.environment.runtimeConfig.serverUrl}sales/Billing/GetBranchesList`;
   getCashPartyAccount = `${this.environment.runtimeConfig.serverUrl}sales/Billing/GetCashPartyAccount`;
   getmemberNames = `${this.environment.runtimeConfig.serverUrl}sales/Billing/GetmemberNames`;
   getAccountBalance = `${this.environment.runtimeConfig.serverUrl}sales/Billing/GetAccountBalance`;
   generateBillNo = `${this.environment.runtimeConfig.serverUrl}sales/Billing/GenerateBillNo`;
   getProductByProductCode = `${this.environment.runtimeConfig.serverUrl}sales/Billing/GetProductByProductCode`;
   getProductByProductName = `${this.environment.runtimeConfig.serverUrl}sales/Billing/GetProductByProductName`;
   getBillingDetailsRcd = `${this.environment.runtimeConfig.serverUrl}sales/Billing/GetBillingDetailsRcd`;
   registerInvoice = `${this.environment.runtimeConfig.serverUrl}sales/Billing/RegisterInvoice`;
   getStateList = `${this.environment.runtimeConfig.serverUrl}sales/Billing/GeStateList`;
   getSelectedState = `${this.environment.runtimeConfig.serverUrl}sales/Billing/GeSelectedState`;
   getVechiels = `${this.environment.runtimeConfig.serverUrl}sales/Billing/GetVechiels`;
   getInvoiceDeatilList = `${this.environment.runtimeConfig.serverUrl}sales/Billing/GetInvoiceDeatilList`;
   getPupms = `${this.environment.runtimeConfig.serverUrl}sales/Billing/GetPupms`;
   generateSalesReturnInvNo = `${this.environment.runtimeConfig.serverUrl}transaction/SalesReturn/GenerateSalesReturnInvNo`;
   registerInvoiceReturn = `${this.environment.runtimeConfig.serverUrl}transaction/SalesReturn/RegisterInvoiceReturn`;
   getInvoiceReturnDetail = `${this.environment.runtimeConfig.serverUrl}transaction/SalesReturn/GetInvoiceReturnDetail`;
   getInvoiceGetInvoiceReturnList = `${this.environment.runtimeConfig.serverUrl}transaction/SalesReturn/GetInvoiceReturnList`;
   getmemberNamesByCode = `${this.environment.runtimeConfig.serverUrl}sales/Billing/GetmemberNamesByCode`;
  


   //  stock Transfer
   generateStockTranfNo = `${this.environment.runtimeConfig.serverUrl}transaction/StockTransfer/GenerateStockTranfNo`;
   geProductsByName = `${this.environment.runtimeConfig.serverUrl}transaction/StockTransfer/GeProductsByName`;
   geProductsByCode = `${this.environment.runtimeConfig.serverUrl}transaction/StockTransfer/GeProductsByCode`;
   getStockTransferDetailsSection = `${this.environment.runtimeConfig.serverUrl}transaction/StockTransfer/GetStockTransferDetailsSection`;
   registerStockTransfer = `${this.environment.runtimeConfig.serverUrl}transaction/StockTransfer/RegisterStockTransfer`;
   getStockTransferList = `${this.environment.runtimeConfig.serverUrl}transaction/StockTransfer/GetStockTransferList`;
   getStockTransferDetilsaRecords = `${this.environment.runtimeConfig.serverUrl}transaction/StockTransfer/GetStockTransferDetilsaRecords`;

   //  purchase Transfer
   getPurchasePupms = `${this.environment.runtimeConfig.serverUrl}Purchase/purchases/GetPupms`;
   generatePurchaseInvNo = `${this.environment.runtimeConfig.serverUrl}Purchase/purchases/GeneratePurchaseInvNo`;
   getProductDeatilsSectionRcd = `${this.environment.runtimeConfig.serverUrl}Purchase/purchases/GetProductDeatilsSectionRcd`;
   registerPurchase = `${this.environment.runtimeConfig.serverUrl}Purchase/purchases/RegisterPurchase`;
   getPurchaseInvoiceList = `${this.environment.runtimeConfig.serverUrl}Purchase/purchases/GetInvoiceList`;
   getPurchaseInvoiceDeatilList = `${this.environment.runtimeConfig.serverUrl}Purchase/purchases/GetInvoiceDeatilList`;
   getPurchaseStateList = `${this.environment.runtimeConfig.serverUrl}Purchase/purchases/GeStateList`;
   getPurchaseSelectedState = `${this.environment.runtimeConfig.serverUrl}Purchase/purchases/GeSelectedState`;
   getPurchaseCashPartyAccount = `${this.environment.runtimeConfig.serverUrl}Purchase/purchases/GetCashPartyAccount`;
   getTankas = `${this.environment.runtimeConfig.serverUrl}Purchase/purchases/GetTankas`;
   getPurchasePurchaseReturnInvNo = `${this.environment.runtimeConfig.serverUrl}purchase/PurchaseReturn/GeneratePurchaseReturnInvNo`;
   getPurchaseRegisterPurchaseReturn = `${this.environment.runtimeConfig.serverUrl}purchase/PurchaseReturn/RegisterPurchaseReturn`;
   getPurchaseReturns = `${this.environment.runtimeConfig.serverUrl}purchase/PurchaseReturn/GetPurchaseReturns`;
   getPurchaseReturnsDetails = `${this.environment.runtimeConfig.serverUrl}purchase/PurchaseReturn/GetPurchaseReturnsDetails`;

   

   // *******************************   Transaction *****************************************

   // Cash Payment
   getCashPaymentList = `${this.environment.runtimeConfig.serverUrl}transactions/CashPayment/GetCashpaymentList`;
   getAccountLedgerListByName = `${this.environment.runtimeConfig.serverUrl}transactions/CashPayment/GetAccountLedgerListByName`;
   getCashPaymentBranchesList = `${this.environment.runtimeConfig.serverUrl}transactions/CashPayment/GetBranchesList`;
   getCashPaymentVoucherNo = `${this.environment.runtimeConfig.serverUrl}transactions/CashPayment/GetVoucherNo`;
   getAccountLedgerList = `${this.environment.runtimeConfig.serverUrl}transactions/CashPayment/GetAccountLedgerList`;
   registerCashPayment = `${this.environment.runtimeConfig.serverUrl}transactions/CashPayment/RegisterCashPayment`;
   getCashPaymentDetailsList = `${this.environment.runtimeConfig.serverUrl}transactions/CashPayment/GetCashPaymentDetailsList`;


   // Cash Receipt
   getCashReceiptList = `${this.environment.runtimeConfig.serverUrl}transactions/CashReceipt/GetCashreceiptList`;
   getCRAccountLedgerListByName = `${this.environment.runtimeConfig.serverUrl}transactions/CashReceipt/GetAccountLedgerListByName`;
   getCashReceiptBranchesList = `${this.environment.runtimeConfig.serverUrl}transactions/CashReceipt/GetBranchesList`;
   getCashReceiptVoucherNo = `${this.environment.runtimeConfig.serverUrl}transactions/CashReceipt/GetVoucherNo`;
   getCashRAccountLedgerList = `${this.environment.runtimeConfig.serverUrl}transactions/CashReceipt/GetAccountLedgerList`;
   registerCashReceipt = `${this.environment.runtimeConfig.serverUrl}transactions/CashReceipt/RegisterCashReceipt`;
   getCashReceiptDetailsList = `${this.environment.runtimeConfig.serverUrl}transactions/CashReceipt/GetCashReceiptDetailsList`;

   // Bank Payment
   getBankpaymentList = `${this.environment.runtimeConfig.serverUrl}transactions/BankPayment/GetBankpaymentList`;
   getBPAccountLedgerListByName = `${this.environment.runtimeConfig.serverUrl}transactions/BankPayment/GetAccountLedgerListByName`;
   getBankPaymentBranchesList = `${this.environment.runtimeConfig.serverUrl}transactions/BankPayment/GetBranchesList`;
   getBankPaymentVoucherNo = `${this.environment.runtimeConfig.serverUrl}transactions/BankPayment/GetVoucherNo`;
   getBPAccountLedgerList = `${this.environment.runtimeConfig.serverUrl}transactions/BankPayment/GetAccountLedgerList`;
   getBankPAccountLedgerList = `${this.environment.runtimeConfig.serverUrl}transactions/BankPayment/GetAccountLedger`;
   registerBankPayment = `${this.environment.runtimeConfig.serverUrl}transactions/BankPayment/RegisterBankPayment`;
   getBankPaymentDetailsList = `${this.environment.runtimeConfig.serverUrl}transactions/BankPayment/GetBankPaymentDetailsList`;

   // Bank Receipt
   getBankreceiptList = `${this.environment.runtimeConfig.serverUrl}transactions/BankReceipt/GetBankreceiptList`;
   getBRAccountLedgerListByName = `${this.environment.runtimeConfig.serverUrl}transactions/BankReceipt/GetAccountLedgerListByName`;
   getBankReceiptBranchesList = `${this.environment.runtimeConfig.serverUrl}transactions/BankReceipt/GetBranchesList`;
   getBankReceiptVoucherNo = `${this.environment.runtimeConfig.serverUrl}transactions/BankReceipt/GetVoucherNo`;
   getBRAccountLedgerList = `${this.environment.runtimeConfig.serverUrl}transactions/BankReceipt/GetAccountLedgerList`;
   getBankRAccountLedgerList = `${this.environment.runtimeConfig.serverUrl}transactions/BankReceipt/GetAccountLedger`;
   registerBankReceipt = `${this.environment.runtimeConfig.serverUrl}transactions/BankReceipt/RegisterBankReceipt`;
   getBankReceiptDetailsList = `${this.environment.runtimeConfig.serverUrl}transactions/BankReceipt/GetBankReceiptDetailsList`;

   // Journal Voucher
   getJournalvoucherList = `${this.environment.runtimeConfig.serverUrl}transactions/JournalVoucher/GetJournalvoucherList`;
   getJVAccountLedgerListByName = `${this.environment.runtimeConfig.serverUrl}transactions/JournalVoucher/GetAccountLedgerListByName`;
   getJournalVoucherBranchesList = `${this.environment.runtimeConfig.serverUrl}transactions/JournalVoucher/GetBranchesList`;
   getJournalVoucherNo = `${this.environment.runtimeConfig.serverUrl}transactions/JournalVoucher/GetVoucherNo`;
   getJournalVoucherAccountLedgerList = `${this.environment.runtimeConfig.serverUrl}transactions/JournalVoucher/GetAccountLedgerList`;
   getJVAccountLedgerList = `${this.environment.runtimeConfig.serverUrl}transactions/JournalVoucher/GetAccountLedger`;
   registerJournalVoucher = `${this.environment.runtimeConfig.serverUrl}transactions/JournalVoucher/RegisterJournalVoucher`;
   getJournalVoucherDetailsList = `${this.environment.runtimeConfig.serverUrl}transactions/JournalVoucher/GetJournalVoucherDetailsList`;


  //Stockissues
  getbranchesnosList=`${this.environment.runtimeConfig.serverUrl}Transactions/Stockissues/GetbranchesnosList`;
  getStockissuesDeatilListLoad = `${this.environment.runtimeConfig.serverUrl}Transactions/Stockissues/GetInvoiceDetails`;
  gettingtobranchesList = `${this.environment.runtimeConfig.serverUrl}Transactions/Stockissues/GettobranchesList`;
  getStockissuesList = `${this.environment.runtimeConfig.serverUrl}Transactions/Stockissues/GetStockissuesList`;
  getStockissuesnosList = `${this.environment.runtimeConfig.serverUrl}Transactions/Stockissues/GetStackissueNo`;
  registerStockissues = `${this.environment.runtimeConfig.serverUrl}Transactions/Stockissues/RegisterStockissues`;
  GetProductLists = `${this.environment.runtimeConfig.serverUrl}Transactions/Stockissues/GetProductLists`;
  GetBranchesList = `${this.environment.runtimeConfig.serverUrl}Transactions/Stockissues/GetBranchesList`;
  getStockissuesDeatilList = `${this.environment.runtimeConfig.serverUrl}Transactions/Stockissues/GetStockissuesDeatilList`;
  GetToBranchesList = `${this.environment.runtimeConfig.serverUrl}Transactions/Stockissues/GetToBranchesList`;

   //Stockreceipts
  getStockreceiptsDeatilListLoad = `${this.environment.runtimeConfig.serverUrl}Transactions/Stockreceipt/GetInvoiceDetails`;
  gettingtobranchesListforstockreceipt = `${this.environment.runtimeConfig.serverUrl}Transactions/Stockreceipt/GettobranchesList`;
  getStockreceiptsList = `${this.environment.runtimeConfig.serverUrl}Transactions/Stockreceipt/GetStockreceiptsList`;
  getStockissuesreceiptnosList = `${this.environment.runtimeConfig.serverUrl}Transactions/Stockreceipt/GetReceiptNo`;
  GetProductListsforStockreceipts = `${this.environment.runtimeConfig.serverUrl}Transactions/Stockreceipt/GetProductLists`;
  registerStockreceipts = `${this.environment.runtimeConfig.serverUrl}Transactions/Stockreceipt/RegisterStockreceipts`;
  getStockreceiptDeatilList = `${this.environment.runtimeConfig.serverUrl}Transactions/Stockreceipt/GetStockreceiptDeatilList`;
  GetToBranchesStockreceiptsList = `${this.environment.runtimeConfig.serverUrl}Transactions/Stockreceipt/GetToBranchesList`;

  //Stockshorts
  getStockshortDeatilListLoad = `${this.environment.runtimeConfig.serverUrl}Transactions/Stockshort/GetInvoiceDetails`;
  GetCostCentersList = `${this.environment.runtimeConfig.serverUrl}Transactions/Stockshort/GetCostCentersList`;
  getstockshortvochernosList = `${this.environment.runtimeConfig.serverUrl}Transactions/Stockshort/GetstockshortVoucherNo`;
  GetProductListsforStockshortsList = `${this.environment.runtimeConfig.serverUrl}Transactions/Stockshort/GetProductLists`;
  registerStockshorts =`${this.environment.runtimeConfig.serverUrl}Transactions/Stockshort/RegisterStockshort`;
  getStockshortList = `${this.environment.runtimeConfig.serverUrl}Transactions/Stockshort/GetStockshortsList`;
  getStockshortsDeatilList = `${this.environment.runtimeConfig.serverUrl}Transactions/Stockshort/GetStockshortsDeatilList`;

  //oilconversion
  getoilcnvsnDeatilListLoad = `${this.environment.runtimeConfig.serverUrl}Transactions/Oilconversion/GetInvoiceDetails`;
  getOilconversionList = `${this.environment.runtimeConfig.serverUrl}Transactions/Oilconversion/GetOilconversionList`;
  getoilconversionvocherNo = `${this.environment.runtimeConfig.serverUrl}Transactions/Oilconversion/GetoilconversionVoucherNo`;
  GetProductListsforoilconversionList = `${this.environment.runtimeConfig.serverUrl}Transactions/Oilconversion/GetProductLists`;
  registerOilconversion = `${this.environment.runtimeConfig.serverUrl}Transactions/Oilconversion/RegisterOilconversion`;
  getOilconversionDeatilList = `${this.environment.runtimeConfig.serverUrl}Transactions/Oilconversion/GetOilconversionsDeatilList`;

 //Packageconversion
  GetproductNames = `${this.environment.runtimeConfig.serverUrl}Transactions/PackageConversion/GetproductNames`;
  getInputcodeproductList = `${this.environment.runtimeConfig.serverUrl}Transactions/PackageConversion/GetInputcodeList`;
  getPackageconversionList = `${this.environment.runtimeConfig.serverUrl}Transactions/PackageConversion/GetPackageConversionList`;
 registerPackageconversion = `${this.environment.runtimeConfig.serverUrl}Transactions/PackageConversion/RegisterPackageConversion`;
  updatePackageconversions = `${this.environment.runtimeConfig.serverUrl}Transactions/PackageConversion/UpdatePackageConversionList`;
 deletePackageconversions = `${this.environment.runtimeConfig.serverUrl}Transactions/PackageConversion/DeletePackageConversion`;

 // Stock Excess
  getStockexcessList = `${this.environment.runtimeConfig.serverUrl}transactions/StockExcess/GetStockexcessList`;
  getStockExcessBranchesList = `${this.environment.runtimeConfig.serverUrl}transactions/StockExcess/GetBranchesList`;
  getstockexcessNo = `${this.environment.runtimeConfig.serverUrl}transactions/StockExcess/GetstockexcessNo`;
  getStockExcessCostCentersList = `${this.environment.runtimeConfig.serverUrl}transactions/StockExcess/GetCostCentersList`;
  getProductListsforStockexcessList = `${this.environment.runtimeConfig.serverUrl}transactions/StockExcess/GetProductLists`;
  registerStockexcess = `${this.environment.runtimeConfig.serverUrl}transactions/StockExcess/RegisterStockexcess`;
  getStockExcessDetailsList = `${this.environment.runtimeConfig.serverUrl}transactions/StockExcess/GetStockExcessDetailsList`;

  // Meter Reading
  getMeterReadingList = `${this.environment.runtimeConfig.serverUrl}transactions/MeterReading/GetMeterReadingList`;
  getMeterReadingBranchesList = `${this.environment.runtimeConfig.serverUrl}transactions/MeterReading/GetBranchesList`;
  getPump = `${this.environment.runtimeConfig.serverUrl}transactions/MeterReading/GetPump`;
  getShift = `${this.environment.runtimeConfig.serverUrl}transactions/MeterReading/GetShift`;
  registerMeterReading = `${this.environment.runtimeConfig.serverUrl}transactions/MeterReading/RegisterMeterReading`;
  updateMeterReading = `${this.environment.runtimeConfig.serverUrl}transactions/MeterReading/UpdateMeterReading`;
  deleteMeterReading = `${this.environment.runtimeConfig.serverUrl}transactions/MeterReading/deleteMeterReading`;
  getOBFromPump = `${this.environment.runtimeConfig.serverUrl}transactions/MeterReading/GetOBFromPump`;

   // *******************************  End Transaction *****************************************


   // ******************************** GeneralLedger *********************************
//Ledger
getLedgerList = `${this.environment.runtimeConfig.serverUrl}gl/Ledger/GetLedgerList`;
registerLedger = `${this.environment.runtimeConfig.serverUrl}gl/Ledger/RegisterLedger`;
updateLedger = `${this.environment.runtimeConfig.serverUrl}gl/Ledger/UpdateLedger`;
deleteLedger = `${this.environment.runtimeConfig.serverUrl}gl/Ledger/DeletLedger`;

//open Ledger
getOpenLedgerList = `${this.environment.runtimeConfig.serverUrl}gl/OpenLedger/GetOpenLedgerList`;
registerOpenLedger = `${this.environment.runtimeConfig.serverUrl}gl/OpenLedger/RegisterOpenLedger`;
updateOpenLedger = `${this.environment.runtimeConfig.serverUrl}gl/OpenLedger/UpdateOpenLedgerList`;
deleteOpenLedger = `${this.environment.runtimeConfig.serverUrl}gl/OpenLedger/DeleteOpenLedgerList`;

 //vocherclass
 getvocherclassList = `${this.environment.runtimeConfig.serverUrl}gl/VoucherClass /GetVoucherClassList`;
 registerVoucherClass = `${this.environment.runtimeConfig.serverUrl}gl/VoucherClass /RegisterVoucherClass`;
 updateVoucherClass = `${this.environment.runtimeConfig.serverUrl}gl/VoucherClass /UpdateVoucherClass`;
 deleteVoucherClass = `${this.environment.runtimeConfig.serverUrl}gl/VoucherClass /DeleteVoucherClass`;
 
   // AccountsGroup //
   getAccountsGroupList = `${this.environment.runtimeConfig.serverUrl}gl/AccGroup/GetAccountGroupList`;
   registerGlaccGroup = `${this.environment.runtimeConfig.serverUrl}gl/AccGroup/RegisterGlaccGroup`;
   updateAccountGroup = `${this.environment.runtimeConfig.serverUrl}gl/AccGroup/UpdateAccountGroup`;
   deleteAccountGroup = `${this.environment.runtimeConfig.serverUrl}gl/AccGroup/DeleteAccountGroup`;

   // SubGroup //
   getGLAccountSubGroupList = `${this.environment.runtimeConfig.serverUrl}gl/GLAccSubGroup/GetGLAccountSubGroupList`;
   registerGlaccSubGroup = `${this.environment.runtimeConfig.serverUrl}gl/GLAccSubGroup/RegisterGlaccSubGroup`;
   updateGLAccSubGroup = `${this.environment.runtimeConfig.serverUrl}gl/GLAccSubGroup/UpdateGLAccSubGroup`;
   deleteAccountSubGroup = `${this.environment.runtimeConfig.serverUrl}gl/GLAccSubGroup/DeleteAccountSubGroup`;
   getAccgrpList = `${this.environment.runtimeConfig.serverUrl}gl/GLAccSubGroup/GetGLAccountGroupList`;

   // UnderSubGroup //
   getGLUnderSubGroupList = `${this.environment.runtimeConfig.serverUrl}gl/GLAccUnderSubGroup/GetTblAccountGroupList`;
   getAccountNamelist = `${this.environment.runtimeConfig.serverUrl}gl/GLAccUnderSubGroup/GetAccountNamelist`;
   getGLUnderGroupList = `${this.environment.runtimeConfig.serverUrl}/gl/GLAccUnderSubGroup/GetAccountGrouplist`;
   registerGLUnderSubGroup = `${this.environment.runtimeConfig.serverUrl}/gl/GLAccUnderSubGroup/RegisterTblAccGroup`;
   updateGLAccUnderSubGroup = `${this.environment.runtimeConfig.serverUrl}gl/GLAccUnderSubGroup/UpdateTblAccountGroup`;
   deleteGLAccUnderSubGroup = `${this.environment.runtimeConfig.serverUrl}gl/GLAccUnderSubGroup/DeleteTblAccountGroup`;
   getglAccgrpList = `${this.environment.runtimeConfig.serverUrl}gl/GLAccUnderSubGroup/GetGLAccountGrouplist`;
   getAccountSubGrouplist = `${this.environment.runtimeConfig.serverUrl}gl/GLAccUnderSubGroup/GetAccountSubGrouplist`;

   // GL Accounts //
   getTblAccountLedgerList = `${this.environment.runtimeConfig.serverUrl}gl/AccountLedger/GetTblAccountLedgerList`;
   registerTblAccLedger = `${this.environment.runtimeConfig.serverUrl}gl/AccountLedger/RegisterTblAccLedger`;
   updateTblAccountLedger = `${this.environment.runtimeConfig.serverUrl}gl/AccountLedger/UpdateTblAccountLedger`;
   deleteTblAccountLedger = `${this.environment.runtimeConfig.serverUrl}gl/AccountLedger/DeleteTblAccountLedger`;
   getAccountGrouplist = `${this.environment.runtimeConfig.serverUrl}gl/AccountLedger/GetAccountGrouplist`;
   getAccountTypelist = `${this.environment.runtimeConfig.serverUrl}gl/AccountLedger/GetAccountTypelist`;
   getPaymentTypelist = `${this.environment.runtimeConfig.serverUrl}gl/AccountLedger/GetPaymentTypelist`;
   getPricingLevellist = `${this.environment.runtimeConfig.serverUrl}gl/AccountLedger/GetPricingLevellist`;

   // GL Subcode //
   getGLSubCodeList = `${this.environment.runtimeConfig.serverUrl}gl/GLSubCode/GetGLSubCodeList`;
   registerGlsubCode = `${this.environment.runtimeConfig.serverUrl}gl/GLSubCode/RegisterGlsubCode`;
   updateGLSubCode = `${this.environment.runtimeConfig.serverUrl}gl/GLSubCode/UpdateGLSubCode`;
   deleteGLSubCode = `${this.environment.runtimeConfig.serverUrl}gl/GLSubCode/DeleteGLSubCode`;
   getGLSubCodeAccountsList = `${this.environment.runtimeConfig.serverUrl}gl/GLSubCode/GetGLAccountsList`;

   // Tax Integration //
  getTaxintigrationList = `${this.environment.runtimeConfig.serverUrl}gl/TaxIntegration/GetTaxintigrationList`;
  registerTaxIntegration = `${this.environment.runtimeConfig.serverUrl}gl/TaxIntegration/GetTaxintigrationList`;
  updateTaxIntegration = `${this.environment.runtimeConfig.serverUrl}gl/TaxIntegration/GetTaxintigrationList`;
  deleteTaxIntegration = `${this.environment.runtimeConfig.serverUrl}gl/TaxIntegration/DeleteTaxIntegration`;
  getTaxCodesList = `${this.environment.runtimeConfig.serverUrl}gl/TaxIntegration/GetTaxCodesList`;
  getGLTaxAccountList = `${this.environment.runtimeConfig.serverUrl}gl/TaxIntegration/GetGLTaxAccountList`;
   

   // Cash Acc To Branches //
  getAsignCashAccBranchList = `${this.environment.runtimeConfig.serverUrl}gl/AsignmentCashAccBranch/GetAsignCashAccBranchList`;
  registerAsigCashAccBranch = `${this.environment.runtimeConfig.serverUrl}gl/AsignmentCashAccBranch/RegisterAsigCashAccBranch`;
  updateaAignmentCashAccBranch = `${this.environment.runtimeConfig.serverUrl}gl/AsignmentCashAccBranch/UpdateaAignmentCashAccBranch`;
  deleteAignmentCashAccBranch = `${this.environment.runtimeConfig.serverUrl}gl/AsignmentCashAccBranch/DeleteAignmentCashAccBranch`;
  getCashAccBranchesList = `${this.environment.runtimeConfig.serverUrl}gl/AsignmentCashAccBranch/GetBranchesList`;
  getBankAccounts = `${this.environment.runtimeConfig.serverUrl}gl/AsignmentCashAccBranch/GetBankAccounts`;
  getCashAccounts = `${this.environment.runtimeConfig.serverUrl}gl/AsignmentCashAccBranch/GetCashAccounts`;

   // Acc To Acc Class //
  getAsigAcctoAccclassList = `${this.environment.runtimeConfig.serverUrl}gl/AsignmentAcctoAccClass/GetAsigAcctoAccclassList`;
  registerAsigAcctoAccClass = `${this.environment.runtimeConfig.serverUrl}gl/AsignmentAcctoAccClass/RegisterAsigAcctoAccClass`;
  updateAccToAccClass = `${this.environment.runtimeConfig.serverUrl}gl/AsignmentAcctoAccClass/UpdateAccToAccClass`;
  deleteAccToAccClass = `${this.environment.runtimeConfig.serverUrl}gl/AsignmentAcctoAccClass/DeleteAccToAccClass`;
  getAccountingClass = `${this.environment.runtimeConfig.serverUrl}gl/AsignmentAcctoAccClass/GetAccountingClass`;
  getMatTranTypes = `${this.environment.runtimeConfig.serverUrl}gl/AsignmentAcctoAccClass/GetMatTranTypes`;
  getSalesGlAccounts = `${this.environment.runtimeConfig.serverUrl}gl/AsignmentAcctoAccClass/GetSalesGlAccounts`;
  getPurchaseGlAccounts = `${this.environment.runtimeConfig.serverUrl}gl/AsignmentAcctoAccClass/GetPurchaseGlAccounts`;
  getInventoryGlAccounts = `${this.environment.runtimeConfig.serverUrl}gl/AsignmentAcctoAccClass/GetInventoryGlAccounts`;
   

   // Voucher Types //
   getVoucherTypeList = `${this.environment.runtimeConfig.serverUrl}gl/VoucherType/GetVoucherTypeList`;
   registerVoucherTypes = `${this.environment.runtimeConfig.serverUrl}gl/VoucherType/RegisterVoucherTypes`;
   updateVoucherTypes = `${this.environment.runtimeConfig.serverUrl}gl/VoucherType/UpdateVoucherTypes`;
   deleteVoucherTypes = `${this.environment.runtimeConfig.serverUrl}gl/VoucherType/DeleteVoucherTypes`;
  getVoucherClassList = `${this.environment.runtimeConfig.serverUrl}gl/VoucherType/GetVoucherClassList`;

   getCompaniesList = `${this.environment.runtimeConfig.serverUrl}gl/VoucherType/GetCompaniesList`;
   getVoucherBranchesList = `${this.environment.runtimeConfig.serverUrl}gl/VoucherType/GetBranchesList`;

   // ******************************** END GeneralLedger *********************************

   // *******************************  Inventory *****************************************

   // BrandModel
  
   getBrandModelList = `${this.environment.runtimeConfig.serverUrl}Inventory/BrandModel/GetBrandModelList`;
   registerBrandModelList = `${this.environment.runtimeConfig.serverUrl}Inventory/BrandModel/RegisterBrandModel`;
   updateBrandModelList = `${this.environment.runtimeConfig.serverUrl}Inventory/BrandModel/UpdateBrandModel`;
   deleteBrandModelList = `${this.environment.runtimeConfig.serverUrl}Inventory/BrandModel/DeleteBrandModel`;
   getInputTypeCodeList = `${this.environment.runtimeConfig.serverUrl}Inventory/BrandModel/GetInputTaxes`;
   getOutputTypeCodeList = `${this.environment.runtimeConfig.serverUrl}Inventory/BrandModel/GetOutPutTaxes`;

   // Sizes
   getSizesList = `${this.environment.runtimeConfig.serverUrl}Inventory/Sizes/GetAllSizes`;
   registerSizesList = `${this.environment.runtimeConfig.serverUrl}Inventory/Sizes/RegisterSizes`;
   updateSizesList = `${this.environment.runtimeConfig.serverUrl}Inventory/Sizes/UpdateSize`;
   deleteSizesList = `${this.environment.runtimeConfig.serverUrl}Inventory/Sizes/DeleteSize`;

   // AccountingClass
   getAccountingClassList = `${this.environment.runtimeConfig.serverUrl}Inventory/AccountingClass/GetAllAccountingClass`;
   registerAccountingClassList = `${this.environment.runtimeConfig.serverUrl}Inventory/AccountingClass/RegisterAccountingClass`;
   updateAccountingClassList = `${this.environment.runtimeConfig.serverUrl}Inventory/AccountingClass/UpdateAccountingClass`;
   deleteAccountingClassList = `${this.environment.runtimeConfig.serverUrl}Inventory/AccountingClass/DeleteAccountingClass`;

   // Brand
   getBrandList = `${this.environment.runtimeConfig.serverUrl}Inventory/Brand/GetBbrandList`;
   registerBrandList = `${this.environment.runtimeConfig.serverUrl}Inventory/Brand/RegisterBrand`;
   updateBrandList = `${this.environment.runtimeConfig.serverUrl}Inventory/Brand/UpdateBrand`;
   deleteBrandList = `${this.environment.runtimeConfig.serverUrl}Inventory/Brand/DeleteBrand`;
   getCompanyList = `${this.environment.runtimeConfig.serverUrl}Inventory/ItemMaster/GetCompanysList`;

   // NoAssignment
 
   getNoAssignmentList = `${this.environment.runtimeConfig.serverUrl}Inventory/NoAssignment/GetNoAssignmentList`;
   registerNoAssignmentList = `${this.environment.runtimeConfig.serverUrl}Inventory/NoAssignment/RegisterNoAssignment`;
   updateNoAssignmentList = `${this.environment.runtimeConfig.serverUrl}Inventory/NoAssignment/UpdateNoAssignment`;
   deleteNoAssignmentList = `${this.environment.runtimeConfig.serverUrl}Inventory/NoAssignment/DeleteNoAssignment`;

   // MaterialGroups
 
   getMaterialGroupsList = `${this.environment.runtimeConfig.serverUrl}Inventory/MaterialGroup/GetAllMaterialGroup`;
   registerMaterialGroupsList = `${this.environment.runtimeConfig.serverUrl}Inventory/MaterialGroup/RegisterMaterialGroup`;
   updateMaterialGroupsList = `${this.environment.runtimeConfig.serverUrl}Inventory/MaterialGroup/UpdateMaterialGroup`;
   deleteMaterialGroupsList = `${this.environment.runtimeConfig.serverUrl}Inventory/MaterialGroup/DeleteMaterialGroup`;

   // ******************************* End  Inventory *****************************************


   // ******************************* Start  master *****************************************

   // company
  getlanguageList = `${this.environment.runtimeConfig.serverUrl}masters/Company/GetLanguageList`;
  getRegionsList = `${this.environment.runtimeConfig.serverUrl}masters/Company/GetRegionList`;
  getCountrysList =`${this.environment.runtimeConfig.serverUrl}masters/Company/GetCountrysList`;
  getcurrencyList = `${this.environment.runtimeConfig.serverUrl}masters/Company/GetCurrencyList`;
  getstatesList = `${this.environment.runtimeConfig.serverUrl}masters/Company/GetStatesList`;
   getCompanysList = `${this.environment.runtimeConfig.serverUrl}masters/Company/GetCompanysList`;
   registerCompany = `${this.environment.runtimeConfig.serverUrl}masters/Company/RegisterCompany`;
   updateCompany = `${this.environment.runtimeConfig.serverUrl}masters/Company/UpdateCompany`;
   deleteCompany = `${this.environment.runtimeConfig.serverUrl}masters/Company/DeleteCompany`;

  // department
  getdepartmentlist = `${this.environment.runtimeConfig.serverUrl}masters/Department/getdepartmentlist`;
  registerdepartment = `${this.environment.runtimeConfig.serverUrl}masters/Department/registerdepartment`;
  updatedepartment = `${this.environment.runtimeConfig.serverUrl}masters/Department/updatedepartment`;
  deletedepartment = `${this.environment.runtimeConfig.serverUrl}masters/Department/deletedepartment`;
  
  //Fdepartment
  getfunctionaldeptList = `${this.environment.runtimeConfig.serverUrl}masters/FunctionalDepartment/GetFunctionalDepartment`;
  registerfunctionaldept = `${this.environment.runtimeConfig.serverUrl}masters/FunctionalDepartment/RegisterFunctionalDepartment`;
  updatefunctionaldept = `${this.environment.runtimeConfig.serverUrl}masters/FunctionalDepartment/UpdateFunctionalDepartment`;
  deletefunctionaldept = `${this.environment.runtimeConfig.serverUrl}masters/FunctionalDepartment/DeleteFunctionalDepartment`;
   
  //plant
  getplantList = `${this.environment.runtimeConfig.serverUrl}masters/Plant/GetPlant`;
  registerPlant = `${this.environment.runtimeConfig.serverUrl}masters/Plant/RegisterPlant`;
  updatePlant = `${this.environment.runtimeConfig.serverUrl}masters/Plant/UpdatePlant`;
  deletePlant = `${this.environment.runtimeConfig.serverUrl}masters/Plant/DeletePlant`;

  //location  
   getPlantList = `${this.environment.runtimeConfig.serverUrl}masters/Location/GetPlantList`;
   getlocationList = `${this.environment.runtimeConfig.serverUrl}masters/Location/GetLocationList`;
   registerLocation = `${this.environment.runtimeConfig.serverUrl}masters/Location/RegisterLocation`;
   updateLocation = `${this.environment.runtimeConfig.serverUrl}masters/Location/UpdateLocation`;
   deleteLocation = `${this.environment.runtimeConfig.serverUrl}masters/Location/DeleteLocation`;

 //SalesDepartment
 getsalesdepartmentList = `${this.environment.runtimeConfig.serverUrl}masters/SalesDepartment/GetSalesDepartment`;
 registerSalesDepartment = `${this.environment.runtimeConfig.serverUrl}masters/SalesDepartment/RegisterSalesDepartment`;
 updateSalesDepartment = `${this.environment.runtimeConfig.serverUrl}masters/SalesDepartment/UpdateSalesDepartment`;
 deleteSalesDepartment = `${this.environment.runtimeConfig.serverUrl}masters/SalesDepartment/DeleteSalesDepartment`;

 //salesgroup
 getsalesgroupList = `${this.environment.runtimeConfig.serverUrl}masters/SalesGroup/GetSalesGroupList`;
 registerSalesGroup = `${this.environment.runtimeConfig.serverUrl}masters/SalesGroup/RegisterSalesGroup`;
 updateSalesGroup = `${this.environment.runtimeConfig.serverUrl}masters/SalesGroup/UpdateSalesGroup`;
 deleteSalesGroup = `${this.environment.runtimeConfig.serverUrl}masters/SalesGroup/DeleteSalesGroup`;

  ///MaintenanceArea
  getmaintenanceareaList = `${this.environment.runtimeConfig.serverUrl}masters/MaintenanceArea/GetMaintenanceArea`;
  registerMaintenanceArea = `${this.environment.runtimeConfig.serverUrl}masters/MaintenanceArea/RegisterMaintenanceArea`;
  updateMaintenanceArea = `${this.environment.runtimeConfig.serverUrl}masters/MaintenanceArea/UpdateMaintenanceArea`;
  deleteMaintenanceArea = `${this.environment.runtimeConfig.serverUrl}masters/MaintenanceArea/DeleteMaintenanceArea`;
  
     //Purchasedepartment
     getpurchasedeptList = `${this.environment.runtimeConfig.serverUrl}masters/PurchaseDepartment/GetPurchaseDepartment`;
     registerPurchaseDepartment = `${this.environment.runtimeConfig.serverUrl}masters/PurchaseDepartment/RegisterPurchaseDepartment`;
     updatePurchaseDepartment = `${this.environment.runtimeConfig.serverUrl}masters/PurchaseDepartment/UpdatePurchaseDepartment`;
     deletePurchaseDepartment = `${this.environment.runtimeConfig.serverUrl}masters/PurchaseDepartment/DeletePurchaseDepartment`;

    ///StorageLocation
    getstoragelocationList = `${this.environment.runtimeConfig.serverUrl}masters/StorageLocation/GetStorageLocation`;
    registerStorageLocation = `${this.environment.runtimeConfig.serverUrl}masters/StorageLocation/RegisterStorageLocation`;
    updateStorageLocation = `${this.environment.runtimeConfig.serverUrl}masters/StorageLocation/UpdateStorageLocation`;
    deleteStorageLocation = `${this.environment.runtimeConfig.serverUrl}masters/StorageLocation/DeleteStorageLocation`;    

  //salesoffice
  getsalesOfficeList = `${this.environment.runtimeConfig.serverUrl}masters/SalesOffice/GetSalesOfficeList`;
  registerSalesOffice = `${this.environment.runtimeConfig.serverUrl}masters/SalesOffice/RegisterSalesOffice`;
  updateSalesOffice = `${this.environment.runtimeConfig.serverUrl}masters/SalesOffice/UpdateSalesOffice`;
  deleteSalesOffice = `${this.environment.runtimeConfig.serverUrl}masters/SalesOffice/DeleteSalesOffice`;
  //erpuser
  getrolelist = `${this.environment.runtimeConfig.serverUrl}masters/UserCreation/GetRoleList`;
  geterpuserList = `${this.environment.runtimeConfig.serverUrl}masters/UserCreation/GetUserCreation`;
  registerUserCreation = `${this.environment.runtimeConfig.serverUrl}masters/UserCreation/RegisterUserCreation`;
  updateUserCreation = `${this.environment.runtimeConfig.serverUrl}masters/UserCreation/UpdateUserCreation`;
  deleteUserCreation = `${this.environment.runtimeConfig.serverUrl}masters/UserCreation/DeleteUserCreation`;

 //distributionchannel
getdistributionchannelList = `${this.environment.runtimeConfig.serverUrl}masters/DistributionChannel/GetDistributionChannelList`;
registerDistributionChannel = `${this.environment.runtimeConfig.serverUrl}masters/DistributionChannel/RegisterDistributionChannel`;
updateDistributionChannel = `${this.environment.runtimeConfig.serverUrl}masters/DistributionChannel/UpdateDistributionChannel`;
deleteDistributionChannel = `${this.environment.runtimeConfig.serverUrl}masters/DistributionChannel/DeleteDistributionChannel`;
  // --- Branches
   GetEmployeesList = `${this.environment.runtimeConfig.serverUrl}masters/Branches/GetEmployeesList`;
   getBranchesList = `${this.environment.runtimeConfig.serverUrl}masters/Branches/GetBranchesList`;
   registerBranch = `${this.environment.runtimeConfig.serverUrl}masters/Branches/RegisterBranch`;
   updateBranch = `${this.environment.runtimeConfig.serverUrl}masters/Branches/UpdateBranch`;
   deleteBranches = `${this.environment.runtimeConfig.serverUrl}masters/Branches/DeleteBranches`;
  // --- designation

  getDesignationsList = `${this.environment.runtimeConfig.serverUrl}masters/Designation/GetDesignationsList`;
  registerDesignations = `${this.environment.runtimeConfig.serverUrl}masters/Designation/RegisterDesignation`;
  updateDesignations = `${this.environment.runtimeConfig.serverUrl}masters/Designation/UpdateDesignation`;
  deleteDesignations = `${this.environment.runtimeConfig.serverUrl}masters/Designation/DeleteDesignation`;

   // --- division
  getDivisionsList = `${this.environment.runtimeConfig.serverUrl}masters/Division/GetDivisionsList`;
  registerDivision = `${this.environment.runtimeConfig.serverUrl}masters/Division/RegisterDivision`;
  updateDivision = `${this.environment.runtimeConfig.serverUrl}masters/Division/UpdateDivision`;
  deleteDivision = `${this.environment.runtimeConfig.serverUrl}masters/Division/DeleteDivision`;
  

   // --- Tax Master
   GetTaxTypes = `${this.environment.runtimeConfig.serverUrl}masters/TaxMaster/GetTaxTypes`;
   getTaxmastersList = `${this.environment.runtimeConfig.serverUrl}masters/TaxMaster/GetTaxmastersList`;
   registerTaxMasters = `${this.environment.runtimeConfig.serverUrl}masters/TaxMaster/RegisterTaxMasters`;
   updateTaxMaster = `${this.environment.runtimeConfig.serverUrl}masters/TaxMaster/UpdateTaxMaster`;
   deleteTaxMaster = `${this.environment.runtimeConfig.serverUrl}masters/TaxMaster/DeleteTaxMaster`;

   // --- Employee
  getEmployeeList = `${this.environment.runtimeConfig.serverUrl}masters/Employee/GetEmployeeList`;
   registerEmployee = `${this.environment.runtimeConfig.serverUrl}masters/Employee/RegisterEmployee`;
   updateEmployee = `${this.environment.runtimeConfig.serverUrl}masters/Employee/UpdateEmployee`;
   deleteEmployee = `${this.environment.runtimeConfig.serverUrl}masters/Employee/DeleteEmployee`;

   // --- EmployeeInBranch
 
  getAllEmployeesInBranch = `${this.environment.runtimeConfig.serverUrl}masters/EmployeeInBranch/GetAllEmployeesInBranch`;
  getEmployeeInBranchList = `${this.environment.runtimeConfig.serverUrl}masters/EmployeeInBranch/GetEmployeeList`;
  getBranchesBranchList = `${this.environment.runtimeConfig.serverUrl}masters/EmployeeInBranch/GetBranchesList`;
  registerEmployeeInBranch = `${this.environment.runtimeConfig.serverUrl}masters/EmployeeInBranch/RegisterEmployeeInBranch`;
  updateEmployeeInBranch = `${this.environment.runtimeConfig.serverUrl}masters/EmployeeInBranch/UpdateEmployeeInBranch`;
  deleteEmployeeInBranch = `${this.environment.runtimeConfig.serverUrl}masters/EmployeeInBranch/DeleteEmployeeInBranch`;
   

   // --- PartnerType
  getaccounttypelist = `${this.environment.runtimeConfig.serverUrl}masters/PartnerType/GetAccountTypesList`;
  getPartnerTypesList = `${this.environment.runtimeConfig.serverUrl}masters/PartnerType/GetPartnerTypeList`;
  registerPartnerType = `${this.environment.runtimeConfig.serverUrl}masters/PartnerType/RegisterPartnerType`;
  updatePartnerType = `${this.environment.runtimeConfig.serverUrl}masters/PartnerType/UpdatePartnerType`;
  deletePartnerType = `${this.environment.runtimeConfig.serverUrl}masters/PartnerType/DeletePartnerType`;
 
  //vocherseries
 getvocherseriesList = `${this.environment.runtimeConfig.serverUrl}gl/VoucherSeries/GetVoucherSeriesList`;
 registerVoucherSeries = `${this.environment.runtimeConfig.serverUrl}gl/VoucherSeries/RegisterVoucherSeries`; 
 updateVoucherSeries = `${this.environment.runtimeConfig.serverUrl}gl/VoucherSeries/UpdateVoucherSeries`; 
 deleteVoucherSeries = `${this.environment.runtimeConfig.serverUrl}gl/VoucherSeries/DeleteVoucherSeries`; 

 //getassignmentvoucherseriestovouchertypeList
 getassignmentvoucherseriestovouchertypeList = `${this.environment.runtimeConfig.serverUrl}gl/AssignmentVoucherSeriestoVoucherType/GetAssignmentVoucherSeriestoVoucherTypeList`;
 registerAssignmentVoucherSeriestoVoucherType = `${this.environment.runtimeConfig.serverUrl}gl/AssignmentVoucherSeriestoVoucherType/RegisterAssignmentVoucherSeriestoVoucherType`;
 updateAssignmentVoucherSeriestoVoucherType = `${this.environment.runtimeConfig.serverUrl}gl/AssignmentVoucherSeriestoVoucherType/UpdateAssignmentVoucherSeriestoVoucherType`;
 deleteAssignmentVoucherSeriestoVoucherType = `${this.environment.runtimeConfig.serverUrl}gl/AssignmentVoucherSeriestoVoucherType/DeleteAssignmentVoucherSeriestoVoucherType`;

    // Tax Types //
    getTaxTypesList = `${this.environment.runtimeConfig.serverUrl}gl/TaxTypes/GetTaxTypesList`;
    registerTaxTypes = `${this.environment.runtimeConfig.serverUrl}gl/TaxTypes/RegisterTaxTypes`;
    updateTaxTypes = `${this.environment.runtimeConfig.serverUrl}gl/TaxTypes/UpdateTaxTypes`;
    deleteTaxTypes = `${this.environment.runtimeConfig.serverUrl}gl/TaxTypes/DeleteTaxTypes`;
   // getTaxCodesList = `${this.environment.runtimeConfig.serverUrl}gl/TaxIntegration/GetTaxCodesList`;
    //getGLTaxAccountList = `${this.environment.runtimeConfig.serverUrl}gl/TaxIntegration/GetGLTaxAccountList`;

   //TaxRates
   gettaxratesList = `${this.environment.runtimeConfig.serverUrl}masters/TaxRates/GetTaxRatesList`;
   registerTaxRates = `${this.environment.runtimeConfig.serverUrl}masters/TaxRates/RegisterTaxRates`;
   updateTaxRates = `${this.environment.runtimeConfig.serverUrl}masters/TaxRates/UpdateTaxRates`;
   deleteTaxRates = `${this.environment.runtimeConfig.serverUrl}masters/TaxRates/DeleteTaxRates`;

      // Tax transaction //
  getTaxTransactionList = `${this.environment.runtimeConfig.serverUrl}gl/TaxTransaction/GetTaxTransactionList`;
  registerTaxTransaction = `${this.environment.runtimeConfig.serverUrl}gl/TaxTransaction/RegisterTaxTransaction`;
  updateTaxTransaction = `${this.environment.runtimeConfig.serverUrl}gl/TaxTransaction/UpdateTaxTransaction`;
  deleteTaxTransaction = `${this.environment.runtimeConfig.serverUrl}gl/TaxTransaction/DeleteTaxTransaction`;

   // --- NoSeries
  getNoSeriesList = `${this.environment.runtimeConfig.serverUrl}masters/NoSeries/GetNoSeriesList`;
  registerNoSeries = `${this.environment.runtimeConfig.serverUrl}masters/NoSeries/RegisterNoSeries`;
  updateNoSeries = `${this.environment.runtimeConfig.serverUrl}masters/NoSeries/UpdateNoSeries`;
  deleteNoSeries = `${this.environment.runtimeConfig.serverUrl}masters/NoSeries/DeleteNoSeries`;
 

   // --- NoSeries - company
   getCompanyNoSeriesList = `${this.environment.runtimeConfig.serverUrl}masters/NoSeries/GetCompanyList`;
   getBranchesNoSeriesList = `${this.environment.runtimeConfig.serverUrl}masters/NoSeries/GetBranchesList`;
   getPartnerTypeNoSeriesList = `${this.environment.runtimeConfig.serverUrl}masters/NoSeries/GetPartnerTypeList`;


   // --- CostCenter
  
  GetCostCenterList = `${this.environment.runtimeConfig.serverUrl}masters/CostCenter/GetCostCenterList`;
  registerCostCenter = `${this.environment.runtimeConfig.serverUrl}masters/CostCenter/RegisterCostCenter`;
  updateCostCenter = `${this.environment.runtimeConfig.serverUrl}masters/CostCenter/UpdateCostCenter`;
  deleteCostCenter = `${this.environment.runtimeConfig.serverUrl}masters/CostCenter/DeleteCostCenter`;
   

   // --- PartnerCreation

   getCompaniesPartnerCreationList = `${this.environment.runtimeConfig.serverUrl}masters/PartnerCreation/GetCompaniesList`;
   getBranchesPartnerCreationList = `${this.environment.runtimeConfig.serverUrl}masters/PartnerCreation/GetBranchesList`;
   getPartnerPartnerCreationTypes = `${this.environment.runtimeConfig.serverUrl}masters/PartnerCreation/GetPartnerTypes`;
   getGlAccounts = `${this.environment.runtimeConfig.serverUrl}masters/PartnerCreation/GetGlAccounts`;
   getNatureList = `${this.environment.runtimeConfig.serverUrl}masters/PartnerCreation/GetNatureList`;
   getBalanceTypes = `${this.environment.runtimeConfig.serverUrl}masters/PartnerCreation/GetBalanceTypes`;
   getPartnerCreationList = `${this.environment.runtimeConfig.serverUrl}masters/PartnerCreation/GetPartnerCreationList`;
   registerPartnerCreation = `${this.environment.runtimeConfig.serverUrl}masters/PartnerCreation/RegisterCreation`;
   updatePartnerCreation = `${this.environment.runtimeConfig.serverUrl}masters/PartnerCreation/UpdatePartnerCreation`;
   deletePartnerCreation = `${this.environment.runtimeConfig.serverUrl}masters/PartnerCreation/DeletePartnerCreation`;

   // --- ProfitCenter
  getProfitCenterList = `${this.environment.runtimeConfig.serverUrl}masters/ProfitCenter/GetProfitCenterList`;
  registerProfitCenters = `${this.environment.runtimeConfig.serverUrl}masters/ProfitCenter/RegisterProfitCenters`;
  updateProfitCenters = `${this.environment.runtimeConfig.serverUrl}masters/ProfitCenter/UpdateProfitCenters`;
  deleteProfitCenters = `${this.environment.runtimeConfig.serverUrl}masters/ProfitCenter/DeleteProfitCenters`;

  //Language
  getLanguageList = `${this.environment.runtimeConfig.serverUrl}masters/Language/GetLanguageList`;
  registerLanguage = `${this.environment.runtimeConfig.serverUrl}masters/Language/RegisterLanguage`;
  updateLanguage = `${this.environment.runtimeConfig.serverUrl}masters/Language/UpdateLanguage`;
  deleteLanguage = `${this.environment.runtimeConfig.serverUrl}masters/Language/DeleteLanguage`;

  //country
  getcountryList = `${this.environment.runtimeConfig.serverUrl}masters/Country/GetCountryList`;
  registerCountry = `${this.environment.runtimeConfig.serverUrl}masters/Country/RegisterCountry`;
  updateCountry = `${this.environment.runtimeConfig.serverUrl}masters/Country/UpdateCountry`;
  deleteCountry = `${this.environment.runtimeConfig.serverUrl}masters/Country/DeleteCountry`;

  //Region
  getregionList = `${this.environment.runtimeConfig.serverUrl}masters/Region/GetRegionList`;
  registerRegion = `${this.environment.runtimeConfig.serverUrl}masters/Region/RegisterRegion`;
  updateRegion = `${this.environment.runtimeConfig.serverUrl}masters/Region/UpdateRegion`;
  deleteRegion = `${this.environment.runtimeConfig.serverUrl}masters/Region/DeleteRegion`;

  //State
  getstateList = `${this.environment.runtimeConfig.serverUrl}masters/State/GetStateList`;
  registerState = `${this.environment.runtimeConfig.serverUrl}masters/State/RegisterState`;
  updateState = `${this.environment.runtimeConfig.serverUrl}masters/State/UpdateState`;
  deleteState = `${this.environment.runtimeConfig.serverUrl}masters/State/DeleteState`;

  //Currency
  getCurrencyList = `${this.environment.runtimeConfig.serverUrl}masters/Currency/GetCurrencyList`;
  registerCurrency = `${this.environment.runtimeConfig.serverUrl}masters/Currency/RegisterCurrency`;
  updateCurrency = `${this.environment.runtimeConfig.serverUrl}masters/Currency/UpdateCurrency`;
  deleteCurrency = `${this.environment.runtimeConfig.serverUrl}masters/Currency/DeleteCurrency`;


   // --- Segment
  getSegmentList = `${this.environment.runtimeConfig.serverUrl}masters/Segment/GetSegmentList`;
  registerSegment = `${this.environment.runtimeConfig.serverUrl}masters/Segment/RegisterSegment`;
  updateSegment = `${this.environment.runtimeConfig.serverUrl}masters/Segment/UpdateSegment`;
  deleteSegment = `${this.environment.runtimeConfig.serverUrl}masters/Segment/DeleteSegment`;
   
   // --- unit
   getunitList = `${this.environment.runtimeConfig.serverUrl}masters/Unit/GetUnitList`;
   registerunit = `${this.environment.runtimeConfig.serverUrl}masters/Unit/RegisterUnit`;
   updateunit = `${this.environment.runtimeConfig.serverUrl}masters/Unit/UpdateUnit`;
   deleteunit = `${this.environment.runtimeConfig.serverUrl}masters/Unit/DeleteUnit`;

   //tank
   Getbranchcodes = `${this.environment.runtimeConfig.serverUrl}masters/Tank/Getbranchcode`;
   GetBranches = `${this.environment.runtimeConfig.serverUrl}masters/Tank/GetBranches`;
   gettankList = `${this.environment.runtimeConfig.serverUrl}masters/Tank/GetTankList`;
   registertank = `${this.environment.runtimeConfig.serverUrl}masters/Tank/RegisterTank`;
   updatetank = `${this.environment.runtimeConfig.serverUrl}masters/Tank/UpdateTank`;
   deletetank = `${this.environment.runtimeConfig.serverUrl}masters/Tank/DeleteTank`;

   //pump
   GetProductGroupsNames = `${this.environment.runtimeConfig.serverUrl}masters/Pump/GetProductGroupsNames`;
   GetProductGroups = `${this.environment.runtimeConfig.serverUrl}masters/Pump/GetProductGroups`;
   GetBranchcodes = `${this.environment.runtimeConfig.serverUrl}masters/Pump/GetBranchcodes`;
   getpumpList = `${this.environment.runtimeConfig.serverUrl}masters/Pump/GetPumpList`;
   registerpump = `${this.environment.runtimeConfig.serverUrl}masters/Pump/RegisterPump`;
   updatepump = `${this.environment.runtimeConfig.serverUrl}masters/Pump/UpdatePump`;
   deletepump = `${this.environment.runtimeConfig.serverUrl}masters/Pump/DeletePump`;

   //productpacking
   getproductpackingList = `${this.environment.runtimeConfig.serverUrl}masters/Productpacking/GetProductpackingList`;
   registerproductpacking = `${this.environment.runtimeConfig.serverUrl}masters/Productpacking/RegisterProductpacking`;
   updateproductpacking = `${this.environment.runtimeConfig.serverUrl}masters/Productpacking/UpdateProductpacking`;
   deleteproductpacking = `${this.environment.runtimeConfig.serverUrl}masters/Productpacking/DeleteProductpacking`;

   //TaxGroup
   getTaxGroupList = `${this.environment.runtimeConfig.serverUrl}masters/Taxgroup/GetTaxgroupList`;
   registerTaxGroup = `${this.environment.runtimeConfig.serverUrl}masters/Taxgroup/RegisterTaxgroup`;
   updateTaxGroup = `${this.environment.runtimeConfig.serverUrl}masters/Taxgroup/UpdateTaxgroup`;
   deleteTaxGroup = `${this.environment.runtimeConfig.serverUrl}masters/Taxgroup/DeleteTaxgroup`;

   //TaxStructure
   getTaxStructureList = `${this.environment.runtimeConfig.serverUrl}masters/TaxStructure/GetTaxStructureList`;
   TaxGroupsLists = `${this.environment.runtimeConfig.serverUrl}masters/TaxStructure/GetTaxGroups`;
   PurchaseAccountsList = `${this.environment.runtimeConfig.serverUrl}masters/TaxStructure/GetPurchaseAccountss`;
   registerTaxStructure = `${this.environment.runtimeConfig.serverUrl}masters/TaxStructure/RegisterTaxStructure`;
   updateTaxStructure = `${this.environment.runtimeConfig.serverUrl}masters/TaxStructure/UpdateTaxStructure`;
   deleteTaxStructure = `${this.environment.runtimeConfig.serverUrl}masters/TaxStructure/DeleteTaxStructure`;

    //MSHSD Rates
    getMshsdRateList = `${this.environment.runtimeConfig.serverUrl}masters/MshsdRates/GetMshsdRateList`;
    getMshsdBranchesList = `${this.environment.runtimeConfig.serverUrl}masters/MshsdRates/GetBranchesList`;
    getProductList = `${this.environment.runtimeConfig.serverUrl}masters/MshsdRates/GetProductList`;
    registerMshsdRate = `${this.environment.runtimeConfig.serverUrl}masters/MshsdRates/RegisterMshsdRate`;
    updateMshsdRate = `${this.environment.runtimeConfig.serverUrl}masters/MshsdRates/UpdateMshsdRate`;
    deleteMshsdRate = `${this.environment.runtimeConfig.serverUrl}masters/MshsdRates/DeleteMshsdRate`;

//Product
    getProductMasterList = `${this.environment.runtimeConfig.serverUrl}masters/Product/GetProductList`;
    getSupplierGroupList = `${this.environment.runtimeConfig.serverUrl}masters/Product/GetSupplierGroupList`;
    getProductGroupList = `${this.environment.runtimeConfig.serverUrl}masters/Product/GetProductGroupList`;
    getTaxApplicableList = `${this.environment.runtimeConfig.serverUrl}masters/Product/GetTaxApplicableList`;
    getProductPackingList = `${this.environment.runtimeConfig.serverUrl}masters/Product/GetProductPackingList`;
    getTaxList = `${this.environment.runtimeConfig.serverUrl}masters/Product/GetTaxList`;
    getTaxGrouplist = `${this.environment.runtimeConfig.serverUrl}masters/Product/GetTaxGrouplist`;
    getUnitList = `${this.environment.runtimeConfig.serverUrl}masters/Product/GetUnitList`;
    getTaxStructure = `${this.environment.runtimeConfig.serverUrl}masters/Product/GetTaxStructure`;
    registerProduct = `${this.environment.runtimeConfig.serverUrl}masters/Product/RegisterProduct`;
    updateProduct = `${this.environment.runtimeConfig.serverUrl}masters/Product/UpdateProduct`;
    deleteProduct = `${this.environment.runtimeConfig.serverUrl}masters/Product/DeleteProduct`;
    
    //MemberMaster
   getTitles = `${this.environment.runtimeConfig.serverUrl}MemberMaster/GetTitles`;
   getVehicles = `${this.environment.runtimeConfig.serverUrl}MemberMaster/GetVehicles`;
   getStates = `${this.environment.runtimeConfig.serverUrl}MemberMaster/GetStates`;
   getPassbookStatuses = `${this.environment.runtimeConfig.serverUrl}MemberMaster/GetPassbookStatuses`;
   getRelations = `${this.environment.runtimeConfig.serverUrl}MemberMaster/GetRelations`;
   getVehicleTypes = `${this.environment.runtimeConfig.serverUrl}MemberMaster/GetVehicleTypes`;
   getMembersList = `${this.environment.runtimeConfig.serverUrl}MemberMaster/GetMembersList`;
   registerMemberMaster = `${this.environment.runtimeConfig.serverUrl}MemberMaster/RegisterMemberMaster`;
   updateMemberMaster = `${this.environment.runtimeConfig.serverUrl}MemberMaster/UpdateMemberMaster`;
   updateVehicle = `${this.environment.runtimeConfig.serverUrl}MemberMaster/UpdateVehicle`;
   // ******************************* End  master *****************************************


   // ******************************* start  Payroll *****************************************

   //Leaveopeningbalance
  
   getLeaveTypeatListforlop = `${this.environment.runtimeConfig.serverUrl}masters/LeaveBalances/GetLeavetpeList`;
   getLeaveopeningbalanceList = `${this.environment.runtimeConfig.serverUrl}masters/LeaveBalances/GetLeaveBalancesList`;
  registerLeaveopeningbalance = `${this.environment.runtimeConfig.serverUrl}masters/LeaveBalances/RegisterLeaveBalancesList`;
   updateLeaveopeningbalance = `${this.environment.runtimeConfig.serverUrl}masters/LeaveBalances/UpdateLeaveBalancesList`;
   deleteLeaveopeningbalance = `${this.environment.runtimeConfig.serverUrl}masters/LeaveBalances/DeleteLeaveBalancesList`;

   //LeaveTypes
 
  getLeaveTypeatLists = `${this.environment.runtimeConfig.serverUrl}Selfservice/LeaveType/GetLeaveTypeList`;
   registerLeaveTypes = `${this.environment.runtimeConfig.serverUrl}Selfservice/LeaveType/RegisterLeaveType`;
   updateLeaveTypes = `${this.environment.runtimeConfig.serverUrl}Selfservice/LeaveType/UpdateLeaveType`;
   deleteLeaveTypes = `${this.environment.runtimeConfig.serverUrl}Selfservice/LeaveType/DeleteLeaveType`;

   //LeaveRequest
  
  getnoofdayscount = `${this.environment.runtimeConfig.serverUrl}Selfservice/LeaveRequest/Getnoofdayscount`;
  getEmpCode = `${this.environment.runtimeConfig.serverUrl}Selfservice/LeaveRequest/GetEmployeeCode`;
  getEmpName = `${this.environment.runtimeConfig.serverUrl}Selfservice/LeaveRequest/GetEmpName`;
  updateLeaveRequests = `${this.environment.runtimeConfig.serverUrl}Selfservice/LeaveRequest/UpdateLeaveapplying`;
  getLeaveTypeatList = `${this.environment.runtimeConfig.serverUrl}Selfservice/LeaveRequest/GetLeavetpesList`;
  getLeaveRequestList = `${this.environment.runtimeConfig.serverUrl}Selfservice/LeaveRequest/GetLeaveApplDetailsList`;
 //getLeaveRequestList = `${this.environment.runtimeConfig.serverUrl}Selfservice/LeaveRequest/GetLeaveApplDetailsList`;
  registerLeaveRequests = `${this.environment.runtimeConfig.serverUrl}Selfservice/LeaveRequest/RegisterLeaveapplying`;


  //Applyod
  applyodRequestList = `${this.environment.runtimeConfig.serverUrl}Selfservice/Applyod/GetApplyodDetailsList`;
  registerodRequest = `${this.environment.runtimeConfig.serverUrl}Selfservice/Applyod/RegisterApplyOddataDetails`;
  updateapplyodRequest = `${this.environment.runtimeConfig.serverUrl}Selfservice/Applyod/UpdateApplyod`;

  //Advance
  applyadvanceRequestList = `${this.environment.runtimeConfig.serverUrl}Selfservice/Advance/GetApplyAdvanceDetailsList`;
  registeradvanceRequest = `${this.environment.runtimeConfig.serverUrl}Selfservice/Advance/RegisterApplyAdvancedataDetails`;
  updateapplyadvanceRequest = `${this.environment.runtimeConfig.serverUrl}Selfservice/Advance/UpdateAdvancedataDetails`;
  getAdvancetypeList = `${this.environment.runtimeConfig.serverUrl}Selfservice/Advance/GetAdvancedataDetailslist`;

  //PermissionRequest
  permissionRequestList = `${this.environment.runtimeConfig.serverUrl}Selfservice/PermissionRequest/GetPermissionApplDetailsList`;
  registerpermissionRequest = `${this.environment.runtimeConfig.serverUrl}Selfservice/PermissionRequest/RegisterPermissionapplying`;
  updatepermissionRequest = `${this.environment.runtimeConfig.serverUrl}Selfservice/PermissionRequest/UpdatePermissionapplying`;

   //PT Master
  getPTList = `${this.environment.runtimeConfig.serverUrl}payroll/PTMaster/GetPTList`;
  registerPT = `${this.environment.runtimeConfig.serverUrl}payroll/PTMaster/RegisterPT`;
  updatePT = `${this.environment.runtimeConfig.serverUrl}payroll/PTMaster/UpdatePT`;
  deletePT = `${this.environment.runtimeConfig.serverUrl}payroll/PTMaster/DeletePT`;
  
   // Component Master
  getComponentsList = `${this.environment.runtimeConfig.serverUrl}payroll/ComponentMaster/GetComponentsList`;
  registerComponent = `${this.environment.runtimeConfig.serverUrl}payroll/ComponentMaster/RegisterComponent`;
  getConfigurationList = `${this.environment.runtimeConfig.serverUrl}payroll/ComponentMaster/GetConfigurationList`;
  updateComponent = `${this.environment.runtimeConfig.serverUrl}payroll/ComponentMaster/UpdateComponent`;
  deleteComponent = `${this.environment.runtimeConfig.serverUrl}payroll/ComponentMaster/DeleteComponent`;
  

   //PF Master
  getPfComponentsList = `${this.environment.runtimeConfig.serverUrl}payroll/PFMaster/GetComponentsList`;
  getPfList = `${this.environment.runtimeConfig.serverUrl}payroll/PFMaster/GetPFList`;
  registerPF = `${this.environment.runtimeConfig.serverUrl}payroll/PFMaster/RegisterPF`;
  updatePF = `${this.environment.runtimeConfig.serverUrl}payroll/PFMaster/UpdatePF`;
  deletePF = `${this.environment.runtimeConfig.serverUrl}payroll/PFMaster/DeletePF`;
 
  //approvaltype
  getempList = `${this.environment.runtimeConfig.serverUrl}Selfservice/ApprovalType/GetEmployeesList`;
  getapprovaltypeList = `${this.environment.runtimeConfig.serverUrl}Selfservice/ApprovalType/GetApprovalTypesList`;
  registerapprovaltype = `${this.environment.runtimeConfig.serverUrl}Selfservice/ApprovalType/RegisterApprovalType`;
  updateapprovaltype = `${this.environment.runtimeConfig.serverUrl}Selfservice/ApprovalType/UpdateApprovalType`;
  deleteapprovaltype = `${this.environment.runtimeConfig.serverUrl}Selfservice/ApprovalType/DeleteApprovalType`;

  
   //CTC Breakup
   getCTCList = `${this.environment.runtimeConfig.serverUrl}payroll/CTCBreakup/GetCTCList`;
   getStructureList = `${this.environment.runtimeConfig.serverUrl}payroll/CTCBreakup/GetStructureList`;
   getctcComponentsList = `${this.environment.runtimeConfig.serverUrl}payroll/ComponentMaster/GetComponentsList`;

   // Structure Creation
   getStructuresList = `${this.environment.runtimeConfig.serverUrl}payroll/StructureCreation/GetStructuresList`;
   registerStructure = `${this.environment.runtimeConfig.serverUrl}payroll/StructureCreation/RegisterStructure`;
   updateStructure = `${this.environment.runtimeConfig.serverUrl}payroll/StructureCreation/UpdateStructure`;
   deleteStructure = `${this.environment.runtimeConfig.serverUrl}payroll/StructureCreation/DeleteStructure`;
   getStructureComponentsList = `${this.environment.runtimeConfig.serverUrl}payroll/StructureCreation/GetComponentsList`;
   getPFList = `${this.environment.runtimeConfig.serverUrl}payroll/StructureCreation/GetPFList`;

  //OdApproval
  getOdApplDetailsList = `${this.environment.runtimeConfig.serverUrl}Selfservice/OdApproval/GetOdApprovalApplDetailsList`;
  RegisterOdApprovalDetails = `${this.environment.runtimeConfig.serverUrl}Selfservice/OdApproval/GetOdApprovalApplDetailsList`;

  //AdvanceApproval
  getAdvanceApplDetailsList = `${this.environment.runtimeConfig.serverUrl}Selfservice/AdvanceApproval/GetAdvanceApprovalApplDetailsList`;
  RegisterAdvanceApprovalDetails = `${this.environment.runtimeConfig.serverUrl}Selfservice/AdvanceApproval/RegisterAdvanceApprovalDetails`;


  //Permission RequestApproval
  getPermissionrqstApplDetailsList = `${this.environment.runtimeConfig.serverUrl}Selfservice/PermissionApproval/GetPermissionApprovalApplDetailsList`;
  RegisterPermissionrqstApprovalDetails = `${this.environment.runtimeConfig.serverUrl}Selfservice/PermissionApproval/RegisterPermissionApprovalDetails`;

  
  //VehicleRequisition
  applyvehiclerqsnRequestList = `${this.environment.runtimeConfig.serverUrl}Selfservice/VehicleRequesition/GetApplyVehicleRequesitionDetailsList`;
  registervehiclerqsnRequest = `${this.environment.runtimeConfig.serverUrl}Selfservice/VehicleRequesition/RegisterApplyVehicleRequesitiondataDetails`;
  updatevehiclerqsnRequest = `${this.environment.runtimeConfig.serverUrl}Selfservice/VehicleRequesition/UpdateApplyVehicleRequesition`;

  //VehicleApproval
  getVehicleApplDetailsList = `${this.environment.runtimeConfig.serverUrl}Selfservice/VehicleApproval/GetVehicleApprovalApplDetailsList`;
  RegisterVehicleApprovalDetails = `${this.environment.runtimeConfig.serverUrl}Selfservice/VehicleApproval/RegisterVehicleApprovalDetails`;


   // Leave Approval
  getLeaveApplDetailsList = `${this.environment.runtimeConfig.serverUrl}Selfservice/LeaveApproval/GetLeaveApplDetailsList`;
  RegisterLeaveApprovalDetails = `${this.environment.runtimeConfig.serverUrl}Selfservice/LeaveApproval/RegisterLeaveApprovalDetails`;
 
 //gift master 
  getGiftProductList=`${this.environment.runtimeConfig.serverUrl}MemberMaster/GetProducts`;
  getGiftList=`${this.environment.runtimeConfig.serverUrl}MemberMaster/GetGifts`;
  addGift=`${this.environment.runtimeConfig.serverUrl}MemberMaster/AddGifts`;
  updateGift=`${this.environment.runtimeConfig.serverUrl}MemberMaster/UpdateGift`;

//  
  // ******************************* End  master *****************************************


 //Reports
   getMemberMaster = `${this.environment.runtimeConfig.serverUrl}Reports/MemberMasterReport/GetMemberMasterReportData`;

   getEmployeeRegister = `${this.environment.runtimeConfig.serverUrl}Reports/EmployeeRegisterReport/GetEmployeeRegisterReportData`;
   getAccountLedger = `${this.environment.runtimeConfig.serverUrl}Reports/AccountLedgerReport/GetAccountLedgerReportData`;
   getAccountLedgersList=`${this.environment.runtimeConfig.serverUrl}Reports/AccountLedgerReport/GetAccountLedgersList`;

  getSaleValueReport = `${this.environment.runtimeConfig.serverUrl}Reports/SaleValueReport/GetSaleValueReportData`;
   getReportBranchList=`${this.environment.runtimeConfig.serverUrl}Reports/SaleValueReport/GetReportBranchList`;

  getDefaultShiftReport = `${this.environment.runtimeConfig.serverUrl}Reports/ShiftViewReport/GetDefaultShiftReportDataTableList`


  getShiftViewReport = `${this.environment.runtimeConfig.serverUrl}Reports/ShiftViewReport/GetShiftViewReportList`;

  getVehicalReport = `${this.environment.runtimeConfig.serverUrl}Reports/VehicalReport/GetVehicalReportData`;

   getIntimateSaleReport=`${this.environment.runtimeConfig.serverUrl}Reports/IntimateSaleReport/GetIntimateSaleReportData`;


   getSalesGSTReport = `${this.environment.runtimeConfig.serverUrl}Reports/SalesGSTReport/GetSalesGSTReportData`;

   getDailySalesReport=`${this.environment.runtimeConfig.serverUrl}Reports/DailySalesReport/GetDailySalesReport`;

   getStockVerificationReport=`${this.environment.runtimeConfig.serverUrl}Reports/StockVerificationReport/GetStockVerificationReportData`;

  getStockLedgerForAllProducts = `${this.environment.runtimeConfig.serverUrl}Reports/StockLedgerReport/GetStockLedgerReportData`;

   getStockProducts = `${this.environment.runtimeConfig.serverUrl}Reports/StockLedgerReport/GetProductList`;
   getSalesAnalysisByBranch=`${this.environment.runtimeConfig.serverUrl}Reports/SalesAnalysisByBranch/GetSalesAnalysisByBranchrReportData`;
   getTwoFourehrsSalesStockReport=`${this.environment.runtimeConfig.serverUrl}Reports/TwoFourehrsSalesStockReport/Get24hrsSalesStockReportData`;
  getProductWiseMonthlyPurchaseReport=`${this.environment.runtimeConfig.serverUrl}Reports/ProductWiseMonthlyPurchaseReport/GetProductWiseMonthlyPurchaseReportData`;
   getProductPriceListReport=`${this.environment.runtimeConfig.serverUrl}Reports/ProductPriceList/GetProductPriceListReportData`;
   getReceiptsAndPyamentDetailedReportData=`${this.environment.runtimeConfig.serverUrl}Reports/ReceiptsAndPyamentDetailedReport/GetReceiptsAndPyamentDetailedReportData`;
  getReceiptsAndPaymentSummaryReportData = `${this.environment.runtimeConfig.serverUrl}Reports/ReceiptsAndPaymentSummaryReport/GetReceiptsAndPaymentSummaryReportData`;
  getSMSSummaryReportData = `${this.environment.runtimeConfig.serverUrl}Reports/ReceiptsAndPyamentDetailedReport/GetReceiptsAndPyamentDetailedReportData`;
  getOneDaySaleValueReportData=`${this.environment.runtimeConfig.serverUrl}Reports/OneDaySaleValueReport6amTo6am/GetOneDaySaleValueReportData`;

  /**************************** Settings ********************************************************* */
getRoles = `${this.environment.runtimeConfig.serverUrl}Auth/getRoles`;
getParentMenus = `${this.environment.runtimeConfig.serverUrl}Auth/getParentMenu`;
getMenuList = `${this.environment.runtimeConfig.serverUrl}Auth/getMenuList`;
giveAccess = `${this.environment.runtimeConfig.serverUrl}Auth/GiveAccess`;
getMenuUrl = `${this.environment.runtimeConfig.serverUrl}Auth/getMenu`;
   

   

}

