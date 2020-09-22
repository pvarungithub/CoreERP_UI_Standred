import { Component, OnInit, ViewChild, Output, EventEmitter, Input, OnDestroy, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AddOrEditService } from '../../components/dashboard/comp-list/add-or-edit.service';
import { RuntimeConfigService } from '../../services/runtime-config.service';
import { CommonService } from '../../services/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit, OnDestroy, AfterContentChecked {


  emitDynTableData: Subscription;
  @Output() emitColumnChanges = new EventEmitter();
  @Output() emitTableData = new EventEmitter();

  @Input() set tableObJect(res) {
    if (!this.commonService.checkNullOrUndefined(res)) {
      this.tableData = [res.tableData];
      this.formControl = res.formControl;
      this.tableForm = this.formBuilder.group(this.formControl);
      this.setTableData();
    }
  }

  dataSource: MatTableDataSource<any>;
  keys = [];
  tableData = [];
  columnDefinitions = [];
  routeParam: any;
  tableForm: FormGroup;
  formControl = new FormControl();
  id: any;
  index: any;
  data: any;
  isDropdown = false;
  checkAllColValue = { col: '', val: false };
  removeEmptyRow = 1;

  constructor(
    activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    public runtimeConfigService: RuntimeConfigService,
    private commonService: CommonService,
    private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    addOrEditService: AddOrEditService
  ) {
    activatedRoute.params.subscribe(params => {
      this.routeParam = params.id;
      this.emitDynTableData = addOrEditService.emitDynTableData.subscribe(res => {
        if (!this.commonService.checkNullOrUndefined(res)) {
          this.dataSource = new MatTableDataSource();
          if (res.type == 'editValue') {
            let editData = this.formalTableData(res.data);
            editData.push(this.tableData[0])
            this.dataSource = new MatTableDataSource(JSON.parse(JSON.stringify(editData)));
          } else if (res.type == 'edit') {
            this.dataSource = new MatTableDataSource(JSON.parse(JSON.stringify(this.formalTableData(res.data))));
          } else if (res.type == 'add') {
            if (res.data.length) {
              this.dataSource = new MatTableDataSource(JSON.parse(JSON.stringify(res.data)));
              this.removeEmptyRow = res.removeEmptyRow;
              (this.isDropdown) ? this.setFocus() : this.setCurrentFocus();
            } else {
              this.setTableData();
            }
          }
          this.spinner.hide();
          this.cdr.detectChanges();
          addOrEditService.sendDynTableData(null);
        }
      });
    });
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  formalTableData(list) {
    const data = [];
    for (let l = 0; l < list.length; l++) {
      const obj = JSON.parse(JSON.stringify(this.tableData[0]))
      for (let t in obj) {
        obj[t].value = list[l][t];
        obj[t].type = 'none';
      }
      data.push(obj);
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
    this.id = col;
    this.index = indx;
    this.data = data;
    this.isDropdown = (this.dataSource.data[indx][col].type == 'dropdown') ? true : false;
    if (!this.commonService.checkNullOrUndefined(data)) {
      if (this.checkPrimary(col, data, val, indx)) {
        this.dataSource.data[indx][col].value = '';
        this.dataSource = new MatTableDataSource(JSON.parse(JSON.stringify(this.dataSource.data)));
        return;
      }
      if ((this.dataSource.data.length - 1) === indx) {
        this.tableForm.patchValue({
          [col]: data
        });
      }
      this.dataSource.data[indx][col].value = data;
      if (Object.keys(this.tableForm.value).length && this.tableForm.valid && (this.dataSource.data.length - 1) == indx) {
        this.dataSource.data.push(JSON.parse(JSON.stringify(this.tableData[0])));
        this.tableForm = this.formBuilder.group(this.formControl);
      }
      this.dataSource = new MatTableDataSource(this.dataSource.data);
      this.emitColumnChanges.emit({ column: col, index: indx, data: this.dataSource.data });
      if (!this.commonService.checkNullOrUndefined(this.checkAllColValue) && col == this.checkAllColValue.col) {
        this.checkAllColValue.val = false;
        this.checkAll(this.checkAllColValue.col, false);
      }
      this.emitTableData.emit(this.formatTableData());
    }
  }

  checkPrimary(col, data, val, indx) {
    if (!this.commonService.checkNullOrUndefined(val[col].primary) && this.dataSource.data.length > 1) {
      for (let d = 0; d < this.dataSource.data.length; d++) {
        if (this.dataSource.data[d][col].value == data && d != indx) {
          return true;
        }
      }
    }
    return false;
  }

  formatTableData() {
    const array = [];
    for (let t = 0; t < this.dataSource.data.length; t++) {
      const object = {};
      this.keys.map(res => {
        (res.col != 'delete') ? object[res.col] = this.dataSource.data[t][res.col].value : null;
        if (this.runtimeConfigService.tableColumnsData[this.routeParam][res.col] == 'checkbox') {
          object['check'] = (this.runtimeConfigService.tableColumnsData[this.routeParam][res.col] == 'checkbox') ? this.dataSource.data[t][res.col].value : true
        }
      })
      if ((this.dataSource.data.length - this.removeEmptyRow) != t) {
        if (object.hasOwnProperty('check')) {
          if (object['check']) {
            array.push(object);
          }
        } else {
          array.push(object);
        }
      }
    }
    return array;
  }

  checkAll(col, flag = true) {
    this.spinner.show();
    this.checkAllColValue.col = col;
    if (flag) {
      this.dataSource.data.map(res => res[this.checkAllColValue.col].value = this.checkAllColValue.val)
    }
    this.dataSource = new MatTableDataSource(JSON.parse(JSON.stringify(this.dataSource.data)));
    this.emitTableData.emit(this.formatTableData());
    this.spinner.hide();
  }


  setTableData() {
    // let data = [];
    // if (!this.commonService.checkNullOrUndefined(this.dataSource)) {
    //   data = (!this.commonService.checkNullOrUndefined(this.dataSource.data.length)) ? this.dataSource.data : this.tableData;
    // } else {
    //   data = this.tableData;
    // }
    if (!this.commonService.checkNullOrUndefined(this.tableData)) {
      if (this.tableData.length) {
        this.dataSource = new MatTableDataSource(JSON.parse(JSON.stringify(this.tableData)));
      }
      this.keys = [];
      const col = [];
      // tslint:disable-next-line:forin
      for (const key in this.tableData[0]) {
        this.keys.push({ col: key, disabled: this.tableData[0][key].disabled ? this.tableData[0][key].disabled : false, hide: this.tableData[0][key].hide });
      }
      this.keys.forEach(cols => {
        const obj = {
          def: cols.col, label: cols.col, hide: cols.hide, disabled: cols.disabled
        };
        col.push(obj);
      });
      this.columnDefinitions = [];

      // tslint:disable-next-line:forin
      for (let key in this.runtimeConfigService.tableColumnsData[this.routeParam]) {
        for (let c = 0; c < col.length; c++) {
          if (key == col[c].def && !col[c].hide) {
            this.columnDefinitions.push(col[c]);
          }
        }
      }

    }
  }

  getDisplayedColumns(): string[] {
    if (!this.commonService.checkNullOrUndefined(this.tableData)) {
      return this.columnDefinitions.map(cd => cd.def);
    }
  }

  setCurrentFocus() {
    this.commonService.setFocus(this.id + this.index);
  }

  setFocus(id?, indx?, data?) {
    this.data = this.commonService.checkNullOrUndefined(data) ? this.data : data;
    if (this.checkValue()) {
      let flag = false;
      let nextId = '';
      this.id = this.commonService.checkNullOrUndefined(id) ? this.id : id;
      this.index = this.commonService.checkNullOrUndefined(indx) ? this.index : indx;
      // tslint:disable-next-line:forin
      for (let c = 0; c < this.columnDefinitions.length; c++) {
        if (flag && !this.columnDefinitions[c].disabled && this.columnDefinitions[c].def != 'delete') {
          nextId = this.columnDefinitions[c].def;
          break;
        }
        if (this.id == this.columnDefinitions[c].def) {
          flag = true;
        }
      }
      if (nextId == '') {
        for (let c = 0; c < this.columnDefinitions.length; c++) {
          if (!this.columnDefinitions[c].disabled) {
            nextId = this.columnDefinitions[c].def;
            this.index = this.index + 1;
            break;
          }
        }
      }
      this.commonService.setFocus(nextId + this.index);
    }
  }

  checkValue() {
    if (this.isDropdown) {
      if (this.commonService.checkNullOrUndefined(this.data) && this.isDropdown) {
        return false;
      }
    }
    return true;
  }

  ngOnDestroy() {
    this.emitDynTableData.unsubscribe();
  }
}
