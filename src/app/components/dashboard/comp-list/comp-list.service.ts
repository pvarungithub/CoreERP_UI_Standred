import { Injectable } from '@angular/core';
import { CompanyComponent } from './company/company.component';
import { BranchesComponent } from './branches/branches.component';
import { CostCenterComponent } from './cost-center/cost-center.component';
import { LanguageComponent } from './language/language.component';
import { CurrencyComponent } from './currency/currency.component';
import { CountryComponent } from './country/country.component';
import { RegionComponent } from './region/region.component';
import { StateComponent } from './state/state.component';
import { SizesComponent } from './sizes/sizes.component';
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
import { RolesprevilagesComponent } from './rolesprevilages/rolesprevilages.component';

@Injectable({
  providedIn: 'root'
})
export class CompListService {
  dynamicComp = { component: null};

  constructor() { }

  getDynComponents(data) {
    switch (data) {
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
        this.dynamicComp.component = SizesComponent;
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
          case 'functionalDepatment':
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
                case 'rolePrevilages':
                this.dynamicComp.component = RolesprevilagesComponent;
                return this.dynamicComp.component;
                break;
      default:
    }
  }
}
