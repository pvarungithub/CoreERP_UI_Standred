import { Component, OnInit, ViewChild, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { isNullOrUndefined } from 'util';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AddOrEditService } from '../../components/dashboard/comp-list/add-or-edit.service';
import { RuntimeConfigService } from '../../services/runtime-config.service';
import { CommonService } from '../../services/common.service';
@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit, OnDestroy {


  emitDynTableData: Subscription;
  @Output() emitColumnChanges = new EventEmitter();
  @Output() emitTableData = new EventEmitter();

  @Input() set tableObJect(res) {
    if (!isNullOrUndefined(res)) {
      this.tableData = [res.tableData];
      this.formControl = res.formControl;
      this.setTableData()
    }
  }

  dataSource: MatTableDataSource<any>;
  keys = [];
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
    private commonService: CommonService,
    addOrEditService: AddOrEditService
  ) {
    activatedRoute.params.subscribe(params => {
      this.routeParam = params.id;
      this.emitDynTableData = addOrEditService.emitDynTableData.subscribe(res => {
        if (!isNullOrUndefined(res)) {
          if (res.length) {
            this.dataSource.data = this.formalTableData(res);
          } else if (res.length == 0) {
            this.dataSource.data = [];
            this.setTableData();
          } else {
            this.dataSource.data[res.index] = res['value'];
          }
          this.dataSource = new MatTableDataSource(this.dataSource.data);
          addOrEditService.sendDynTableData(null);
        }
      });
    });
  }

  formalTableData(list) {
    const data = [];
    for (let l = 0; l < list.length; l++) {
      const obj = JSON.parse(JSON.stringify(this.tableData[0]))
      for (let t in obj) {
        obj[t].value = list[l][t];
        obj[t].type = 'none';
      }
      data.push(obj)
    }
    return data;
  }

  deleteRow(i, flag) {
    if (!flag) {
      if (this.dataSource.data.length == 1) {
        return;
      }
      this.dataSource.data = this.dataSource.data.filter((value, index, array) => {
        return index !== i;
      });
      this.dataSource = new MatTableDataSource(this.dataSource.data);
      this.emitTableData.emit(this.formatTableData());
    }
  }

  ngOnInit(): void {
  }

  setTypeAheadValue(val, col, indx) {
    this.dataSource.data[indx][col].value = val;
    this.formControlValid(col, this.dataSource.data[indx][col], val, indx);
  }

  formControlValid(col, val, data, indx) {
    if ((this.dataSource.data.length - 1) === indx) {
      this.tableForm.patchValue({
        [col]: data
      });
    }
    this.dataSource.data[indx][col].value = data;
    if (this.tableForm.valid && (this.dataSource.data.length - 1) == indx) {
      this.dataSource.data.push(JSON.parse(JSON.stringify(this.tableData[0])));
      this.dataSource = new MatTableDataSource(this.dataSource.data);
      this.tableForm = this.formBuilder.group(this.formControl);
    }
    this.emitColumnChanges.emit({ column: col, value: val, index: indx });
    this.emitTableData.emit(this.formatTableData());
  }

  formatTableData() {
    const array = []
    for (let t = 0; t < this.dataSource.data.length; t++) {
      const object = {};
      this.keys.map(res => (res.col != 'delete') ? object[res.col] = this.dataSource.data[t][res.col].value : null);
      if (this.dataSource.data.length - 1 != t) {
        array.push(object);
      }
    }
    return array;
  }


  setTableData() {
    this.tableForm = this.formBuilder.group(this.formControl);
    if (!isNullOrUndefined(this.tableData)) {
      if (this.tableData.length) {
        this.dataSource = new MatTableDataSource(JSON.parse(JSON.stringify(this.tableData)));

      }
      this.keys = [];
      const col = [];
      // tslint:disable-next-line:forin
      for (const key in this.tableData[0]) {
        this.keys.push({ col: key });
      }
      this.keys.forEach(cols => {
        const obj = {
          def: cols.col, label: cols.col, hide: true
        };
        col.push(obj);
      });
      this.columnDefinitions = [];

      // tslint:disable-next-line:forin
      for (let key in this.runtimeConfigService.tableColumnsData[this.routeParam]) {
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

  setFocus(id, index) {
    let flag = false;
    let nextId = '';
    // tslint:disable-next-line:forin
    for (const r in this.tableData[0]) {
      if (flag && !this.tableData[0][r].disabled && r != 'delete') {
        nextId = r;
        break;
      }
      if (id == r) {
        flag = true;
      }
    }
    if (nextId == '') {
      nextId = Object.keys(this.tableData[0])[0];
      index = index + 1;
    }
    this.commonService.setFocus(nextId + index);
  }

  ngOnDestroy() {
    this.emitDynTableData.unsubscribe();
  }
}
