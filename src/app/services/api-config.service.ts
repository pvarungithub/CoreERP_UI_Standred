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
   getGLAccountsList = `${this.environment.runtimeConfig.serverUrl}Common/GetGLAccountsList`;
   getProfitCentersList = `${this.environment.runtimeConfig.serverUrl}Common/GetProfitCentersList`;
   getCostCentersList = `${this.environment.runtimeConfig.serverUrl}Common/GetCostCentersList`;
   getTaxRatesList = `${this.environment.runtimeConfig.serverUrl}TaxRates/GetTaxRatesList`;
   getBPList = `${this.environment.runtimeConfig.serverUrl}Common/GetBPList`;
   getAssetMasterList = `${this.environment.runtimeConfig.serverUrl}Common/GetMainAssetMasterList`;
   getSubAssetMasterList = `${this.environment.runtimeConfig.serverUrl}Common/GetSubAssetMasterList`;

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
}