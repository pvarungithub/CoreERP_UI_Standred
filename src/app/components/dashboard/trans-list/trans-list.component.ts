import { Component, OnInit, ViewChild } from '@angular/core';
import { TransTableComponent } from '../../../reuse-components/trans-table/trans-table.component';
import { isNullOrUndefined } from 'util';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { ApiConfigService } from '../../../services/api-config.service';
import { RuntimeConfigService } from '../../../services/runtime-config.service';
import { AlertService } from '../../../services/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { String } from 'typescript-string-operations';
import { StatusCodes } from '../../../enums/common/common';

@Component({
  selector: 'app-trans-list',
  templateUrl: './trans-list.component.html',
  styleUrls: ['./trans-list.component.scss']
})
export class TransListComponent implements OnInit {

  @ViewChild(TransTableComponent, { static: false }) transTableComponent: TransTableComponent;

  tableData: any;
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    // public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private environment: RuntimeConfigService,
    private apiConfigService: ApiConfigService
  ) {
    activatedRoute.params.subscribe(params => {
      this.getTableParameters(params.id);
      if (!isNullOrUndefined(this.transTableComponent)) {
        this.transTableComponent.defaultValues();
      }
    });
   }

  ngOnInit(): void {
  }

  getTableParameters(id) {
    // const getUrl = String.Join('/', this.apiConfigService.getComponentInfo, id);
    // this.apiService.apiGetRequest(getUrl)
    //   .subscribe(
    //     response => {
    //       const res = response.body;
    //       if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
    //         if (!isNullOrUndefined(res.response)) {
              // this.tableUrl = res.response;
              // if (!isNullOrUndefined(this.tableUrl)) {
                this.getTableData();
              // }
        //     }
        //   }
        // });
  }

  getTableData() {
    // const getUrl = String.Join('',this.environment.runtimeConfig.serverUrl, this.tableUrl.url);
     const getUrl = 'http://183.82.48.82:9091/api/Language/GetLanguageList';
    this.apiService.apiGetRequest(getUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              // this.tableData = res.response[this.tableUrl.listName];
              this.tableData = [
                {  Id : 'hvhjgvgh', Value: 'jhbjbjh'},
                {  Id : 'hvhjgvgh', Value: 'jhbjbjh'},
                {  Id : 'hvhjgvgh', Value: 'jhbjbjh'},
                {  Id : 'hvhjgvgh', Value: 'jhbjbjh'},
                {  Id : 'hvhjgvgh', Value: 'jhbjbjh'},
                {  Id : 'hvhjgvgh', Value: 'jhbjbjh'},
                {  Id : 'hvhjgvgh', Value: 'jhbjbjh'},
                {  Id : 'hvhjgvgh', Value: 'jhbjbjh'}
              ]
            }
          }
          this.spinner.hide();
        });
  }

}
