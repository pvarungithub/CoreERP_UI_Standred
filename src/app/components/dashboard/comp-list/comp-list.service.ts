import { Injectable } from '@angular/core';
import { CompanyComponent } from './company/company.component';
import { BranchesComponent } from './branches/branches.component';
import { CostCenterComponent } from './cost-center/cost-center.component';
import { LanguageComponent } from './language/language.component';
import { CurrencyComponent } from './currency/currency.component';
import { CountryComponent } from './country/country.component';
import { RegionComponent } from './region/region.component';
import { StateComponent } from './state/state.component';
import { UOMComponent } from './sizes/sizes.component';
import { SegmentComponent } from './segment/segment.component';
import { ProfitCenterComponent } from './profit-center/profit-center.component';
import { DivisionComponent } from './division/division.component';
import { FunctionalDepartmentComponent } from './functionaldepatment/functionaldepartment.component';
import { PlantsComponent } from './plants/plants.component';
import { LocationsComponent } from './location/location.component';
import { SalesDepartmentComponent } from './salesdepartment/salesdepartment.component';
import { DistributionchannelsComponent } from './distributionchannel/distributionchannel.component';
import { SalesofficeComponent } from './salesoffice/salesoffice.component';
import { SalesGroupComponent } from './salesgroup/salesgroup.component';
import { MaintenceAreaComponent } from './maintencearea/maintencearea.component';
import { PurchaseDepartmentComponent } from './purchasedepartment/purchasedepartment.component';
import { StorageLocationsComponent } from './storagelocation/storagelocation.component';
import { ErpUsersComponent } from './erpuser/erpuser.componet';
import { LedgerComponent } from './ledger/ledger.component';
import { OpenLedgerComponent } from './openledger/openledger.component';
import { VoucherClassComponent } from './voucherclass/voucherclass.component';
import { VoucherTypesComponent } from './vouchertypes/vouchertypes.component';
import { VoucherSeriesComponents } from './voucherseries/voucherseries.component';
import { AssignmentVoucherSeriestoVoucherTypesComponent } from './assignmentvoucherseriestovouchertype/assignmentvoucherseriestovouchertype.component';
import { TaxRatesComponents } from './taxrates/taxrates.component';
import { TaxTransactionComponent } from './taxtransaction/taxtransaction.component';
import { TaxIntegrationComponent } from './taxintegration/taxintegration.component';
import { AssignmentoftaxaccountstotaxcodesComponent } from './assignmentoftaxaccountstotaxcodes/assignmentoftaxaccountstotaxcodes.component';
import { HsnSacComponent } from './hsnsac/hsnsac.component';
import { TDSComponent } from './tdstype/tdstype.component';
import { IncomeTypeComponent } from './incometypes/incometypes.component';
import { TdsRatesComponent } from './tdsrates/tdsrates.component';
import { PostingComponent } from './posting/posting.component';
import {AccountsGroupComponent} from './accountsgroup/accountsgroup.component';
import {UndersubGroupComponent} from './undersubgroup/undersubgroup.component';
import { AccountchartComponent } from './chartofaccount/chartofaccount.component';
import { PartnerTypesComponent } from './partnertype/partnertype.component';
import{AssignmentChartAccounttoCompanyComponent} from './AssignmentChartAccounttoCompany/AssignmentChartAccounttoCompany.component';
import { BusienessPartnerGroupsComponent } from './partnergroup/partnergroup.component';
import { NumberRangeComponent } from './numberrange/numberrange.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { AlternateControlAccountComponent } from './AlternateControlAccount/AlternateControlAccount.component';
import { DepreciationareasComponent } from './Depreciationareas/Depreciationareas.component';
import { AssetClassComponent } from './AssetClass/AssetClass.component';
import { AssetBlockComponent } from './assetblock/assetblock.component';
import { PaymentTermsComponent } from './paymentterms/paymentterms.component';
import { AssetNumberRangeComponent } from './assetnumberrange/assetnumberrange.component';
import{AseetClassToAssetBlockComponent} from './AssignmentAssetClasstoAssetBlock/AssignmentAssetClasstoAssetBlock.component';
import{AssetTransactionTypeComponent} from './assettransactiontypes/assettransactiontypes.component';
import{AccountKeyComponent} from './accountkey/accountkey.component';
import{BankMasterComponent} from './bankmaster/bankmaster.component';
import{AssignmentAccountKeytoAssetClassComponent} from './AssignmentsAccountKeytoAssetClass/AssignmentsAccountKeytoAssetClass.component';
import{DepreciationcodeComponent} from './depreciationcode/depreciationcode.component';
import{BusienessPartnerAccountComponent} from './businesspartner/businesspartner.component';
import{GLAccountComponent} from './glaccount/glaccount.component';
import{MainAssetMasterComponent} from './mainassetmasters/mainassetmasters.component';
import{SubAssetsComponent} from './subassets/subassets.component';
import{AssignGLaccounttoSubGroupComponent} from './assignglaccount/assignglaccount.component';
import{GLSubAccountComponent} from './glsubaccount/glsubaccount.component';
import{AssetBegningAcqusitionComponent} from './assetbegningacqusition/assetbegningacqusition.component';
import{BusienessTransactionTypeComponent} from './businesstransactiontypes/businesstransactiontypes.component';
import{AssetBegningAccumulatedDepreciationComponent} from './assetbegningaccumulateddepreciation/assetbegningaccumulateddepreciation.component';
@Injectable({
  providedIn: 'root'
})
export class CompListService {
  dynamicComp = { component: null };

