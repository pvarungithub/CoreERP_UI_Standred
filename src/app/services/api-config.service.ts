import { Injectable } from '@angular/core';
import { RuntimeConfigService } from './runtime-config.service';

@Injectable({
   providedIn: 'root'
})

export class ApiConfigService {

   constructor(private environment: RuntimeConfigService) { }

   // login Url
   loginUrl = `${this.environment.runtimeConfig.serverUrl}Auth/login`;
   logoutUrl = `${this.environment.runtimeConfig.serverUrl}Auth/logout`;
   getBranchesForUser = `${this.environment.runtimeConfig.serverUrl}Auth/GetBranchesForUser`;
   getComponentInfo = `${this.environment.runtimeConfig.serverUrl}Settings/GetComponentInfo`;

   // Common
   getWCList = `${this.environment.runtimeConfig.serverUrl}Common/GetWorkcenterList`;
   getFormulaList = `${this.environment.runtimeConfig.serverUrl}Formulas/GetFormulasList`;
   getreqdetailsList = `${this.environment.runtimeConfig.serverUrl}Common/GetMaterialreqDetailsList`;
   getreqList = `${this.environment.runtimeConfig.serverUrl}Common/GetMaterialreqList`;
   getmomenttypeList = `${this.environment.runtimeConfig.serverUrl}Movementtype/GetMovementtypeList`;
   getordernolist = `${this.environment.runtimeConfig.serverUrl}OrderType/GetOrderTypeList`;
   getwbselement = `${this.environment.runtimeConfig.serverUrl}Common/GetWbsList`;
   getbatchList = `${this.environment.runtimeConfig.serverUrl}BatchMaster/GetBatchMasterList`;
   getCostUnitListList = `${this.environment.runtimeConfig.serverUrl}CreationOfCostUnits/GetCreationOfCostUnitsList`;
   getcostnumberseriesList = `${this.environment.runtimeConfig.serverUrl}Common/GetCostingNumberSeriesList`;
   getcostofobjectList = `${this.environment.runtimeConfig.serverUrl}Common/GetCostingObjectTypeList`;
   getsecondelementList = `${this.environment.runtimeConfig.serverUrl}Common/GetCostingSecondaryList`;
   getdepartmentList = `${this.environment.runtimeConfig.serverUrl}Common/GetDepartmentList`;
   getttingobjectNumbers = `${this.environment.runtimeConfig.serverUrl}CreationOfCostUnits/GetObjectNumber`;
   getttingmaterialNumbers = `${this.environment.runtimeConfig.serverUrl}MaterialMaster/GetMaterialNumber`;
   getuomList = `${this.environment.runtimeConfig.serverUrl}Common/GetUOMList`;
   getmaterialdata = `${this.environment.runtimeConfig.serverUrl}Common/GetMaterialMasterList`;
   getModelPatternList = `${this.environment.runtimeConfig.serverUrl}ModelPattern/GetModelPatternList`;
   getmsizeList = `${this.environment.runtimeConfig.serverUrl}MaterialSize/GetMaterialSizeList`;
   getmaterialgroupList = `${this.environment.runtimeConfig.serverUrl}MaterialGroups/GetMaterialGroupsList`;
   getMaterialList = `${this.environment.runtimeConfig.serverUrl}Common/GetMaterialList`;
   getStList = `${this.environment.runtimeConfig.serverUrl}StorageLocation/GetStorageLocation`;
   getpurchaseOrderTypeList = `${this.environment.runtimeConfig.serverUrl}Purchaseordertype/GetPurchaseordertypeList`;
   getPurchaseorderNumberList = `${this.environment.runtimeConfig.serverUrl}PurchaseOrderNumberRange/GetPurchaseOrderNumberRangeList`;
   getQuotationNumberRangeList = `${this.environment.runtimeConfig.serverUrl}QuotationNumberRange/GetQuotationNumberRangeList`;
   getnumberRangeList = `${this.environment.runtimeConfig.serverUrl}RequisitionNumberRange/GetRequisitionNumberRangeList`;
   getPurchasingtypeList = `${this.environment.runtimeConfig.serverUrl}Purchasingtype/GetPurchaseTypeList`;
   getPurchaseGroupList = `${this.environment.runtimeConfig.serverUrl}Purchasinggroups/GetPurchasinggroupsList`;
   getlanguageList = `${this.environment.runtimeConfig.serverUrl}Common/GetLanguageList`;
   getRegionsList = `${this.environment.runtimeConfig.serverUrl}Common/GetRegionList`;
   getCountrysList = `${this.environment.runtimeConfig.serverUrl}Common/GetCountrysList`;
   getcurrencyList = `${this.environment.runtimeConfig.serverUrl}Common/GetCurrencyList`;
   getstatesList = `${this.environment.runtimeConfig.serverUrl}Common/GetStatesList`;
   getCompanyList = `${this.environment.runtimeConfig.serverUrl}Common/GetCompanyList`;
   getcostingunitsList = `${this.environment.runtimeConfig.serverUrl}Common/GetCostUnitList`;
   getEmployeeList = `${this.environment.runtimeConfig.serverUrl}Common/GetEmployeeList`;
   getPlantsList = `${this.environment.runtimeConfig.serverUrl}Common/GetPlantsList`;
   getlocationsList = `${this.environment.runtimeConfig.serverUrl}Common/GetLocationsList`;
   getBranchList = `${this.environment.runtimeConfig.serverUrl}Common/GetBranchList`;
   getVoucherTypesList = `${this.environment.runtimeConfig.serverUrl}Common/GetVoucherTypesList`;
   getvochersseriesList = `${this.environment.runtimeConfig.serverUrl}Common/GetVouchersSeriesList`;
   getTaxTransactionsList = `${this.environment.runtimeConfig.serverUrl}Common/GetTaxTransactionsList`;
   gettaxrateList = `${this.environment.runtimeConfig.serverUrl}Common/GetTaxRateList`;
   getTDSRateList = `${this.environment.runtimeConfig.serverUrl}Common/GetTDSRateList`;
   getBusienessPartnersGroupsList = `${this.environment.runtimeConfig.serverUrl}Common/GetBusienessPartnersGroupsList`;
   getAssetsClassList = `${this.environment.runtimeConfig.serverUrl}Common/GetAssetsClassList`;
   getAssetsBlockList = `${this.environment.runtimeConfig.serverUrl}Common/GetAssetsBlockList`;
   getAccountsKeyList = `${this.environment.runtimeConfig.serverUrl}Common/GetAccountsKeyList`;
   getBankMastersList = `${this.environment.runtimeConfig.serverUrl}Common/GetBankMastersList`;
   getPaymentsTermsList = `${this.environment.runtimeConfig.serverUrl}Common/GetPaymentsTermsList`;
   getGLAccountListbyCatetory = `${this.environment.runtimeConfig.serverUrl}Common/GLAccountListbyCatetory`;
   getGLAccountsList = `${this.environment.runtimeConfig.serverUrl}Common/GetGLAccountsList`;
   getProfitCentersList = `${this.environment.runtimeConfig.serverUrl}Common/GetProfitCentersList`;
   getCostCentersList = `${this.environment.runtimeConfig.serverUrl}Common/GetCostCentersList`;
   getTaxRatesList = `${this.environment.runtimeConfig.serverUrl}TaxRates/GetTaxRatesList`;
   getBPList = `${this.environment.runtimeConfig.serverUrl}Common/GetBPList`;
   getpurchaseinvoiceList = `${this.environment.runtimeConfig.serverUrl}Common/GetPurchaseInvoiceList`;
   getAssetMasterList = `${this.environment.runtimeConfig.serverUrl}Common/GetMainAssetMasterList`;
   getSubAssetMasterList = `${this.environment.runtimeConfig.serverUrl}Common/GetSubAssetMasterList`;
   getFieldsConfig = `${this.environment.runtimeConfig.serverUrl}Common/GetFieldsConfig`;
   getUserPermissions = `${this.environment.runtimeConfig.serverUrl}Common/GetUserPermissions`;
   getLotSeriesUrlList = `${this.environment.runtimeConfig.serverUrl}LotSeries/GetLotSeriesList`;
   getGRNSeriesList = `${this.environment.runtimeConfig.serverUrl}GoodsReceiptNoteNumberSeries/GetGoodsReceiptNoteNumberSeriesList`;
   getMRNSeriesList = `${this.environment.runtimeConfig.serverUrl}MaterialRequisitionNoteNumberSeries/GetMaterialRequisitionNoteNumberSeriesList`;
   getMaterialSeriesList = `${this.environment.runtimeConfig.serverUrl}MaterialNumberRangeSeries/GetMaterialNumberRangeSeriesList`;
   getGINSeriesList = `${this.environment.runtimeConfig.serverUrl}GoodsIssueNoteNumberSeries/GetGoodsIssueNoteNumberSeriesList`;
   getHsnSacList = `${this.environment.runtimeConfig.serverUrl}HsnSac/GetHsnSacList`;
   //************************ IMG General  ****************************************/
   getCurrencyList = `${this.environment.runtimeConfig.serverUrl}Currency/GetCurrencyList`;
   getLanguageList = `${this.environment.runtimeConfig.serverUrl}Language/GetLanguageList`;
   getCompanysList = `${this.environment.runtimeConfig.serverUrl}Company/GetCompanysList`;
   getSegmentList = `${this.environment.runtimeConfig.serverUrl}Segment/GetSegmentList`;
   getProfitCenterList = `${this.environment.runtimeConfig.serverUrl}ProfitCenter/GetProfitCenterList`;
   getBranchesList = `${this.environment.runtimeConfig.serverUrl}Branches/GetBranchesList`;
   getDivisionsList = `${this.environment.runtimeConfig.serverUrl}Division/GetDivisionsList`;
   getfunctionaldeptList = `${this.environment.runtimeConfig.serverUrl}FunctionalDepartment/GetFunctionalDepartment`;
   GetCostCenterList = `${this.environment.runtimeConfig.serverUrl}CostCenter/GetCostCenterList`;
   getplantList = `${this.environment.runtimeConfig.serverUrl}Plant/GetPlant`;
   getlocationList = `${this.environment.runtimeConfig.serverUrl}Location/GetLocationList`;
   registerdepreciationcodeList = `${this.environment.runtimeConfig.serverUrl}Depreciationcode/RegisterDepreciationcode`;
   getdepreciationcodeDetail = `${this.environment.runtimeConfig.serverUrl}Depreciationcode/GetDepreciationcodeDetail`;
   registerpaymenttermsList = `${this.environment.runtimeConfig.serverUrl}PaymentTerms/RegisterPaymentTerms`;
   getpaymenttermDetail = `${this.environment.runtimeConfig.serverUrl}PaymentTerms/GetPaymentTermsDetail`;
   //mainasset
   registermainAssetsList = `${this.environment.runtimeConfig.serverUrl}MainAssetMaster/RegisterMainAssetMaster`;
   getMainAssetsDetail = `${this.environment.runtimeConfig.serverUrl}MainAssetMaster/GetMainAssetsDetail`;
   //subasset
   registerSubAssetsList = `${this.environment.runtimeConfig.serverUrl}SubAssets/RegisterSubAssetsdatas`;
   getSubAssetsDetail = `${this.environment.runtimeConfig.serverUrl}SubAssets/GetSubAssetsDetail`;
   //updateSubAssetsList= `${this.environment.runtimeConfig.serverUrl}SubAssets/UpdateSubAssetsList`;
   deleteSubAssetsList = `${this.environment.runtimeConfig.serverUrl}SubAssets/DeleteSubAssetsList`;
   ///************************ Accounting ************************** */
   getLedgerList = `${this.environment.runtimeConfig.serverUrl}Ledger/GetLedgerList`;
   getvocherclassList = `${this.environment.runtimeConfig.serverUrl}VoucherClass/GetVoucherClassList`;
   getDepreciationAreasList = `${this.environment.runtimeConfig.serverUrl}DepreciationAreas/GetDepreciationAreasList`;
   getAssetClassList = `${this.environment.runtimeConfig.serverUrl}AssetClass/GetAssetClassList`;
   getTaxTypesList = `${this.environment.runtimeConfig.serverUrl}TaxTypes/GetTaxTypesList`;
   subgrouplist = `${this.environment.runtimeConfig.serverUrl}AssignGLaccounttoSubGroup/GetGLUnderSubGroupList`;
   getTaxTransactionList = `${this.environment.runtimeConfig.serverUrl}TaxTransaction/GetTaxTransactionList`;
   getTDStypeList = `${this.environment.runtimeConfig.serverUrl}TDStype/GetTDStypeList`;
   getIncomeTypeList = `${this.environment.runtimeConfig.serverUrl}IncomeType/GetIncomeTypeList`;
   getGLAccountList = `${this.environment.runtimeConfig.serverUrl}GLAccount/GetGLAccountList`;
   getaccountNumber = `${this.environment.runtimeConfig.serverUrl}GLAccount/GetaccountNumberList`;
   getDepreciationcodeList = `${this.environment.runtimeConfig.serverUrl}Depreciationcode/GetDepreciationcodeList`;
   getAccountNamelist = `${this.environment.runtimeConfig.serverUrl}GLAccUnderSubGroup/GetAccountNamelist`;
   getGLUnderGroupList = `${this.environment.runtimeConfig.serverUrl}GLAccUnderSubGroup/GetAccountGrouplist`;
   getglAccgrpList = `${this.environment.runtimeConfig.serverUrl}GLAccUnderSubGroup/GetGLAccountGrouplist`;
   getAccountSubGrouplist = `${this.environment.runtimeConfig.serverUrl}GLAccUnderSubGroup/GetAccountSubGrouplist`;
   getNumberRangeList = `${this.environment.runtimeConfig.serverUrl}NumberRange/GetNumberRangeList`;
   getPartnerTypeList = `${this.environment.runtimeConfig.serverUrl}PartnerType/GetPartnerTypeList`;
   getChartOfAccountList = `${this.environment.runtimeConfig.serverUrl}ChartOfAccount/GetChartOfAccountList`;
   getAccountKeyList = `${this.environment.runtimeConfig.serverUrl}AccountKey/GetAccountKeyList`;
   getSubAssetsList = `${this.environment.runtimeConfig.serverUrl}SubAssets/GetSubAssetsList`;
   GetListsforMainAsset = `${this.environment.runtimeConfig.serverUrl}SubAssets/GetMainAsset`;
   getStructurekeyList = `${this.environment.runtimeConfig.serverUrl}AssignGLaccounttoSubGroup/GetStructurekeyList`;
   getbpNumbers = `${this.environment.runtimeConfig.serverUrl}BusienessPartnerAccount/GetBPtNumberList`;
   getttingbpNumbers = `${this.environment.runtimeConfig.serverUrl}BusienessPartnerAccount/GetBPtNumber`;
   getttingbpNames = `${this.environment.runtimeConfig.serverUrl}BusienessPartnerAccount/GetBPtName`;
   getMainAssetMasterList = `${this.environment.runtimeConfig.serverUrl}MainAssetMaster/GetMainAssetMasterList`;
   getAssetnumber = `${this.environment.runtimeConfig.serverUrl}MainAssetMaster/GetAssetNumber`;
   getasetnos = `${this.environment.runtimeConfig.serverUrl}MainAssetMaster/GettingAssetNumber`;
   getttinasNames = `${this.environment.runtimeConfig.serverUrl}MainAssetMaster/GettingAssetName`;
   getBusienessTransactionTypeList = `${this.environment.runtimeConfig.serverUrl}BusienessTransactionType/GetBusienessTransactionTypeList`;
   //AssetBegningAcqusition
   registeraqsnList = `${this.environment.runtimeConfig.serverUrl}AssetBegningAcqusition/RegisterAssetBegningAcqusition`;
   getAqsnDetail = `${this.environment.runtimeConfig.serverUrl}AssetBegningAcqusition/GetAssetBegningAcqusitionDetail`;
   getAcquisitionDetailsList = `${this.environment.runtimeConfig.serverUrl}AssetBegningAcqusition/GetAssetBegningAcqusitionDetailsList`;
   getacquisitionlist = `${this.environment.runtimeConfig.serverUrl}AssetBegningAcqusition/GetAssetBegningAcqusitionList`;

