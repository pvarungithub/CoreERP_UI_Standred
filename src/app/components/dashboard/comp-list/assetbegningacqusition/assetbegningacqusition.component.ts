import { Component, OnInit } from '@angular/core';
import { String } from 'typescript-string-operations';
import { ApiService } from '../../../../services/api.service';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConfigService } from '../../../../services/api-config.service';
import { StatusCodes } from '../../../../enums/common/common';
import { AddOrEditService } from '../add-or-edit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../../services/alert.service';
import { Static } from '../../../../enums/common/static';
import { SnackBar } from '../../../../enums/common/common';


@Component({
  selector: 'app-assetbegningacqusition',
  templateUrl: './assetbegningacqusition.component.html',
  styleUrls: ['./assetbegningacqusition.component.scss']
})

export class AssetBegningAcqusitionComponent implements OnInit {

  modelFormData: FormGroup;
  tableFormData: FormGroup;
  routeEdit = '';
  tableData = [];
  dynTableProps = this.tablePropsFunc()
  isSubmitted = false;
  formData: any;
  taxcodeList: any;
  taxaccList: any;
  tdsList:any;
  nrrList:any;
  companyList: any;
  saList: any;
  mamList: any;
  dpareaList: any;

  constructor(
    private apiService: ApiService,
    private addOrEditService: AddOrEditService,
    private apiConfigService: ApiConfigService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router,
    public route: ActivatedRoute,
  ) {
    if (!isNullOrUndefined(this.route.snapshot.params.value)) {
      this.routeEdit = this.route.snapshot.params.value;
    }

    this.modelFormData = this.formBuilder.group({
      acquisitionCost:[null],
      acquisitionDate: [null],
      code:[null],
      id: ['0'],
      mainAssetDescription:[null],
      mainAssetNo:[null],
      subAssetDescription:[null],
      subAssetNo: [null],
      depreciationArea:[null]
      
         });

    this.formData = { ...this.addOrEditService.editData };
  }
  tablePropsFunc() {
    return {
      tableData: {

        depreciationArea: {
          value: null, type: 'dropdown', list: this.dpareaList, id: 'code', text: 'description',
          disabled: false, displayMul: true
        },
        accumulatedDepreciation: {
          value: null, type: 'text', width: 150, maxLength: 10
        },
        delete: {
          type: 'delete',
          newObject: true
        }
      },

      formControl: {
        depreciationArea: [null,],
        accumulatedDepreciation: [null, [Validators.required]]
      }
    }
  }

  ngOnInit() {
    this. getmainassetclassTableData();
    this.getSubassetList();
    this.getdepreciationAreaList();
  }
  getdepreciationAreaList() {
    const getlocList = String.Join('/', this.apiConfigService.getDepreciationAreasList);
    this.apiService.apiGetRequest(getlocList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.dpareaList = res.response['dpareaList'];
             
            }
          }
          this.dynTableProps = this.tablePropsFunc();
          if (this.routeEdit != '') {
            this.getAqsnDetail(this.routeEdit);
          }
          //this.spinner.hide();
        });
  }
  getSubassetList() {
    const getplantList = String.Join('/', this.apiConfigService.getSubAssetsList);
    this.apiService.apiGetRequest(getplantList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.saList = res.response['saList'];
            }
          }
          this.spinner.hide();
        });
  }
  getmainassetclassTableData() {
    const getCompanyUrl = String.Join('/', this.apiConfigService.getMainAssetMasterList);
    this.apiService.apiGetRequest(getCompanyUrl)
      .subscribe(
        response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            this.mamList = res.response['mamList'];
          }
        }
          this.spinner.hide();
      });
  }

  ///databind on editmode
  getAqsnDetail(val) {
    const cashDetUrl = String.Join('/', this.apiConfigService.getAqsnDetail, val);
    this.apiService.apiGetRequest(cashDetUrl)
      .subscribe(
        response => {
          this.spinner.hide();
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              //console.log(res.response['AqsnMasters']);
              console.log((res.response['AqsnMasters']));
              //console.log((res.response['AqsnDetail']));
              this.modelFormData.setValue(res.response['AqsnMasters']);
              this.addOrEditService.sendDynTableData({ type: 'edit', data: res.response['AqsnDetail'] });
            }
          }
        });
  }
  assigndata
  emitColumnChanges(data) {
   this.assigndata(data);
  }

  //assigndata(row) {
  //  if (row.column == 'depreciationCode') {
  //    const code = row.data[row.index]['depreciationCode'].list.find(res => res.code == row.data[row.index]['depreciationCode'].value);
  //    if (!isNullOrUndefined(code)) {
  //      row.data[row.index].rate.value = code.rate;
  //      this.addOrEditService.sendDynTableData({ type: 'add', data: row.data });
  //    }
  //  }
  //}

  get formControls() { return this.modelFormData.controls; }

  emitTableData(data) {
    this.tableData = data;
  }

  save() {
    this.saveBeingAcquisition();

  }
  reset() {
    this.tableData = [];
    this.modelFormData.reset();
    this.addOrEditService.sendDynTableData(this.tableData);
  }
  saveBeingAcquisition() {
    debugger;
    const addCashBank = String.Join('/', this.apiConfigService.registeraqsnList);
    const requestObj = { mainaqsnHdr: this.modelFormData.value, mainaqsnDetail: this.tableData };
    this.apiService.apiPostRequest(addCashBank, requestObj).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            this.alertService.openSnackBar('BeingAcquisition created Successfully..', Static.Close, SnackBar.success);
          }
          this.reset();
          this.spinner.hide();
        }
      });
  }

  cancel() {
    this.router.navigate(['/dashboard/master/assetbegningacqusition']);
  }

}
