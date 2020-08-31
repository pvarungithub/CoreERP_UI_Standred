import { Injectable } from '@angular/core';
import { CashbankComponent } from './cashbank/cashbank.component';
import { ApiConfigService } from '../../../services/api-config.service';
import {JournalComponent} from './journals/journal.component';

@Injectable({
  providedIn: 'root'
})
export class TransListService {

  dynamicComp = { component: null, tableUrl: null, list: null };

  constructor(
    private apiConfigService: ApiConfigService
  ) { }

  getDynComponents(data) {

    switch (data) {
      case 'cashbank':
        this.dynamicComp.component = CashbankComponent;
        this.dynamicComp.tableUrl = this.apiConfigService.getCashBankMaster;
        this.dynamicComp.list = 'CashBankMasters';
        return this.dynamicComp;
        break;
      default:
    }

    switch (data) {
      case 'journals':
        this.dynamicComp.component = JournalComponent;
        // this.dynamicComp.tableUrl = this.apiConfigService.getCashBankMaster;
        // this.dynamicComp.list = 'CashBankMasters';
        return this.dynamicComp;
        break;
      default:
    }
  }
}