   /**************************** Settings ********************************************************* */
   getRoles = `${this.environment.runtimeConfig.serverUrl}Auth/getRoles`;
   getParentMenus = `${this.environment.runtimeConfig.serverUrl}Auth/getParentMenu`;
   getMenuList = `${this.environment.runtimeConfig.serverUrl}Auth/getMenuList`;
   giveAccess = `${this.environment.runtimeConfig.serverUrl}Auth/GiveAccess`;
   getMenuUrl = `${this.environment.runtimeConfig.serverUrl}Auth/getMenu`;
   getrolelist = `${this.environment.runtimeConfig.serverUrl}masters/UserCreation/GetRoleList`;




   /******************************* Cash Bank ****************************************************** */
   addCashBank = `${this.environment.runtimeConfig.serverUrl}Transactions/AddCashBank`;
   getCashBankDetail = `${this.environment.runtimeConfig.serverUrl}Transactions/GetCashBankDetail`;
   getCashBankMaster = `${this.environment.runtimeConfig.serverUrl}Transactions/GetCashBankMaster`;
   getVoucherNumber = `${this.environment.runtimeConfig.serverUrl}Transactions/GetVoucherNumber`;
   returnCashBank = `${this.environment.runtimeConfig.serverUrl}Transactions/ReturnCashBank`;
   getDiscount = `${this.environment.runtimeConfig.serverUrl}Transactions/GetDiscount`;

