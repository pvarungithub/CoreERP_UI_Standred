import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-trans-table',
  templateUrl: './trans-table.component.html',
  styleUrls: ['./trans-table.component.scss']
})
export class TransTableComponent implements OnInit, OnChanges {

  // route
  routeParam: any;

  // header props
  headerForm: FormGroup;

  // table props
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Input() tableData: any;

  dataSource: MatTableDataSource<any>;
  columnDefinitions = [];
  highlightedRows = [];
  keys = [];


  constructor(
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private activatedRoute: ActivatedRoute,

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

  ngOnInit(): void {
  }

  defaultValues() {
    this.dataSource = new MatTableDataSource();
    this.highlightedRows = [];
    this.columnDefinitions = [];
    this.keys = [];
  }

  ngOnChanges() {
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

      this.translate.get(this.routeParam).subscribe(res => {
        let key;
        // tslint:disable-next-line: forin
        for (key in res) {
          // tslint:disable-next-line: prefer-for-of
          for (let c = 0; c < col.length; c++) {
            if (key == col[c].def) {
              this.columnDefinitions.push(col[c]);
            }
          }
        }
      });
    }


  }


  getDisplayedColumns(): string[] {
    if (!isNullOrUndefined(this.tableData)) {
      return this.columnDefinitions.filter(cd => cd.hide).map(cd => cd.def);
    }
  }

  selectRow(row, index) {
  }

  openDialog(row, index) {
  }

  search() {

  }

  reset() {

  }
  
}
