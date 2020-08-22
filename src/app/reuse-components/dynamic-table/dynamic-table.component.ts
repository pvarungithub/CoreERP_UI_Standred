import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { isNullOrUndefined } from 'util';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AddOrEditService } from '../../components/dashboard/comp-list/add-or-edit.service';
import { RuntimeConfigService } from '../../services/runtime-config.service';
@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  emitDynTableData: Subscription;
  @Output() emitColumnChanges = new EventEmitter();
  
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[];
  tableData = [];
  columnDefinitions = [];
  routeParam: any;
  tableForm: FormGroup;
  formControl = new FormControl();

  constructor(
    activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    private runtimeConfigService: RuntimeConfigService,
    addOrEditService: AddOrEditService
  ) {
    activatedRoute.params.subscribe(params => {
      this.routeParam = params.id;

      this.emitDynTableData = addOrEditService.emitDynTableData.subscribe(res => {
        if (!isNullOrUndefined(res)) {
          this.displayedColumns = res.displayedColumns;
          this.tableData = [res.tableData];
          this.formControl = res.formControl;
          this.setTableData()
          addOrEditService.sendDynTableData(null);
        }
      });

    });


  }

  deleteRow(i) {
    if (this.dataSource.data.length == 1) {
      return;
    }
    this.dataSource.data = this.dataSource.data.filter((value, index, array) => {
      return index !== i;
    });
    this.dataSource = new MatTableDataSource(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log(changes, 'changes')
  //   // this.displayedColumns = changes.dynTableProps.currentValue.displayedColumns;
  //   // this.tableData = [changes.dynTableProps.currentValue.tableData];
  //   // this.formControl = changes.dynTableProps.currentValue.formControl;
  //   // this.setTableData()
  //   // this.cdr.detectChanges();
  // }

  // ngDoCheck() {
  //   console.log(this.dynTableProps, 'table')
  //   this.displayedColumns = this.dynTableProps.displayedColumns;
  //   this.tableData = [this.dynTableProps.tableData];
  //   this.formControl = this.dynTableProps.formControl;
  //   this.setTableData()
  // }

  formControlValid(col, val, index) {
    this.tableForm.patchValue({
      [col]: val
    })
    if (this.tableForm.valid && (this.dataSource.data.length - 1) == index) {
      this.dataSource.data.push(JSON.parse(JSON.stringify(this.tableData[0])));
      this.dataSource = new MatTableDataSource(this.dataSource.data);
      this.dataSource.paginator = this.paginator;
      this.tableForm = this.formBuilder.group(this.formControl);
    }
    this.emitColumnChanges.emit({ column: col, value: val });
  }


  setTableData() {
    this.tableForm = this.formBuilder.group(this.formControl);
    if (!isNullOrUndefined(this.tableData)) {
      if (this.tableData.length) {
        this.dataSource = new MatTableDataSource(JSON.parse(JSON.stringify(this.tableData)));
        this.dataSource.paginator = this.paginator;
      }
      const keys = [];
      const col = [];
      // tslint:disable-next-line:forin
      for (const key in this.tableData[0]) {
        keys.push({ col: key });
      }
      keys.forEach(cols => {
        const obj = {
          def: cols.col, label: cols.col, hide: true
        };
        col.push(obj);
      });

    this.columnDefinitions = [];
        // tslint:disable-next-line: forin
        for (const key in this.runtimeConfigService.tableColumnsData[this.routeParam]) {
          for (let c = 0; c < col.length; c++) {
            if (key == col[c].def) {
              console.log(col[c])
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

  ngOnDestroy() {
    this.emitDynTableData.unsubscribe();
  }
}
