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

   // Common Controller 
   getlanguageList = `${this.environment.runtimeConfig.serverUrl}Common/GetLanguageList`;
   getRegionsList = `${this.environment.runtimeConfig.serverUrl}Common/GetRegionList`;
   getCountrysList = `${this.environment.runtimeConfig.serverUrl}Common/GetCountrysList`;
   getcurrencyList = `${this.environment.runtimeConfig.serverUrl}Common/GetCurrencyList`;
   getstatesList = `${this.environment.runtimeConfig.serverUrl}Common/GetStatesList`;
   getCompanyList = `${this.environment.runtimeConfig.serverUrl}Common/GetCompanyList`;
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
   //************************ IMG General  ****************************************/


   // BusienesspartnerAccount
   getBusienessPartnerAccountList = `${this.environment.runtimeConfig.serverUrl}BusienessPartnerAccount/GetBusienessPartnerAccountList`;
   registerBusienessPartnerAccount = `${this.environment.runtimeConfig.serverUrl}BusienessPartnerAccount/RegisterBusienessPartnerAccount`;
   updateBusienessPartnerAccount = `${this.environment.runtimeConfig.serverUrl}BusienessPartnerAccount/UpdateBusienessPartnerAccount`;
   deleteBusienessPartnerAccount = `${this.environment.runtimeConfig.serverUrl}BusienessPartnerAccount/DeleteBusienessPartnerAccount`;
   getPaymentTermsList = `${this.environment.runtimeConfig.serverUrl}PaymentTerms/GetPaymentTermsList`;
   getbpNumbers = `${this.environment.runtimeConfig.serverUrl}BusienessPartnerAccount/GetBPtNumberList`;
   getttingbpNumbers = `${this.environment.runtimeConfig.serverUrl}BusienessPartnerAccount/GetBPtNumber`;
   getttingbpNames = `${this.environment.runtimeConfig.serverUrl}BusienessPartnerAccount/GetBPtName`;

   // MainAssetMaster
   getMainAssetMasterList = `${this.environment.runtimeConfig.serverUrl}MainAssetMaster/GetMainAssetMasterList`;
   registerMainAssetMaster = `${this.environment.runtimeConfig.serverUrl}MainAssetMaster/RegisterMainAssetMaster`;
   updateMainAssetMaster = `${this.environment.runtimeConfig.serverUrl}MainAssetMaster/UpdateMainAssetMaster`;
   deleteMainAssetMaster = `${this.environment.runtimeConfig.serverUrl}MainAssetMaster/DeleteMainAssetMaster`;
   getAssetnumber = `${this.environment.runtimeConfig.serverUrl}MainAssetMaster/GetAssetNumber`;
   getasetnos = `${this.environment.runtimeConfig.serverUrl}MainAssetMaster/GettingAssetNumber`;
   getttinasNames = `${this.environment.runtimeConfig.serverUrl}MainAssetMaster/GettingAssetName`;
   
   // Currency
   getCurrencyList = `${this.environment.runtimeConfig.serverUrl}Currency/GetCurrencyList`;
   registerCurrency = `${this.environment.runtimeConfig.serverUrl}masters/Currency/RegisterCurrency`;
   updateCurrency = `${this.environment.runtimeConfig.serverUrl}Currency/UpdateCurrency`;
   deleteCurrency = `${this.environment.runtimeConfig.serverUrl}masters/Currency/DeleteCurrency`;

   // Language
   getLanguageList = `${this.environment.runtimeConfig.serverUrl}Language/GetLanguageList`;
   registerLanguage = `${this.environment.runtimeConfig.serverUrl}masters/Language/RegisterLanguage`;
   updateLanguage = `${this.environment.runtimeConfig.serverUrl}Language/UpdateLanguage`;
   deleteLanguage = `${this.environment.runtimeConfig.serverUrl}masters/Language/DeleteLanguage`;

   // Sizes
   getSizesList = `${this.environment.runtimeConfig.serverUrl}Inventory/UOM/GetAllSizes`;
   registerSizesList = `${this.environment.runtimeConfig.serverUrl}Inventory/UOM/RegisterSizes`;
   updateSizesList = `${this.environment.runtimeConfig.serverUrl}Inventory/UOM/UpdateSize`;
   deleteSizesList = `${this.environment.runtimeConfig.serverUrl}Inventory/UOM/DeleteSize`;

   //country
   getcountryList = `${this.environment.runtimeConfig.serverUrl}Country/GetCountryList`;
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

   // company
   getCompanysList = `${this.environment.runtimeConfig.serverUrl}Company/GetCompanysList`;
   registerCompany = `${this.environment.runtimeConfig.serverUrl}masters/Company/RegisterCompany`;
   updateCompany = `${this.environment.runtimeConfig.serverUrl}masters/Company/UpdateCompany`;
   deleteCompany = `${this.environment.runtimeConfig.serverUrl}masters/Company/DeleteCompany`;

   // --- Segment
   getSegmentList = `${this.environment.runtimeConfig.serverUrl}Segment/GetSegmentList`;
   registerSegment = `${this.environment.runtimeConfig.serverUrl}Segment/RegisterSegment`;
   updateSegment = `${this.environment.runtimeConfig.serverUrl}Segment/UpdateSegment`;
   deleteSegment = `${this.environment.runtimeConfig.serverUrl}Segment/DeleteSegment`;

   // --- ProfitCenter
   getProfitCenterList = `${this.environment.runtimeConfig.serverUrl}ProfitCenter/GetProfitCenterList`;
   registerProfitCenters = `${this.environment.runtimeConfig.serverUrl}ProfitCenter/RegisterProfitCenters`;
   updateProfitCenters = `${this.environment.runtimeConfig.serverUrl}ProfitCenter/UpdateProfitCenters`;
   deleteProfitCenters = `${this.environment.runtimeConfig.serverUrl}ProfitCenter/DeleteProfitCenters`;

   // --- Branches
   getBranchesList = `${this.environment.runtimeConfig.serverUrl}Branches/GetBranchesList`;
   registerBranch = `${this.environment.runtimeConfig.serverUrl}Branches/RegisterBranch`;
   updateBranch = `${this.environment.runtimeConfig.serverUrl}Branches/UpdateBranch`;
   deleteBranches = `${this.environment.runtimeConfig.serverUrl}Branches/DeleteBranches`;

   // --- division
   getDivisionsList = `${this.environment.runtimeConfig.serverUrl}Division/GetDivisionsList`;
   registerDivision = `${this.environment.runtimeConfig.serverUrl}Division/RegisterDivision`;
   updateDivision = `${this.environment.runtimeConfig.serverUrl}Division/UpdateDivision`;
   deleteDivision = `${this.environment.runtimeConfig.serverUrl}Division/DeleteDivision`;

   //Fdepartment
   getfunctionaldeptList = `${this.environment.runtimeConfig.serverUrl}masters/FunctionalDepartment/GetFunctionalDepartment`;
   registerfunctionaldept = `${this.environment.runtimeConfig.serverUrl}masters/FunctionalDepartment/RegisterFunctionalDepartment`;
   updatefunctionaldept = `${this.environment.runtimeConfig.serverUrl}masters/FunctionalDepartment/UpdateFunctionalDepartment`;
   deletefunctionaldept = `${this.environment.runtimeConfig.serverUrl}masters/FunctionalDepartment/DeleteFunctionalDepartment`;

   // --- CostCenter  
   GetCostCenterList = `${this.environment.runtimeConfig.serverUrl}CostCenter/GetCostCenterList`;
   registerCostCenter = `${this.environment.runtimeConfig.serverUrl}masters/CostCenter/RegisterCostCenter`;
   updateCostCenter = `${this.environment.runtimeConfig.serverUrl}masters/CostCenter/UpdateCostCenter`;
   deleteCostCenter = `${this.environment.runtimeConfig.serverUrl}masters/CostCenter/DeleteCostCenter`;

   //plant
   getplantList = `${this.environment.runtimeConfig.serverUrl}Plant/GetPlant`;
   registerPlant = `${this.environment.runtimeConfig.serverUrl}Plant/RegisterPlant`;
   updatePlant = `${this.environment.runtimeConfig.serverUrl}Plant/UpdatePlant`;
   deletePlant = `${this.environment.runtimeConfig.serverUrl}Plant/DeletePlant`;

   //location  
   getlocationList = `${this.environment.runtimeConfig.serverUrl}Location/GetLocationList`;
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

   //salesoffice
   getsalesOfficeList = `${this.environment.runtimeConfig.serverUrl}masters/SalesOffice/GetSalesOfficeList`;
   registerSalesOffice = `${this.environment.runtimeConfig.serverUrl}masters/SalesOffice/RegisterSalesOffice`;
   updateSalesOffice = `${this.environment.runtimeConfig.serverUrl}masters/SalesOffice/UpdateSalesOffice`;
   deleteSalesOffice = `${this.environment.runtimeConfig.serverUrl}masters/SalesOffice/DeleteSalesOffice`;

   //distributionchannel
   getdistributionchannelList = `${this.environment.runtimeConfig.serverUrl}masters/DistributionChannel/GetDistributionChannelList`;
   registerDistributionChannel = `${this.environment.runtimeConfig.serverUrl}masters/DistributionChannel/RegisterDistributionChannel`;
   updateDistributionChannel = `${this.environment.runtimeConfig.serverUrl}masters/DistributionChannel/UpdateDistributionChannel`;
   deleteDistributionChannel = `${this.environment.runtimeConfig.serverUrl}masters/DistributionChannel/DeleteDistributionChannel`;

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
   ///************************ GL ************************** */
   //Ledger
   getLedgerList = `${this.environment.runtimeConfig.serverUrl}Ledger/GetLedgerList`;
   registerLedger = `${this.environment.runtimeConfig.serverUrl}Ledger/RegisterLedger`;
   updateLedger = `${this.environment.runtimeConfig.serverUrl}Ledger/UpdateLedger`;
   deleteLedger = `${this.environment.runtimeConfig.serverUrl}Ledger/DeletLedger`;

   //open Ledger
   getOpenLedgerList = `${this.environment.runtimeConfig.serverUrl}gl/OpenLedger/GetOpenLedgerList`;
   registerOpenLedger = `${this.environment.runtimeConfig.serverUrl}gl/OpenLedger/RegisterOpenLedger`;
   updateOpenLedger = `${this.environment.runtimeConfig.serverUrl}gl/OpenLedger/UpdateOpenLedgerList`;
   deleteOpenLedger = `${this.environment.runtimeConfig.serverUrl}gl/OpenLedger/DeleteOpenLedgerList`;

   //vocherclass
   getvocherclassList = `${this.environment.runtimeConfig.serverUrl}VoucherClass/GetVoucherClassList`;
   registerVoucherClass = `${this.environment.runtimeConfig.serverUrl}gl/VoucherClass /RegisterVoucherClass`;
   updateVoucherClass = `${this.environment.runtimeConfig.serverUrl}gl/VoucherClass /UpdateVoucherClass`;
   deleteVoucherClass = `${this.environment.runtimeConfig.serverUrl}gl/VoucherClass /DeleteVoucherClass`;

   //vocherseries
   getvocherseriesList = `${this.environment.runtimeConfig.serverUrl}VoucherSeries/GetVoucherSeriesList`;
   registerVoucherSeries = `${this.environment.runtimeConfig.serverUrl}VoucherSeries/RegisterVoucherSeries`;
   updateVoucherSeries = `${this.environment.runtimeConfig.serverUrl}VoucherSeries/UpdateVoucherSeries`;
   deleteVoucherSeries = `${this.environment.runtimeConfig.serverUrl}VoucherSeries/DeleteVoucherSeries`;

   //getassignmentvoucherseriestovouchertypeList
   getassignmentvoucherseriestovouchertypeList = `${this.environment.runtimeConfig.serverUrl}gl/AssignmentVoucherSeriestoVoucherType/GetAssignmentVoucherSeriestoVoucherTypeList`;
   registerAssignmentVoucherSeriestoVoucherType = `${this.environment.runtimeConfig.serverUrl}gl/AssignmentVoucherSeriestoVoucherType/RegisterAssignmentVoucherSeriestoVoucherType`;
   updateAssignmentVoucherSeriestoVoucherType = `${this.environment.runtimeConfig.serverUrl}gl/AssignmentVoucherSeriestoVoucherType/UpdateAssignmentVoucherSeriestoVoucherType`;
   deleteAssignmentVoucherSeriestoVoucherType = `${this.environment.runtimeConfig.serverUrl}gl/AssignmentVoucherSeriestoVoucherType/DeleteAssignmentVoucherSeriestoVoucherType`;

   // Voucher Types //
   getVoucherTypeList = `${this.environment.runtimeConfig.serverUrl}VoucherType/GetVoucherTypeList`;
   registerVoucherTypes = `${this.environment.runtimeConfig.serverUrl}VoucherType/RegisterVoucherTypes`;
   updateVoucherTypes = `${this.environment.runtimeConfig.serverUrl}VoucherType/UpdateVoucherTypes`;
   deleteVoucherTypes = `${this.environment.runtimeConfig.serverUrl}VoucherType/DeleteVoucherTypes`;

   ////***************TAX***************** */
   //taxacctotaxcode
   getAssignTaxacctoTaxcodeList = `${this.environment.runtimeConfig.serverUrl}AssignTaxacctoTaxcode/GetAssignTaxacctoTaxcodeList`;
   registerAssignTaxacctoTaxcode = `${this.environment.runtimeConfig.serverUrl}AssignTaxacctoTaxcode/RegisterAssignTaxacctoTaxcode`;
   updateAssignTaxacctoTaxcode = `${this.environment.runtimeConfig.serverUrl}AssignTaxacctoTaxcode/UpdateAssignTaxacctoTaxcode`;
   deleteAssignTaxacctoTaxcode = `${this.environment.runtimeConfig.serverUrl}AssignTaxacctoTaxcode/DeletAssignTaxacctoTaxcode`;

   // HSNSAC
   getHsnSacList = `${this.environment.runtimeConfig.serverUrl}HsnSac/GetHsnSacList`;
   registerHsnSac = `${this.environment.runtimeConfig.serverUrl}HsnSac/RegisterHsnSac`;
   updateHsnSac = `${this.environment.runtimeConfig.serverUrl}HsnSac/UpdateHsnSac`;
   deleteHsnSac = `${this.environment.runtimeConfig.serverUrl}HsnSac/DeleteHsnSac`;
   // AlternateControlAccount
   getAlternateControlAccountList = `${this.environment.runtimeConfig.serverUrl}AlternateControlAccount/GetAlternateControlAccountList`;
   registerAlternateControlAccount = `${this.environment.runtimeConfig.serverUrl}AlternateControlAccount/RegisterAlternateControlAccount`;
   updateAlternateControlAccount = `${this.environment.runtimeConfig.serverUrl}AlternateControlAccount/UpdateAlternateControlAccount`;
   deleteAlternateControlAccount = `${this.environment.runtimeConfig.serverUrl}AlternateControlAccount/DeleteAlternateControlAccount`;
   //Depreciationareas
   getDepreciationAreasList = `${this.environment.runtimeConfig.serverUrl}DepreciationAreas/GetDepreciationAreasList`;
   registerDepreciationAreas = `${this.environment.runtimeConfig.serverUrl}DepreciationAreas/RegisterDepreciationAreas`;
   updateDepreciationAreas = `${this.environment.runtimeConfig.serverUrl}DepreciationAreas/UpdateDepreciationAreas`;
   deleteDepreciationAreas = `${this.environment.runtimeConfig.serverUrl}DepreciationAreas/DeleteDepreciationAreas`;
   //Assetclass
   getAssetClassList = `${this.environment.runtimeConfig.serverUrl}AssetClass/GetAssetClassList`;
   registerAssetClass = `${this.environment.runtimeConfig.serverUrl}AssetClass/RegisterAssetClass`;
   updateAssetClass = `${this.environment.runtimeConfig.serverUrl}AssetClass/UpdateAssetClass`;
   deleteAssetClass = `${this.environment.runtimeConfig.serverUrl}AssetClass/DeleteAssetClass`;
   //Assetblock
   getAssetBlockList = `${this.environment.runtimeConfig.serverUrl}AssetBlock/GetAssetBlockList`;
   registerAssetBlock = `${this.environment.runtimeConfig.serverUrl}AssetBlock/RegisterAssetBlock`;
   updateAssetBlock = `${this.environment.runtimeConfig.serverUrl}AssetBlock/UpdateAssetBlock`;
   deleteAssetBlock = `${this.environment.runtimeConfig.serverUrl}AssetBlock/DeleteAssetBlock`;

   // Tax Types //
   getTaxTypesList = `${this.environment.runtimeConfig.serverUrl}TaxTypes/GetTaxTypesList`;
   registerTaxTypes = `${this.environment.runtimeConfig.serverUrl}TaxTypes/RegisterTaxTypes`;
   updateTaxTypes = `${this.environment.runtimeConfig.serverUrl}TaxTypes/UpdateTaxTypes`;
   deleteTaxTypes = `${this.environment.runtimeConfig.serverUrl}TaxTypes/DeleteTaxTypes`;

   //assignglaccount //
   getAssignGLaccounttoSubGroupList = `${this.environment.runtimeConfig.serverUrl}AssignGLaccounttoSubGroup/GetAssignGLaccounttoSubGroupList`;
   registerAssignGLaccounttoSubGroupList = `${this.environment.runtimeConfig.serverUrl}AssignGLaccounttoSubGroup/RegisterAssignGLaccounttoSubGroup`;
   updateAssignGLaccounttoSubGroupList = `${this.environment.runtimeConfig.serverUrl}AssignGLaccounttoSubGroup/UpdateAssignGLaccounttoSubGroup`;
   deleteAssignGLaccounttoSubGroupList = `${this.environment.runtimeConfig.serverUrl}AssignGLaccounttoSubGroup/DeleteAssignGLaccounttoSubGroup`;
   subgrouplist = `${this.environment.runtimeConfig.serverUrl}AssignGLaccounttoSubGroup/GetGLUnderSubGroupList`;

   //TaxRates
   gettaxratesList = `${this.environment.runtimeConfig.serverUrl}TaxRates/GetTaxRatesList`;
   registerTaxRates = `${this.environment.runtimeConfig.serverUrl}TaxRates/RegisterTaxRates`;
   updateTaxRates = `${this.environment.runtimeConfig.serverUrl}TaxRates/UpdateTaxRates`;
   deleteTaxRates = `${this.environment.runtimeConfig.serverUrl}TaxRates/DeleteTaxRates`;

   // Tax transaction //
   getTaxTransactionList = `${this.environment.runtimeConfig.serverUrl}TaxTransaction/GetTaxTransactionList`;
   registerTaxTransaction = `${this.environment.runtimeConfig.serverUrl}TaxTransaction/RegisterTaxTransaction`;
   updateTaxTransaction = `${this.environment.runtimeConfig.serverUrl}TaxTransaction/UpdateTaxTransaction`;
   deleteTaxTransaction = `${this.environment.runtimeConfig.serverUrl}TaxTransaction/DeleteTaxTransaction`;

   //tdstypes
   getTDStypeList = `${this.environment.runtimeConfig.serverUrl}TDStype/GetTDStypeList`;
   registerTDStype = `${this.environment.runtimeConfig.serverUrl}TDStype/RegisterTDStype`;
   updateTDStype = `${this.environment.runtimeConfig.serverUrl}TDStype/UpdateTDStype`;
   deleteTDStype = `${this.environment.runtimeConfig.serverUrl}TDStype/DeleteTDStype`;

   //incometype
   getIncomeTypeList = `${this.environment.runtimeConfig.serverUrl}IncomeType/GetIncomeTypeList`;
   registerIncomeType = `${this.environment.runtimeConfig.serverUrl}IncomeType/RegisterIncomeType`;
   updateIncomeType = `${this.environment.runtimeConfig.serverUrl}IncomeType/UpdateIncomeType`;
   deleteIncomeType = `${this.environment.runtimeConfig.serverUrl}IncomeType/DeleteIncomeType`;

   //tdsrates
   getTDSRatesList = `${this.environment.runtimeConfig.serverUrl}TDSRates/GetTDSRatesList`;
   registerTDSRates = `${this.environment.runtimeConfig.serverUrl}TDSRates/RegisterTDSRates`;
   updateTDSRates = `${this.environment.runtimeConfig.serverUrl}TDSRates/UpdateTDSRates`;
   deleteTDSRates = `${this.environment.runtimeConfig.serverUrl}TDSRates/DeleteTDSRates`;

   //posting
   getPostingList = `${this.environment.runtimeConfig.serverUrl}Posting/GetPostingList`;
   registerPosting = `${this.environment.runtimeConfig.serverUrl}Posting/RegisterPosting`;
   updatePosting = `${this.environment.runtimeConfig.serverUrl}Posting/UpdatePosting`;
   deletePosting = `${this.environment.runtimeConfig.serverUrl}Posting/DeletePosting`;

   // AccountsGroup //
   getAccountsGroupList = `${this.environment.runtimeConfig.serverUrl}AccGroup/GetAccountGroupList`;
   registerGlaccGroup = `${this.environment.runtimeConfig.serverUrl}AccGroup/RegisterGlaccGroup`;
   updateAccountGroup = `${this.environment.runtimeConfig.serverUrl}AccGroup/UpdateAccountGroup`;
   deleteAccountGroup = `${this.environment.runtimeConfig.serverUrl}AccGroup/DeleteAccountGroup`;

   // glaccount //
   getGLAccountList = `${this.environment.runtimeConfig.serverUrl}GLAccount/GetGLAccountList`;
   registerGLAccount = `${this.environment.runtimeConfig.serverUrl}GLAccount/RegisterGLAccount`;
   updateGLAccount = `${this.environment.runtimeConfig.serverUrl}GLAccount/UpdateGLAccount`;
   deleteGLAccount = `${this.environment.runtimeConfig.serverUrl}GLAccount/DeleteGLAccount`;
   GLAccountinChartAccountList = `${this.environment.runtimeConfig.serverUrl}GLAccount/GetChartAccountList`;
   getaccountNumber = `${this.environment.runtimeConfig.serverUrl}GLAccount/GetaccountNumberList`;
   // Deprecitioncode //
   getDepreciationcodeList = `${this.environment.runtimeConfig.serverUrl}Depreciationcode/GetDepreciationcodeList`;
   registerDepreciationcode = `${this.environment.runtimeConfig.serverUrl}Depreciationcode/RegisterDepreciationcode`;
   updateDepreciationcode = `${this.environment.runtimeConfig.serverUrl}Depreciationcode/UpdateDepreciationcode`;
   deleteDepreciationcode = `${this.environment.runtimeConfig.serverUrl}Depreciationcode/DeleteDepreciationcode`;

   // UnderSubGroup //
   getGLUnderSubGroupList = `${this.environment.runtimeConfig.serverUrl}GLAccUnderSubGroup/GetTblAccountGroupList`;
   getAccountNamelist = `${this.environment.runtimeConfig.serverUrl}GLAccUnderSubGroup/GetAccountNamelist`;
   getGLUnderGroupList = `${this.environment.runtimeConfig.serverUrl}GLAccUnderSubGroup/GetAccountGrouplist`;
   registerGLUnderSubGroup = `${this.environment.runtimeConfig.serverUrl}GLAccUnderSubGroup/RegisterTblAccGroup`;
   updateGLAccUnderSubGroup = `${this.environment.runtimeConfig.serverUrl}GLAccUnderSubGroup/UpdateTblAccountGroup`;
   deleteGLAccUnderSubGroup = `${this.environment.runtimeConfig.serverUrl}GLAccUnderSubGroup/DeleteTblAccountGroup`;
   getglAccgrpList = `${this.environment.runtimeConfig.serverUrl}GLAccUnderSubGroup/GetGLAccountGrouplist`;
   getAccountSubGrouplist = `${this.environment.runtimeConfig.serverUrl}GLAccUnderSubGroup/GetAccountSubGrouplist`;

   //assignment
   getAssignmentList = `${this.environment.runtimeConfig.serverUrl}Assignment/GetAssignmentList`;
   registerAssignment = `${this.environment.runtimeConfig.serverUrl}Assignment/RegisterAssignment`;
   updateAssignment = `${this.environment.runtimeConfig.serverUrl}Assignment/UpdateAssignment`;
   deleteAssignment = `${this.environment.runtimeConfig.serverUrl}Assignment/DeleteAssignment`;

   //numberrange
   getNumberRangeList = `${this.environment.runtimeConfig.serverUrl}NumberRange/GetNumberRangeList`;
   registerNumberRange = `${this.environment.runtimeConfig.serverUrl}NumberRange/RegisterNumberRange`;
   updateNumberRange = `${this.environment.runtimeConfig.serverUrl}NumberRange/UpdateNumberRange`;
   deleteNumberRange = `${this.environment.runtimeConfig.serverUrl}NumberRange/DeleteNumberRange`;

   //partnertype
   getPartnerTypeList = `${this.environment.runtimeConfig.serverUrl}PartnerType/GetPartnerTypeList`;
   registerPartnerType = `${this.environment.runtimeConfig.serverUrl}PartnerType/RegisterPartnerType`;
   updatePartnerType = `${this.environment.runtimeConfig.serverUrl}PartnerType/UpdatePartnerType`;
   deletePartnerType = `${this.environment.runtimeConfig.serverUrl}PartnerType/DeletePartnerType`;

   //partnergroup
   getBusienessPartnerGroupsList = `${this.environment.runtimeConfig.serverUrl}BusienessPartnerGroups/GetBusienessPartnerGroupsList`;
   registerBusienessPartnerGroups = `${this.environment.runtimeConfig.serverUrl}BusienessPartnerGroups/RegisterBusienessPartnerGroups`;
   updateBusienessPartnerGroups = `${this.environment.runtimeConfig.serverUrl}BusienessPartnerGroups/UpdateBusienessPartnerGroups`;
   deleteBusienessPartnerGroups = `${this.environment.runtimeConfig.serverUrl}BusienessPartnerGroups/DeleteBusienessPartnerGroups`;
   getAssetNumbers = `${this.environment.runtimeConfig.serverUrl}BusienessPartnerGroups/GetAssetNumber`;
   //chartofaccount
   getChartOfAccountList = `${this.environment.runtimeConfig.serverUrl}ChartOfAccount/GetChartOfAccountList`;
   registerChartOfAccount = `${this.environment.runtimeConfig.serverUrl}ChartOfAccount/RegisterChartOfAccount`;
   updateChartOfAccount = `${this.environment.runtimeConfig.serverUrl}ChartOfAccount/UpdateChartOfAccount`;
   deleteChartOfAccount = `${this.environment.runtimeConfig.serverUrl}ChartOfAccount/DeleteChartOfAccount`;
   //chartofaccounttotax code to compcode
   getAssiignChartAcctoCompanyCodeList = `${this.environment.runtimeConfig.serverUrl}AssiignChartAcctoCompanyCode/GetAssiignChartAcctoCompanyCodeList`;
   registerAssiignChartAcctoCompanyCode = `${this.environment.runtimeConfig.serverUrl}AssiignChartAcctoCompanyCode/RegisterAssiignChartAcctoCompanyCode`;
   updateAssiignChartAcctoCompanyCode = `${this.environment.runtimeConfig.serverUrl}AssiignChartAcctoCompanyCode/UpdateAssiignChartAcctoCompanyCode`;
   deleteAssiignChartAcctoCompanyCode = `${this.environment.runtimeConfig.serverUrl}AssiignChartAcctoCompanyCode/DeleteAssiignChartAcctoCompanyCode`;
   //assetnumberrange
   getAssetNumberRangeList = `${this.environment.runtimeConfig.serverUrl}AssetNumberRange/GetAssetNumberRangeList`;
   registerAssetNumberRange = `${this.environment.runtimeConfig.serverUrl}AssetNumberRange/RegisterAssetNumberRange`;
   updateAssetNumberRange = `${this.environment.runtimeConfig.serverUrl}AssetNumberRange/UpdateAssetNumberRange`;
   deleteAssetNumberRange = `${this.environment.runtimeConfig.serverUrl}AssetNumberRange/DeleteAssetNumberRange`;

   //accountkey
   getAccountKeyList = `${this.environment.runtimeConfig.serverUrl}AccountKey/GetAccountKeyList`;
   registerAccountKey = `${this.environment.runtimeConfig.serverUrl}AccountKey/RegisterAccountKey`;
   updateAccountKey = `${this.environment.runtimeConfig.serverUrl}AccountKey/UpdateAccountKey`;
   deleteAccountKey = `${this.environment.runtimeConfig.serverUrl}AccountKey/DeleteAccountKey`;

   //subasset
   getSubAssetsList = `${this.environment.runtimeConfig.serverUrl}SubAssets/GetSubAssetsList`;
   registerSubAssetsList = `${this.environment.runtimeConfig.serverUrl}SubAssets/RegisterSubAssetsList`;
   updateSubAssetsList = `${this.environment.runtimeConfig.serverUrl}SubAssets/UpdateSubAssetsList`;
   deleteSubAssetsList = `${this.environment.runtimeConfig.serverUrl}SubAssets/DeleteSubAssetsList`;
   GetListsforMainAsset = `${this.environment.runtimeConfig.serverUrl}SubAssets/GetMainAsset`;
   //assetbegningaccumulateddepreciation
   getAssetBegningAccumulatedDepreciationList = `${this.environment.runtimeConfig.serverUrl}AssetBegningAccumulatedDepreciation/GetAssetBegningAccumulatedDepreciationList`;
   registerAssetBegningAccumulatedDepreciation = `${this.environment.runtimeConfig.serverUrl}AssetBegningAccumulatedDepreciation/RegisterAssetBegningAccumulatedDepreciation`;
   updateAssetBegningAccumulatedDepreciation = `${this.environment.runtimeConfig.serverUrl}AssetBegningAccumulatedDepreciation/UpdateAssetBegningAccumulatedDepreciation`;
   deleteAssetBegningAccumulatedDepreciation = `${this.environment.runtimeConfig.serverUrl}AssetBegningAccumulatedDepreciation/DeleteAssetBegningAccumulatedDepreciation`;

   //assetbegningacqusition
   getAssetBegningAcqusitionList = `${this.environment.runtimeConfig.serverUrl}AssetBegningAcqusition/GetAssetBegningAcqusitionList`;
   registerAssetBegningAcqusition = `${this.environment.runtimeConfig.serverUrl}AssetBegningAcqusition/RegisterAssetBegningAcqusition`;
   updateAssetBegningAcqusition = `${this.environment.runtimeConfig.serverUrl}AssetBegningAcqusition/UpdateAssetBegningAcqusition`;
   deleteAssetBegningAcqusition = `${this.environment.runtimeConfig.serverUrl}AssetBegningAcqusition/DeleteAssetBegningAcqusition`;

   //bankmaster
   getBankMasterList = `${this.environment.runtimeConfig.serverUrl}BankMaster/GetBankMasterList`;
   registerBankMaster = `${this.environment.runtimeConfig.serverUrl}BankMaster/RegisterBankMaster`;
   updateBankMaster = `${this.environment.runtimeConfig.serverUrl}BankMaster/UpdateBankMaster`;
   deleteBankMaster = `${this.environment.runtimeConfig.serverUrl}BankMaster/DeleteBankMaster`;
   //AssignmentsAccountKeytoAssetClass
   getAssignmentAccountKeytoAssetClassList = `${this.environment.runtimeConfig.serverUrl}AssignmentAccountKeytoAssetClass/GetAssignmentAccountKeytoAssetClassList`;
   registerAssignmentAccountKeytoAssetClass = `${this.environment.runtimeConfig.serverUrl}AssignmentAccountKeytoAssetClass/RegisterAssignmentAccountKeytoAssetClass`;
   updateAssignmentAccountKeytoAssetClass = `${this.environment.runtimeConfig.serverUrl}AssignmentAccountKeytoAssetClass/UpdateAssignmentAccountKeytoAssetClass`;
   deleteAssignmentAccountKeytoAssetClass = `${this.environment.runtimeConfig.serverUrl}AssignmentAccountKeytoAssetClass/DeleteAssignmentAccountKeytoAssetClass`;

   //assetransactiontype
   getAssetTransactionTypeList = `${this.environment.runtimeConfig.serverUrl}AssetTransactionType/GetAssetTransactionTypeList`;
   registerAssetTransactionType = `${this.environment.runtimeConfig.serverUrl}AssetTransactionType/RegisterAssetTransactionType`;
   updateAssetTransactionType = `${this.environment.runtimeConfig.serverUrl}AssetTransactionType/UpdateAssetTransactionType`;
   deleteAssetTransactionType = `${this.environment.runtimeConfig.serverUrl}AssetTransactionType/DeleteAssetTransactionType`;
   //AssignmentAssetClasstoAssetBlock
   getAseetClassToAssetBlockList = `${this.environment.runtimeConfig.serverUrl}AseetClassToAssetBlock/GetAseetClassToAssetBlockList`;
   registerAseetClassToAssetBlock = `${this.environment.runtimeConfig.serverUrl}AseetClassToAssetBlock/RegisterAseetClassToAssetBlock`;
   updateAseetClassToAssetBlock = `${this.environment.runtimeConfig.serverUrl}AseetClassToAssetBlock/UpdateAseetClassToAssetBlock`;
   deleteAseetClassToAssetBlock = `${this.environment.runtimeConfig.serverUrl}AseetClassToAssetBlock/DeleteAseetClassToAssetBlock`;

   //glsubaccount
   getGLSubAccountList = `${this.environment.runtimeConfig.serverUrl}GLSubAccount/GetGLSubAccountList`;
   registerGLSubAccount = `${this.environment.runtimeConfig.serverUrl}GLSubAccount/RegisterGLSubAccount`;
   updateGLSubAccount = `${this.environment.runtimeConfig.serverUrl}GLSubAccount/UpdateGLSubAccount`;
   deleteGLSubAccount = `${this.environment.runtimeConfig.serverUrl}GLSubAccount/DeleteGLSubAccount`;
   getStructurekeyList = `${this.environment.runtimeConfig.serverUrl}AssignGLaccounttoSubGroup/GetStructurekeyList`;

   //businesstransactiontypes
   getBusienessTransactionTypeList = `${this.environment.runtimeConfig.serverUrl}BusienessTransactionType/GetBusienessTransactionTypeList`;
   registerBusienessTransactionType = `${this.environment.runtimeConfig.serverUrl}BusienessTransactionType/RegisterBusienessTransactionType`;
   updateBusienessTransactionType = `${this.environment.runtimeConfig.serverUrl}BusienessTransactionType/UpdateBusienessTransactionType`;
   deleteBusienessTransactionType = `${this.environment.runtimeConfig.serverUrl}BusienessTransactionType/DeleteBusienessTransactionType`;
   // --- Employee
   GetEmployeesList = `${this.environment.runtimeConfig.serverUrl}Branches/GetEmployeesList`;
   registerEmployee = `${this.environment.runtimeConfig.serverUrl}Employee/RegisterEmployee`;
   updateEmployee = `${this.environment.runtimeConfig.serverUrl}Employee/UpdateEmployee`;
   deleteEmployee = `${this.environment.runtimeConfig.serverUrl}Employee/DeleteEmployee`;
   getCashPaymentBranchesList = `${this.environment.runtimeConfig.serverUrl}transactions/CashPayment/GetBranchesList`;
   //erpuser
   getrolelist = `${this.environment.runtimeConfig.serverUrl}masters/UserCreation/GetRoleList`;
   geterpuserList = `${this.environment.runtimeConfig.serverUrl}masters/UserCreation/GetUserCreation`;
   registerUserCreation = `${this.environment.runtimeConfig.serverUrl}masters/UserCreation/RegisterUserCreation`;
   updateUserCreation = `${this.environment.runtimeConfig.serverUrl}masters/UserCreation/UpdateUserCreation`;
   deleteUserCreation = `${this.environment.runtimeConfig.serverUrl}masters/UserCreation/DeleteUserCreation`;
   /**************************** Settings ********************************************************* */
   getRoles = `${this.environment.runtimeConfig.serverUrl}Auth/getRoles`;
   getParentMenus = `${this.environment.runtimeConfig.serverUrl}Auth/getParentMenu`;
   getMenuList = `${this.environment.runtimeConfig.serverUrl}Auth/getMenuList`;
   giveAccess = `${this.environment.runtimeConfig.serverUrl}Auth/GiveAccess`;
   getMenuUrl = `${this.environment.runtimeConfig.serverUrl}Auth/getMenu`;

   /******************************* Cash Bank ****************************************************** */

   getTransactionTypes = `${this.environment.runtimeConfig.serverUrl}Transactions/GetTransactionTypes`;
   getAccountingIndicator = `${this.environment.runtimeConfig.serverUrl}Transactions/GetAccountingIndicator`;
   getNatureOfTransaction = `${this.environment.runtimeConfig.serverUrl}Transactions/GetNatureOfTransaction`;
   addCashBank = `${this.environment.runtimeConfig.serverUrl}Transactions/AddCashBank`;
   getCashBankDetail = `${this.environment.runtimeConfig.serverUrl}Transactions/GetCashBankDetail`;
   getCashBankMaster = `${this.environment.runtimeConfig.serverUrl}Transactions/GetCashBankMaster`;
   getSegments = `${this.environment.runtimeConfig.serverUrl}Transactions/GetSegments`;
}