   /******************************* Journal ****************************************************** */
   addJournal = `${this.environment.runtimeConfig.serverUrl}Transactions/AddJournal`;
   getJVDetail = `${this.environment.runtimeConfig.serverUrl}Transactions/GetJVDetail`;
   getJVMaster = `${this.environment.runtimeConfig.serverUrl}Transactions/GetJVMaster`;

   /******************************* Invoice & Memo ****************************************************** */
   addInvoiceMemo = `${this.environment.runtimeConfig.serverUrl}Transactions/AddInvoiceMemo`;
   getIMDetail = `${this.environment.runtimeConfig.serverUrl}Transactions/GetIMDetail`;
   getIMMaster = `${this.environment.runtimeConfig.serverUrl}Transactions/GetIMMaster`;

   /******************************* Asset Purchase & Sale ****************************************************** */
   addPSIMAsset = `${this.environment.runtimeConfig.serverUrl}Transactions/AddPSIMAsset`;
   getPSIMAssetDetail = `${this.environment.runtimeConfig.serverUrl}Transactions/GetPSIMAssetDetail`;
   getPSIMAssetMaster = `${this.environment.runtimeConfig.serverUrl}Transactions/GetPSIMAssetMaster`;
   /******************************* Asset Transfer ****************************************************** */
   getAssettransferDetail = `${this.environment.runtimeConfig.serverUrl}Transactions/GetAssetTransferDetail`;
   addAssettransfer = `${this.environment.runtimeConfig.serverUrl}Transactions/AddAssetTransfer`;
   getAssettransferMaster = `${this.environment.runtimeConfig.serverUrl}Transactions/GetAssetTransferMaster`;

