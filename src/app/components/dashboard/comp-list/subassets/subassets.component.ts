import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { String } from 'typescript-string-operations';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConfigService } from '../../../../services/api-config.service';
import { StatusCodes } from '../../../../enums/common/common';
import { AddOrEditService } from '../add-or-edit.service';
import { AlertService } from '../../../../services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../../../services/common.service';



@Component({
  selector: 'app-subassets',
  templateUrl: './subassets.component.html',
  styleUrls: ['./subassets.component.scss']
})

export class SubAssetsComponent implements OnInit {

  modelFormData: FormGroup;
  isSubmitted = false;
  formData: any;
  taxcodeList: any;
  taxaccList: any;
  tdsList: any;
  mamList: any;
  maList: any;
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
  massetlist: any;
  _stockissueHdr: any;
  saList:any;
  dynTableProps = {
    displayedColumns: ['SlNo', 'depreciationData', 'depreciationArea', 'delete'],
    tableData: {
        depreciationData: {
          value: null, type: 'dropdown', list: [], id: 'code', text: 'description', disabled: false, displayMul: true
        },
        depreciationArea: {
          value: null, type: 'dropdown', list: [], id: 'code', text: 'description', disabled: false, displayMul: true
        },
        delete: {
          type: 'delete',
          newObject: true
        }
      },
    formControl: {
      depreciationData: [null, [Validators.required]],
      depreciationArea: [null]
    }
  }

  constructor(
    private apiService: ApiService,
    private addOrEditService: AddOrEditService,
    private apiConfigService: ApiConfigService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService
  ) {
    // @Optional() is used to prevent error if no data is passed
    // @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.modelFormData = this.formBuilder.group({
      subAssetNumber: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(7)]],
      description: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      mainAssetNo: [null],
      accountKey: [null],
      materialNo: [null],
      serialNumber: [null],
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
      usefullLifeInDays: [null],
      usefulLifeInYears: [null],
      depreciationData: [null],
      depreciationArea: [null],
      depreciationCode: [null],
      depreciationStartDate: [null]

    });


    this.formData = { ...this.addOrEditService.editData };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      this.modelFormData.controls['subAssetNumber'].disable();
    }

  }

  ngOnInit() {
    this.getmainassetclassTableData();
    this.getassetclassTableData();
    this.getaccountkeyList();
    this.getsegmentList();
    this.getbranchList();
    this.getprofitCenterList();
    this.getdivisionList();
    this.getplantList();
    this.getLocationList();
    this.getdepreciationCodeTableData();
    this. getmainassetnumTableData();
    this. getsubassetData();
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
              this.dynTableProps.tableData.depreciationData.list = this.dpList;
            }
          }
          this.getdepreciationAreaTableData();
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
              this.dynTableProps.tableData.depreciationArea.list = this.dpareaList;
              this.addOrEditService.sendDynTableData(this.dynTableProps);
            }
          }
          this.spinner.hide();
        });
  }
  getmainassetnumTableData() {
    const getdepreciationAreaUrl = String.Join('/', this.apiConfigService.getMainAssetMasterList);
    this.apiService.apiGetRequest(getdepreciationAreaUrl)
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
  getsubassetData() {
    const getdepreciationAreaUrl = String.Join('/', this.apiConfigService.getSubAssetsList);
    this.apiService.apiGetRequest(getdepreciationAreaUrl)
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

  // --

  getchartAccount(value) {
    const getInvoiceDeatilListUrl = String.Join('/', this.apiConfigService.GetListsforMainAsset, this.modelFormData.get('mainAssetNo').value);
    this.apiService.apiGetRequest(getInvoiceDeatilListUrl).subscribe(
      response => {
        const res = response.body;
        if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!isNullOrUndefined(res.response)) {
            if (!isNullOrUndefined(res.response))
             {
              this.modelFormData.patchValue(res.response);
              this.spinner.hide();
            }
          }
        }
      });
    this.modelFormData.patchValue({
     // subAssetNumber: (this.modelFormData.get('mainAssetNo').value)
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

  get formControls() { return this.modelFormData.controls; }


  save() {
    if (this.modelFormData.invalid) {
      return;
    }
    
    this.modelFormData.controls['subAssetNumber'].enable();
    this.modelFormData.patchValue({
      subAssetNumber: (this.modelFormData.get('mainAssetNo').value)+ (this.modelFormData.get('subAssetNumber').value)
    });
    this.formData.item = this.modelFormData.value;
    this.addOrEditService[this.formData.action](this.formData, (res) => {
      this.router.navigate(['/dashboard/master/subassets']);
    });
    if (this.formData.action == 'Edit') {
      this.modelFormData.controls['subAssetNumber'].disable();
    }
  }

  cancel() {
    this.router.navigate(['/dashboard/master/subassets']);
  }

}
