import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedImportModule } from './shared/shared-import';

import {
  CompListComponent, CompanyComponent, BranchesComponent, CostCenterComponent, LanguageComponent, CurrencyComponent, CountryComponent, RegionComponent, StateComponent, UOMComponent,
  SegmentComponent, ProfitCenterComponent, DivisionComponent, FunctionalDepartmentComponent, PlantsComponent, LocationsComponent, SalesDepartmentComponent, DistributionchannelsComponent,
  SalesofficeComponent, SalesGroupComponent, MaintenceAreaComponent, PurchaseDepartmentComponent, StorageLocationsComponent, ErpUsersComponent, LedgerComponent,
  OpenLedgerComponent, VoucherClassComponent, VoucherTypesComponent, VoucherSeriesComponents, AssignmentVoucherSeriestoVoucherTypesComponent, TaxRatesComponents, TaxTransactionComponent,
  TaxIntegrationComponent, AssignmentoftaxaccountstotaxcodesComponent, HsnSacComponent, TDSComponent, IncomeTypeComponent, TdsRatesComponent, PostingComponent, AccountsGroupComponent,
  UndersubGroupComponent, AccountchartComponent, AssignmentChartAccounttoCompanyComponent, PartnerTypesComponent, BusienessPartnerGroupsComponent, NumberRangeComponent, AssignmentComponent,
  AssetClassComponent, AccountKeyComponent, PaymentTermsComponent, AlternateControlAccountComponent, DepreciationareasComponent, AssetBlockComponent, AssetNumberRangeComponent, AseetClassToAssetBlockComponent,
  AssetTransactionTypeComponent, StoresTypeComponent, AssignmentAccountKeytoAssetClassComponent, BankMasterComponent
  , DepreciationcodeComponent, GLAccountComponent, BusienessPartnerAccountComponent, MainAssetMasterComponent, SubAssetsComponent, RequisitionAssignmentComponent,

  AssignGLaccounttoSubGroupComponent, GLSubAccountComponent, PurchasinggroupsComponent, PurchasingtypeComponent,
  PurchasingpersonComponent, RequisitionNumberRangeComponent, PurchaseordertypeComponent,
  QuotationNumberRangeComponent, QuotationAssignmentComponent, PurchaseOrderAssignmentComponent, SupplierTermsandconditionsComponent,
  BusienessTransactionTypeComponent, AssetBegningAccumulatedDepreciationComponent,
  AssetBegningAcqusitionComponent, PurchaseOrderNumberRangeComponent, GoodsReceiptNoteNumberSeriesComponent,
  RejectionReasonsComponent, MovementtypeComponent, LotSeriesComponent, StoresAssignmentComponent,
  GoodsReceiptNoteAssignmentComponent, MaterialTypesComponent, MaterialGroupsComponent,
  MaterialRequisitionNoteAssignmentComponent, MaterialRequisitionNoteNumberSeriesComponent,
  GoodsIssueNoteAssignmentComponent, GoodsIssueNoteNumberSeriesComponent, BinsCreationComponent, PurchaseRequisitionNumberRangeComponent,
  ModelPatternComponent, MaterialNumberRangeComponent, MaterialNumberAsssignmentComponent, ProcessComponent,
  MaterialSizeComponent, MaterialMasterComponent, PrimaryCostElementsCreationComponent, CreationOfCostUnitsComponent, BatchMasterComponent, OrderTypeComponent,
  SecondaryCostElementsCreationComponent, CoastingActivitiesComponent, CostingKeyFiguresComponent,
  AssignmentOfNumberSeriesToObjectTypesComponent, CommitmentItemComponent, FundCenterComponent, WorkBreakDownStructureComponent,
  CostingObjectTypesComponent, CostingObjectNumberSeriesComponent, FormulasComponent, StandardRateComponent, DownTimeReasonComponent,

} from './components/dashboard/comp-list/index';

import {
  CashbankComponent, JournalComponent, MemoinvoiceComponent,
  ReceiptspaymentsComponent, PurchasesaleassetComponent, SaleassetComponent
} from './components/dashboard/trans-list/index';

import { NavbarComponent, TableComponent, DeleteItemComponent, SearchFilterTableComponent, TransTableComponent, DynamicTableComponent, AutocompleteComponent } from './reuse-components/index';
import {
  DashboardComponent, LoginComponent, SidebarComponent, NotFoundComponent
} from './components/index';

import { RolesprevilagesComponent, TransListComponent } from './components/dashboard/index';

import { CompTabsComponent } from './components/dashboard/comp-list/comp-tabs/index';