   /******************************* Payment Receipts ****************************************************** */
   getPaymentsReceiptsDetail = `${this.environment.runtimeConfig.serverUrl}Transactions/GetPaymentsReceiptsDetail`;
   addPaymentsReceipts = `${this.environment.runtimeConfig.serverUrl}Transactions/AddPaymentsReceipts`;
   getPaymentsreceiptsMaster = `${this.environment.runtimeConfig.serverUrl}Transactions/GetPaymentsReceiptsMaster`;

   /*******************************BOM ****************************************************** */
   addBOM = `${this.environment.runtimeConfig.serverUrl}BillOfMaterial/AddBOM`;
   getBOMDetail = `${this.environment.runtimeConfig.serverUrl}BillOfMaterial/GetBomDetail`;
   getBOMMaster = `${this.environment.runtimeConfig.serverUrl}BillOfMaterial/GetBOMMasters`;
   getBOMNumber = `${this.environment.runtimeConfig.serverUrl}BillOfMaterial/GetVoucherNumber`;
   returnBOM = `${this.environment.runtimeConfig.serverUrl}BillOfMaterial/ReturnCashBank`;

   /*******************************Goods Issue ****************************************************** */
   addGoodsissue = `${this.environment.runtimeConfig.serverUrl}Transactions/AddGoodsissue`;
   getGoodsissueDetail = `${this.environment.runtimeConfig.serverUrl}Transactions/GetGoodsissueDetail`;
   getGoodsissueMaster = `${this.environment.runtimeConfig.serverUrl}Transactions/GetGoodsissue`;
   returnGoodsissue = `${this.environment.runtimeConfig.serverUrl}Transactions/ReturnGoodsissue`;

