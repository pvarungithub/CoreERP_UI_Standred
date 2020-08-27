import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RuntimeConfigService } from '../../services/runtime-config.service';
import { String } from 'typescript-string-operations';
import { AddOrEditService } from '../../components/dashboard/comp-list/add-or-edit.service';
import { ApiConfigService } from '../../services/api-config.service';
import { ApiService } from '../../services/api.service';
import { StatusCodes } from '../../enums/common/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { TransListService } from '../../components/dashboard/trans-list/trans-list.service';

@Component({
  selector: 'app-trans-table',
  templateUrl: './trans-table.component.html',
  styleUrls: ['./trans-table.component.scss']
})
export class TransTableComponent implements OnInit {

  // route
  routeParam: any;

  // header props
  headerForm: FormGroup;

  // table props
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<any>;
  columnDefinitions = [];
  highlightedRows = [];
  keys = [];
  branchCode: any;
  tableData: any;


  constructor(
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    activatedRoute: ActivatedRoute,
    private runtimeConfigService: RuntimeConfigService,
    private router: Router,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    private addOrEditService: AddOrEditService,
    private spinner: NgxSpinnerService,
    private transListService: TransListService
  ) {
    this.headerForm = this.formBuilder.group({
      selected: [null],
      fromDate: [null],
      toDate: [null],
      invoiceNo: [null],
      Role: [null]
    });
    activatedRoute.params.subscribe(params => {
      this.routeParam = params.id;
    });
  }

  ngOnInit() {
    this.branchCode = JSON.parse(localStorage.getItem('user'));
    this.headerForm.patchValue({
      Role: this.branchCode.role
    })
    this.getTableList();
  }

  
  getTableList() {
    const getInvoiceListUrl = String.Join('/', this.transListService.getDynComponents(this.routeParam).tableUrl);
    this.apiService.apiPostRequest(getInvoiceListUrl, { voucherNumber: '1'}).subscribe(
      response => {
        this.spinner.hide();
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response[this.transListService.getDynComponents(this.routeParam).list]) && res.response[this.transListService.getDynComponents(this.routeParam).list].length) {
            this.tableData = res.response[this.transListService.getDynComponents(this.routeParam).list];
            this.tableDataFunc();
          }
        }

        this.tableData = [ { company: '1', id: '1'  }]
        this.tableDataFunc();

      });
  }

  openEditTrans(row) {
    this.addOrEditService.editData = 'Edit';
    this.router.navigate(['dashboard/transaction', this.routeParam, 'Edit', { value: row.id } ]);
  }

  newTransOpen() {
    this.addOrEditService.editData = 'New';
    this.router.navigate(['dashboard/transaction', this.routeParam, 'New']);
  }

  defaultValues() {
    this.dataSource = new MatTableDataSource();
    this.highlightedRows = [];
    this.columnDefinitions = [];
    this.keys = [];
  }

  tableDataFunc() {
    this.highlightedRows = [];

    if (!isNullOrUndefined(this.tableData)) {
      if (this.tableData.length) {
        this.dataSource = new MatTableDataSource(this.tableData);
      }
    }
    if (!isNullOrUndefined(this.dataSource)) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    if (!isNullOrUndefined(this.tableData) && this.tableData.length > 0) {
      // tslint:disable-next-line:forin
      for (const key in this.tableData[0]) {
        this.keys.push({ col: key });
      }
      const col = [];
      this.keys.forEach(cols => {
        const obj = {
          def: cols.col, label: cols.col, hide: true
        };
        col.push(obj);
      });


      for (let key in this.runtimeConfigService.tableColumnsData[this.routeParam]) {
        // tslint:disable-next-line: prefer-for-of
        for (let c = 0; c < col.length; c++) {
          if (key == col[c].def) {
            this.columnDefinitions.push(col[c]);
          }
        }
      }
    }


  }


  getDisplayedColumns(): string[] {
    if (!isNullOrUndefined(this.tableData)) {
      return this.columnDefinitions.filter(cd => cd.hide).map(cd => cd.def);
    }
  }

  selectRow(row, index) {
    console.log(row, index)
  }


  search() {

  }

  reset() {

  }

}