  constructor() { }

  getDynComponents(data) {
    switch (data) {
      case 'assignglaccount':
        this.dynamicComp.component = AssignGLaccounttoSubGroupComponent;
        return this.dynamicComp.component;
        break;
        case 'glsubaccount':
          this.dynamicComp.component = GLSubAccountComponent;
          return this.dynamicComp.component;
          break;
          case 'assetbegningacqusition':
          this.dynamicComp.component = AssetBegningAcqusitionComponent;
          return this.dynamicComp.component;
          break;
          case 'businesstransactiontypes':
            this.dynamicComp.component = BusienessTransactionTypeComponent;
            return this.dynamicComp.component;
            break;
          case 'assetbegningaccumulateddepreciation':
            this.dynamicComp.component = AssetBegningAccumulatedDepreciationComponent;
            return this.dynamicComp.component;
            break;
      case 'company':
        this.dynamicComp.component = CompanyComponent;
        return this.dynamicComp.component;
        break;
      
      case 'branches':
        this.dynamicComp.component = BranchesComponent;
        return this.dynamicComp.component;
        break;
      case 'costcenter':
        this.dynamicComp.component = CostCenterComponent;
        return this.dynamicComp.component;
        break;
      case 'language':
        this.dynamicComp.component = LanguageComponent;
        return this.dynamicComp.component;
        break;
      case 'currency':
        this.dynamicComp.component = CurrencyComponent;
        return this.dynamicComp.component;
        break;
      case 'country':
        this.dynamicComp.component = CountryComponent;
        return this.dynamicComp.component;
        break;
      case 'region':
        this.dynamicComp.component = RegionComponent;
        return this.dynamicComp.component;
        break;
      case 'state':
        this.dynamicComp.component = StateComponent;
        return this.dynamicComp.component;
        break;
      case 'sizes':
        this.dynamicComp.component = UOMComponent;
        return this.dynamicComp.component;
        break;
      case 'segment':
        this.dynamicComp.component = SegmentComponent;
        return this.dynamicComp.component;
        break;
      case 'profitCenter':
        this.dynamicComp.component = ProfitCenterComponent;
        return this.dynamicComp.component;
        break;
      case 'division':
        this.dynamicComp.component = DivisionComponent;
        return this.dynamicComp.component;
        break;
      case 'functionaldepatment':
        this.dynamicComp.component = FunctionalDepartmentComponent;
        return this.dynamicComp.component;
        break;
      case 'plant':
        this.dynamicComp.component = PlantsComponent;
        return this.dynamicComp.component;
        break;
        break;
      case 'location':
        this.dynamicComp.component = LocationsComponent;
        return this.dynamicComp.component;
        break;
      case 'salesdepartment':
        this.dynamicComp.component = SalesDepartmentComponent;
        return this.dynamicComp.component;
        break;
      case 'distributionchannel':
        this.dynamicComp.component = DistributionchannelsComponent;
        return this.dynamicComp.component;
        break;
      case 'salesoffice':
        this.dynamicComp.component = SalesofficeComponent;
        return this.dynamicComp.component;
        break;
      case 'salesgroup':
        this.dynamicComp.component = SalesGroupComponent;
        return this.dynamicComp.component;
        break;
      case 'maintenancearea':
        this.dynamicComp.component = MaintenceAreaComponent;
        return this.dynamicComp.component;
        break;
      case 'purchasedepartment':
        this.dynamicComp.component = PurchaseDepartmentComponent;
        return this.dynamicComp.component;
        break;
      case 'storagelocation':
        this.dynamicComp.component = StorageLocationsComponent;
        return this.dynamicComp.component;
        break;
      case 'erpuser':
        this.dynamicComp.component = ErpUsersComponent;
        return this.dynamicComp.component;
        break;
      case 'ledger':
        this.dynamicComp.component = LedgerComponent;
        return this.dynamicComp.component;
        break;
      case 'openledger':
        this.dynamicComp.component = OpenLedgerComponent;
        return this.dynamicComp.component;
        break;
      case 'voucherclass':
        this.dynamicComp.component = VoucherClassComponent;
        return this.dynamicComp.component;
        break;
      case 'vouchertype':
        this.dynamicComp.component = VoucherTypesComponent;
        return this.dynamicComp.component;
        break;
      case 'voucherseries':
        this.dynamicComp.component = VoucherSeriesComponents;
        return this.dynamicComp.component;
        break;
      case 'assignmentofvoucherseriestovouchertype':
        this.dynamicComp.component = AssignmentVoucherSeriestoVoucherTypesComponent;
        return this.dynamicComp.component;
        break;
      case 'taxrates':
        this.dynamicComp.component = TaxRatesComponents;
        return this.dynamicComp.component;
        break;
      case 'taxtransactions':
        this.dynamicComp.component = TaxTransactionComponent;
        return this.dynamicComp.component;
        break;
       case 'taxtypes':
        this.dynamicComp.component = TaxIntegrationComponent;
        return this.dynamicComp.component;
        break;
      case 'assignmentoftaxaccountstotaxcodes':
        this.dynamicComp.component = AssignmentoftaxaccountstotaxcodesComponent;
        return this.dynamicComp.component;
        break; 
        case 'hsnsac':
        this.dynamicComp.component = HsnSacComponent;
        return this.dynamicComp.component;
        break;
      case 'tdstypes':
        this.dynamicComp.component = TDSComponent;
        return this.dynamicComp.component;
        break; 
        case 'incometypes':
        this.dynamicComp.component = IncomeTypeComponent;
        return this.dynamicComp.component;
        break; 
      case 'tdsrates':
        this.dynamicComp.component = TdsRatesComponent;
        return this.dynamicComp.component;
        break; 
      case 'posting':
        this.dynamicComp.component = PostingComponent;
        return this.dynamicComp.component;
        break; 
      case 'accountgroup':
        this.dynamicComp.component = AccountsGroupComponent;
        return this.dynamicComp.component;
        break; 
      case 'glsubgroups':
        this.dynamicComp.component = UndersubGroupComponent;
        return this.dynamicComp.component;
      break; 
      case 'accountchart':
        this.dynamicComp.component = AccountchartComponent;
        return this.dynamicComp.component;
      break; 
      case 'AssignmentChartAccounttoCompany':
        this.dynamicComp.component = AssignmentChartAccounttoCompanyComponent;
        return this.dynamicComp.component;
      break; 
      case 'partnertype':
        this.dynamicComp.component = PartnerTypesComponent;
        return this.dynamicComp.component;
      break; 
      case 'partnergroup':
        this.dynamicComp.component = BusienessPartnerGroupsComponent;
        return this.dynamicComp.component;
      break; 
      case 'numberrange':
        this.dynamicComp.component = NumberRangeComponent;
        return this.dynamicComp.component;
      break; 
      case 'assignment':
        this.dynamicComp.component = AssignmentComponent;
        return this.dynamicComp.component;
      break;  
      case 'AlternateControlAccount':
        this.dynamicComp.component = AlternateControlAccountComponent;
        return this.dynamicComp.component;
      break; 
      case 'Depreciationareas':
        this.dynamicComp.component = DepreciationareasComponent;
        return this.dynamicComp.component;
      break;  
      case 'AssetClass':
        this.dynamicComp.component = AssetClassComponent;
        return this.dynamicComp.component;
      break;  
      case 'assetblock':
        this.dynamicComp.component = AssetBlockComponent;
        return this.dynamicComp.component;
      break;  
      
      case 'paymentterms':
        this.dynamicComp.component = PaymentTermsComponent;
        return this.dynamicComp.component;
      break; 

      case 'assetnumberrange':
        this.dynamicComp.component = AssetNumberRangeComponent;
        return this.dynamicComp.component;
      break;
      case 'AssignmentAssetClasstoAssetBlock':
        this.dynamicComp.component = AseetClassToAssetBlockComponent;
        return this.dynamicComp.component;
      break;
      case 'assettransactiontypes':
        this.dynamicComp.component = AssetTransactionTypeComponent;
        return this.dynamicComp.component;
      break;
      case 'accountkey':
        this.dynamicComp.component = AccountKeyComponent;
        return this.dynamicComp.component;
      break;
      case 'AssignmentsAccountKeytoAssetClass':
        this.dynamicComp.component = AssignmentAccountKeytoAssetClassComponent;
        return this.dynamicComp.component;
      break;
      case 'bankmaster':
        this.dynamicComp.component = BankMasterComponent;
        return this.dynamicComp.component;
      break;
        case 'depreciationcode':
        this.dynamicComp.component = DepreciationcodeComponent;
        return this.dynamicComp.component;
      break;
      case 'glaccount':
        this.dynamicComp.component = GLAccountComponent;
        return this.dynamicComp.component;
      break;
      case 'businesspartner':
        this.dynamicComp.component = BusienessPartnerAccountComponent;
        return this.dynamicComp.component;
      break;
      case 'mainassetmaster':
        this.dynamicComp.component = MainAssetMasterComponent;
        return this.dynamicComp.component;
      break;
      case 'subassets':
        this.dynamicComp.component = SubAssetsComponent;
        return this.dynamicComp.component;
      break;
      default:
    }
  }
}