import { RuntimeConfigService } from './services/runtime-config.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { FocusOnEnterDirective } from './directives/focus-on-enter.directive';

import { BsDropdownModule, TypeaheadModule } from 'ngx-bootstrap';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

import { TokenInterceptor } from './token-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { from } from 'rxjs';
import { MaxlengthDirective } from './directives/maxlength.directive';
//import { AccountKeyComponent } from './components/dashboard/comp-list/assetblock/accountkey/accountkey.component';
// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    // main

    // directives

    // pipes


    // component

    // component list
    BranchesComponent, CostCenterComponent, LanguageComponent, CurrencyComponent, CountryComponent, RegionComponent, StateComponent, UOMComponent,
    SegmentComponent, ProfitCenterComponent, DivisionComponent, FunctionalDepartmentComponent, PlantsComponent, LocationsComponent, SalesDepartmentComponent,
    DistributionchannelsComponent, SalesofficeComponent, SalesGroupComponent, MaintenceAreaComponent, PurchaseDepartmentComponent, StorageLocationsComponent,
    ErpUsersComponent, RolesprevilagesComponent, LedgerComponent, OpenLedgerComponent, VoucherClassComponent, VoucherTypesComponent, VoucherSeriesComponents,
    AssignmentVoucherSeriestoVoucherTypesComponent, TaxRatesComponents, TaxTransactionComponent, TaxIntegrationComponent, AssignmentoftaxaccountstotaxcodesComponent,
    HsnSacComponent, TDSComponent, IncomeTypeComponent, TdsRatesComponent, PostingComponent, AccountsGroupComponent, UndersubGroupComponent, AssignmentComponent,
    AccountchartComponent, CompanyComponent, PartnerTypesComponent, NumberRangeComponent, BusienessPartnerGroupsComponent, PaymentTermsComponent,
    AssetClassComponent, AccountKeyComponent, AlternateControlAccountComponent, DepreciationareasComponent, AssetBlockComponent, AssetNumberRangeComponent

    , AseetClassToAssetBlockComponent, AssetTransactionTypeComponent, StoresTypeComponent, PurchasingtypeComponent,
    AssignmentAccountKeytoAssetClassComponent, BankMasterComponent, DepreciationcodeComponent, GLAccountComponent, BusienessPartnerAccountComponent, MainAssetMasterComponent, SubAssetsComponent,
    AssignGLaccounttoSubGroupComponent, GLSubAccountComponent, PurchasinggroupsComponent, PurchasingpersonComponent, RequisitionAssignmentComponent, RequisitionNumberRangeComponent, PurchaseordertypeComponent, SupplierTermsandconditionsComponent,
    PurchaseOrderNumberRangeComponent, RejectionReasonsComponent, MovementtypeComponent, LotSeriesComponent,
    StoresAssignmentComponent, GoodsReceiptNoteNumberSeriesComponent, GoodsReceiptNoteAssignmentComponent, MaterialTypesComponent, MaterialGroupsComponent, MaterialRequisitionNoteAssignmentComponent, MaterialRequisitionNoteNumberSeriesComponent, GoodsIssueNoteAssignmentComponent,
    GoodsIssueNoteNumberSeriesComponent, BinsCreationComponent, PurchaseRequisitionNumberRangeComponent, BatchMasterComponent, OrderTypeComponent, ProcessComponent, PrimaryCostElementsCreationComponent, CreationOfCostUnitsComponent, CreationOfCostUnitsComponent, BatchMasterComponent, OrderTypeComponent, ProcessComponent, PrimaryCostElementsCreationComponent, CostingKeyFiguresComponent, CostingKeyFiguresComponent, CostingObjectTypesComponent,
    CostingObjectNumberSeriesComponent, StandardRateComponent, FormulasComponent, FundCenterComponent, CommitmentItemComponent, WorkBreakDownStructureComponent, CostingObjectTypesComponent, DownTimeReasonComponent, FundCenterComponent, DownTimeReasonComponent, WorkBreakDownStructureComponent, CommitmentItemComponent, FormulasComponent, StandardRateComponent, CostingObjectNumberSeriesComponent, AssignmentOfNumberSeriesToObjectTypesComponent, CoastingActivitiesComponent, AssignmentOfNumberSeriesToObjectTypesComponent, CoastingActivitiesComponent, SecondaryCostElementsCreationComponent, SecondaryCostElementsCreationComponent, MaterialMasterComponent, MaterialMasterComponent, MaterialSizeComponent, MaterialSizeComponent, MaterialNumberAsssignmentComponent,
    ModelPatternComponent, MaterialNumberRangeComponent, QuotationNumberRangeComponent, PurchaseOrderAssignmentComponent, QuotationAssignmentComponent, BusienessTransactionTypeComponent, AssetBegningAccumulatedDepreciationComponent, AssetBegningAcqusitionComponent,
    CompTabsComponent,
    TransListComponent,
    TransTableComponent,
    SearchFilterTableComponent,
    CompListComponent,
    AppComponent,
    NavbarComponent,
    FocusOnEnterDirective,
    DashboardComponent,
    LoginComponent,
    SidebarComponent,
    NotFoundComponent,
    TableComponent, DeleteItemComponent, TaxIntegrationComponent, AssignmentoftaxaccountstotaxcodesComponent,
    HsnSacComponent, TDSComponent, IncomeTypeComponent, TdsRatesComponent, PostingComponent, AccountsGroupComponent, UndersubGroupComponent,
    AccountchartComponent, AssignmentChartAccounttoCompanyComponent, PartnerTypesComponent, BusienessPartnerGroupsComponent, NumberRangeComponent, AseetClassToAssetBlockComponent,
    AssignmentComponent, AssetClassComponent, AccountKeyComponent, PaymentTermsComponent, AlternateControlAccountComponent, DepreciationareasComponent, AssetBlockComponent,
    AssetNumberRangeComponent, AssetTransactionTypeComponent, StoresTypeComponent, AssignmentAccountKeytoAssetClassComponent,
    BankMasterComponent, DepreciationcodeComponent, GLAccountComponent, GLSubAccountComponent, PurchasinggroupsComponent, PurchasingpersonComponent, RequisitionAssignmentComponent, RequisitionNumberRangeComponent, PurchaseordertypeComponent, SupplierTermsandconditionsComponent,
    PurchaseOrderNumberRangeComponent, RejectionReasonsComponent, MovementtypeComponent, LotSeriesComponent,
    StoresAssignmentComponent, QuotationNumberRangeComponent, GoodsReceiptNoteNumberSeriesComponent, GoodsReceiptNoteAssignmentComponent, MaterialTypesComponent, MaterialGroupsComponent, MaterialRequisitionNoteAssignmentComponent, MaterialRequisitionNoteNumberSeriesComponent, GoodsIssueNoteAssignmentComponent, MaterialNumberRangeComponent, ModelPatternComponent,
    GoodsIssueNoteNumberSeriesComponent, BinsCreationComponent, PurchaseRequisitionNumberRangeComponent, MaterialNumberRangeComponent, MaterialNumberAsssignmentComponent,
    PurchaseOrderAssignmentComponent, QuotationAssignmentComponent, BusienessTransactionTypeComponent, AssetBegningAccumulatedDepreciationComponent, AssetBegningAcqusitionComponent,
    BusienessPartnerAccountComponent, AssignGLaccounttoSubGroupComponent, MainAssetMasterComponent, SubAssetsComponent,
    DynamicTableComponent, AutocompleteComponent, CashbankComponent, JournalComponent, MemoinvoiceComponent, ReceiptspaymentsComponent, MaxlengthDirective, PurchasesaleassetComponent,
    SaleassetComponent
    //LeaveopeningbalanceComponent,
    //selfserviceComponent,

  ],
  imports: [
    AppRoutingModule,
    SharedImportModule,
    NgxDaterangepickerMd.forRoot(),
    BsDropdownModule.forRoot(),
    TypeaheadModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    RuntimeConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: (environment: RuntimeConfigService) => () => environment.loadRuntimeConfig(),
      multi: true,
      deps: [RuntimeConfigService, HttpClientModule]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    // component

    // component list
    BranchesComponent, CostCenterComponent, LanguageComponent, CurrencyComponent, CountryComponent, RegionComponent, StateComponent, UOMComponent,
    SegmentComponent, ProfitCenterComponent, DivisionComponent, FunctionalDepartmentComponent, PlantsComponent, LocationsComponent, SalesDepartmentComponent,
    DistributionchannelsComponent, SalesofficeComponent, SalesGroupComponent, MaintenceAreaComponent, PurchaseDepartmentComponent, StorageLocationsComponent,
    ErpUsersComponent, RolesprevilagesComponent, LedgerComponent, OpenLedgerComponent, VoucherClassComponent, VoucherTypesComponent, VoucherSeriesComponents,
    AssignmentVoucherSeriestoVoucherTypesComponent, TaxRatesComponents, TaxTransactionComponent, TaxIntegrationComponent,

    UndersubGroupComponent, TaxIntegrationComponent,
    DeleteItemComponent,
    CompanyComponent,
    // LeaveopeningbalanceComponent,

    // MemberMasterComponent, VehicleComponent
  ]
})
export class AppModule { }
