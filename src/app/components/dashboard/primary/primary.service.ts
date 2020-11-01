import { Injectable } from '@angular/core';
import { ApiConfigService } from '../../../services/api-config.service';
import { NotFoundComponent } from '../../not-found/not-found.component';
import { PrimaryCostElementComponent } from './primary-cost-element/primary-cost-element.component';

@Injectable({
  providedIn: 'root'
})
export class PrimaryService {


  dynamicComp = { component: null, tableUrl: null, list: null, editKey: null, searchCol: null };

  constructor(
    private apiConfigService: ApiConfigService
  ) { }

  getDynComponents(data) {
    switch (data) {
      case 'primarycostelement': {
        this.dynamicComp.component = PrimaryCostElementComponent;
        return this.dynamicComp;
        break;
      }
      default:
        this.dynamicComp.component = NotFoundComponent;
        return this.dynamicComp;
    }

  }
}
