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

interface depreciationData {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-mainassetmasters',
  templateUrl: './mainassetmasters.component.html',
  styleUrls: ['./mainassetmasters.component.scss']
})

export class MainAssetMasterComponent implements OnInit {

  modelFormData: FormGroup;
  tableFormData: FormGroup;
  routeEdit = '';
  tableData = [];
  dynTableProps = this.tablePropsFunc()
  isSubmitted = false;
  formData: any;
  assetList: any;
  plantList: any;
  segmentList: any;
  divisionsList: any;
  branchesList: any;
  profitCenterList: any;
  acckeyList: any;
  locationList: any;
  dpareaList: any;
  dpList: any;
  companyList: any;
  assetNum: any;

  depreciationDatas: depreciationData[] =
    [
      { value: 'Multiple ', viewValue: 'Multiple ' },
      { value: 'assignment ', viewValue: 'assignment ' },
      { value: 'required', viewValue: 'required' }
    ];

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
      assetNumber: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(7)]],
      name: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      name1: [null],
      accountKey: [null],
      materialNo: [null],
      serialNo: [null],
      quantity: [null],
      branch: [null],
      profitCenter: [null],
      segment: [null],
      division: [null],
      plant: [null],
      location: [null],
      room: [null],
      supplier: [null],
      acquisitionDate: [null],
      usefulLifeYears: [null],
      usefulLifeDays: [null],
      depreciationData: [null],
      depreciationArea: [null],
      depreciationCode: [null],
      depreciationStartDate: [null],
      assetclass: [null],
      company: [null],
      assetClassName: [null],
      accountKeyName: [null],
      branchName: [null],
      profitCenterName: [null],
      segmentName: [null],
      divisionName: [null],
      plantName: [null],
      locationName: [null],
      depreciationDataName: [null],
      companyName: [null],
      ext: [null],
      ext1: [null],
      depreciationAreaName: [null],
      numberRange: [null],
      classType: [null],
      lowValueAssetClass: [null],
      assetLowValue: [null],
      description: [null],
      lastNumberRange: [null],
      nature: [null]
    });

    this.formData = { ...this.addOrEditService.editData };
  }

  tablePropsFunc() {
    return {
      tableData: {

        depreciationCode: {
          value: null, type: 'dropdown', list: this.dpList, id: 'code', text: 'description', disabled: false, displayMul: true
        },
        Rate: {
          value: null, type: 'dropdown', list: this.dpList, id: 'code', text: 'description', disabled: false, displayMul: true
        },
        depreciationArea: {
          value: null, type: 'dropdown', list: this.dpareaList, id: 'code', text: 'description', disabled: false, displayMul: true
        },
        depreciationStartDate: {
          value: null, type: 'datepicker', disabled: false
        },
        delete: {
          type: 'delete',
          newObject: true
        }
      },

      formControl: {
        Rate: [null,],
        depreciationCode: [null,],
        depreciationArea: [null, [Validators.required]]
      }
    }
  }

  ngOnInit() {
    this.getbranchList();
    this.getassetclassTableData();
    this.getaccountkeyList();
    this.getsegmentList();
    this.getprofitCenterList();
    this.getdivisionList();
    this.getplantList();
    this.getLocationList();
    this.getdepreciationCodeTableData();
    this.getdepreciationAreaTableData();
    this.getTableData();
    this.getassetTableData();
  }

  getbranchList() {
    const getbranchList = String.Join('/', this.apiConfigService.getBranchesList);
    this.apiService.apiGetRequest(getbranchList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.branchesList = res.response['branchesList'];
            }
          }
        });
  }

  getmainassetDetail(val) {
    const cashDetUrl = String.Join('/', this.apiConfigService.getMainAssetsDetail, val);
    this.apiService.apiGetRequest(cashDetUrl)
      .subscribe(
        response => {
          this.spinner.hide();
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.modelFormData.setValue(res.response['MainassetMasters']);
              //this.addOrEditService.sendDynTableData(res.response['MainassetDetail']);
              this.addOrEditService.sendDynTableData({ type: 'edit', data: res.response['MainassetDetail']});
            }
          }
        });
  }

  onChange(event: any) {
    const getAccountSubGrouplist = String.Join('/', this.apiConfigService.getAssetnumber,
      this.modelFormData.get('assetclass').value, this.modelFormData.get('assetNumber').value);
    this.apiService.apiGetRequest(getAccountSubGrouplist)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
            }
          }
          this.spinner.hide();
        });
  };

  getassetNumberData() {
    this.gettingaseetname();
    const getAccountSubGrouplist = String.Join('/', this.apiConfigService.getasetnos,
      this.modelFormData.get('assetclass').value);
    this.apiService.apiGetRequest(getAccountSubGrouplist)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.assetNum = res.response['astnum'];
              this.modelFormData.patchValue({
                assetNumber: this.assetNum
              });
            }
          }
          this.spinner.hide();
        });
  }

  gettingaseetname() {
    const getAccountSubGrouplist = String.Join('/', this.apiConfigService.getttinasNames,
      this.modelFormData.get('assetclass').value);
    this.apiService.apiGetRequest(getAccountSubGrouplist)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.modelFormData.patchValue(res.response['assetname']);
            }
          }
          this.spinner.hide();
        });
  }

  getTableData() {
    const getCompanyUrl = String.Join('/', this.apiConfigService.getCompanysList);
    this.apiService.apiGetRequest(getCompanyUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.companyList = res.response['companiesList'];
            }
          }
        });
  }

  getassetTableData() {
    const getassetyUrl = String.Join('/', this.apiConfigService.getAssetClassList);
    this.apiService.apiGetRequest(getassetyUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.assetList = res.response['assetList'];
            }
          }
          this.spinner.hide();
        });
  }

  getassetclassTableData() {
    const getCompanyUrl = String.Join('/', this.apiConfigService.getAssetClassList);
    this.apiService.apiGetRequest(getCompanyUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.assetList = res.response['assetList'];
            }
          }
          this.spinner.hide();
        });
  }

  getdepreciationCodeTableData() {
    const getdepreciationCodeUrl = String.Join('/', this.apiConfigService.getDepreciationcodeList);
    this.apiService.apiGetRequest(getdepreciationCodeUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.dpList = res.response['dpList'];
              this.dynTableProps = this.tablePropsFunc();
            }
          }
          this.spinner.hide();
        });
  }

  getdepreciationAreaTableData() {
    const getdepreciationAreaUrl = String.Join('/', this.apiConfigService.getDepreciationAreasList);
    this.apiService.apiGetRequest(getdepreciationAreaUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.dpareaList = res.response['dpareaList'];
              this.dynTableProps = this.tablePropsFunc();
            }
          }
          this.dynTableProps = this.tablePropsFunc();
          if (this.routeEdit != '') {
            this.getmainassetDetail(this.routeEdit);
          }
        });
  }

  getaccountkeyList() {
    const getackeyList = String.Join('/', this.apiConfigService.getAccountKeyList);
    this.apiService.apiGetRequest(getackeyList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.acckeyList = res.response['acckeyList'];
            }
          }
          this.spinner.hide();
        });
  }

  getprofitCenterList() {
    const getprofitCentersList = String.Join('/', this.apiConfigService.getProfitCenterList);
    this.apiService.apiGetRequest(getprofitCentersList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.profitCenterList = res.response['profitCenterList'];
            }
          }
          this.spinner.hide();
        });
  }

  getsegmentList() {
    const getsegmentList = String.Join('/', this.apiConfigService.getSegmentList);
    this.apiService.apiGetRequest(getsegmentList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.segmentList = res.response['segmentList'];
            }
          }
          this.spinner.hide();
        });
  }

  getdivisionList() {
    const getdivisionList = String.Join('/', this.apiConfigService.getDivisionsList);
    this.apiService.apiGetRequest(getdivisionList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.divisionsList = res.response['divisionsList'];
            }
          }
          this.spinner.hide();
        });
  }

  getplantList() {
    const getplantList = String.Join('/', this.apiConfigService.getplantList);
    this.apiService.apiGetRequest(getplantList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.plantList = res.response['plantList'];
            }
          }
          this.spinner.hide();
        });
  }

  getLocationList() {
    const getlocList = String.Join('/', this.apiConfigService.getlocationList);
    this.apiService.apiGetRequest(getlocList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.locationList = res.response['locationList'];
            }
          }
          this.spinner.hide();
        });
  }

  get formControls() { return this.modelFormData.controls; }

  emitTableData(data) {
    this.tableData = data;
  }

  save() {
    this.saveMainassets();

  }

  reset() {
    this.tableData = [];
    this.modelFormData.reset();
    this.addOrEditService.sendDynTableData(this.tableData);
  }

  saveMainassets() {
    const addCashBank = String.Join('/', this.apiConfigService.registermainAssetsList);
    const requestObj = { mainasstHdr: this.modelFormData.value, mainassetDetail: this.tableData };
    this.apiService.apiPostRequest(addCashBank, requestObj).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            this.alertService.openSnackBar('MainAssets created Successfully..', Static.Close, SnackBar.success);
          }
          this.reset();
          this.spinner.hide();
        }
      });
  }

  cancel() {
    this.router.navigate(['/dashboard/master/mainassetmaster']);
  }
}