   /*******************************Material Requisition ****************************************************** */
   addmareq = `${this.environment.runtimeConfig.serverUrl}Transactions/AddMaterialRequisition`;
   getmreqDetail = `${this.environment.runtimeConfig.serverUrl}Transactions/GetMaterialRequisitionDetail`;
   getmreqMaster = `${this.environment.runtimeConfig.serverUrl}Transactions/GetMaterialRequisition`;
   returnmreq = `${this.environment.runtimeConfig.serverUrl}Transactions/ReturnMaterialRequisition`;
   /******************************* Work Center Creation ****************************************************** */
   //getPaymentsReceiptsDetail = `${this.environment.runtimeConfig.serverUrl}Transactions/GetPaymentsReceiptsDetail`;
   addWCr = `${this.environment.runtimeConfig.serverUrl}WorkCenterCreation/RegisterWorkCenterCreation`;
   //getPaymentsreceiptsMaster = `${this.environment.runtimeConfig.serverUrl}Transactions/GetPaymentsReceiptsMaster`;

   /******************************* Routing****************************************************** */
   getroutingfileDetail = `${this.environment.runtimeConfig.serverUrl}RoutingFile/GetRoutingFileDetail`;
   addrouting = `${this.environment.runtimeConfig.serverUrl}RoutingFile/RegisterRoutingFile`;
   //getPaymentsreceiptsMaster = `${this.environment.runtimeConfig.serverUrl}Transactions/GetPaymentsReceiptsMaster`;


}
