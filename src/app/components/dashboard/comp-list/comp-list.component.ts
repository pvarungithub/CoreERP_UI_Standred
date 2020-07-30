import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { String } from 'typescript-string-operations';

import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { isNullOrUndefined } from 'util';
import { NgxSpinnerService } from 'ngx-spinner';
import { StatusCodes } from '../../../enums/common/common';
import { DeleteItemComponent } from '../../../reuse-components/delete-item/delete-item.component';
import { TableComponent } from '../../../reuse-components/table/table.component';
import { AlertService } from '../../../services/alert.service';
import { SnackBar } from '../../../enums/common/common';
import { CompListService } from './comp-list.service';
import { RuntimeConfigService } from '../../../services/runtime-config.service';
import { ApiConfigService } from '../../../services/api-config.service';

@Component({
  selector: 'app-comp-list',
  templateUrl: './comp-list.component.html',
  styleUrls: ['./comp-list.component.scss']
})
export class CompListComponent implements OnInit {

  tableData: any;
  addOrUpdateData: any;
  tableUrl: any;

  @ViewChild(TableComponent, { static: false }) tableComponent: TableComponent;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private compListService: CompListService,
    private environment: RuntimeConfigService,
    private apiConfigService: ApiConfigService
  ) {
    activatedRoute.params.subscribe(params => {
      this.getTableParameters(params.id);
      if (!isNullOrUndefined(this.tableComponent)) {
        this.tableComponent.defaultValues();
      }
    });
  }

  getTableParameters(id) {
    const getUrl = String.Join('/', this.apiConfigService.getComponentInfo, id);
    this.apiService.apiGetRequest(getUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.tableUrl = res.response;
              if (!isNullOrUndefined(this.tableUrl)) {
                this.getTableData();
              }
            }
          }
        });
  }

  getTableData() {
    const getUrl = String.Join('',this.environment.runtimeConfig.serverUrl, this.tableUrl.url);
    this.apiService.apiGetRequest(getUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.tableData = res.response[this.tableUrl.listName];
            }
          }
          this.spinner.hide();
        });
  }

  ngOnInit() {
  }

  addOrUpdateEvent(value) {
    if (value.action === 'Delete') {
      this.deleteRecord(value);
    } else {

      const dialogRef = this.dialog.open(this.compListService.getDynComponents(this.tableUrl.formName), {
        width: '80%',
        data: value,
        panelClass: 'custom-dialog-container',
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        if (!isNullOrUndefined(result)) {
          this.spinner.show();
          if (result.action === 'Add') {
            this.addRecord(result);
          } else if (result.action === 'Edit') {
            this.editRecord(result);
          }
        }
      });
    }
  }
  
  deleteRecord(value) {

    const dialogRef = this.dialog.open(DeleteItemComponent, {
      width: '1024px',
      data: value,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!isNullOrUndefined(result)) {
        this.spinner.show();
        const deleteCompanyUrl = String.Join('', this.environment.runtimeConfig.serverUrl, this.tableUrl.deleteUrl,
          result.item[this.tableUrl.primaryKey]);
        this.apiService.apiDeleteRequest(deleteCompanyUrl, result.item)
          .subscribe(
            response => {
              const res = response.body;
              if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
                if (!isNullOrUndefined(res.response)) {
                  this.tableComponent.defaultValues();
                  this.getTableData();
                  this.alertService.openSnackBar('Delected Record...', 'close', SnackBar.success);
                }
              }
              this.spinner.hide();
            });
      }
    });

  }

  addRecord(result) {
    const addCompanyUrl = String.Join('', this.environment.runtimeConfig.serverUrl, this.tableUrl.registerUrl);
    this.apiService.apiPostRequest(addCompanyUrl, result.item)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.tableComponent.defaultValues();
              this.getTableData();
              this.alertService.openSnackBar('Record Added...', 'close', SnackBar.success);
            }
          }
          this.spinner.hide();
        });
  }

  editRecord(result) {
    const updateCompanyUrl = String.Join('', this.environment.runtimeConfig.serverUrl, this.tableUrl.updateUrl);
    this.apiService.apiUpdateRequest(updateCompanyUrl, result.item)
      .subscribe(
        response => {
          const res = response.body;
          this.spinner.hide();
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.tableComponent.defaultValues();
              this.getTableData();
              this.alertService.openSnackBar('Record Updated...', 'close', SnackBar.success);
            }
          }
        });
  }

}