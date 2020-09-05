import { Component, OnInit, OnDestroy } from '@angular/core';
import { String } from 'typescript-string-operations';
import { ApiService } from '../../../../services/api.service';
import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConfigService } from '../../../../services/api-config.service';
import { StatusCodes } from '../../../../enums/common/common';
import { AddOrEditService } from '../add-or-edit.service';
import { Router, ActivatedRoute } from '@angular/router';

interface TaxClassification {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-businesspartner',
  templateUrl: './businesspartner.component.html',
  styleUrls: ['./businesspartner.component.scss']
})

export class BusienessPartnerAccountComponent implements OnInit, OnDestroy {
  modelFormData: FormGroup;
  formData: any;
  companyList: any;
  employeesList: any;
  stateList: any;
  ptypeList: any;
  regionsList: any;
  countrysList: any;
  ptermsList: any;
  bpgList: any;
  tdsList: any;
  tdsratesList: any;
  glList: any;
  controlAccountList: any;
  bpgLists:any;
  bpaNum: any;
  bpname: any;

  taxClassification: TaxClassification[] =
    [
      { value: 'Registered', viewValue: 'Registered' },
      { value: 'UnRegistered', viewValue: 'UnRegistered' }
    ];

  constructor(
    private apiService: ApiService,
    private addOrEditService: AddOrEditService,
    private apiConfigService: ApiConfigService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {

    this.modelFormData = this.formBuilder.group({
      code: [null],
      name: [null],
      bpnumber: [null],
      bptype: [null],
      name1: [null],
      search: [null],
      address: [null],
      address1: [null],
      location: [null],
      city: [null],
      state: [null],
      region: [null],
      country: [null],
      email: [null],
      phone: [null],
      mobile: [null],
      gstno: [null],
      panno: [null],
      tanno: [null],
      taxClassification: [null],
      company: [null],
      controlAccount: [null],
      paymentTerms: [null],
      tdstype: [null],
      tdsrate: [null],
      baseAmount: [null],
      obligationFrom: [null],
      obligationTo: [null],
      bankKey: [null],
      bankName: [null],
      bankAccountNo: [null],
      ifsccode: [null],
      swiftcode: [null],
      bankBranch: [null],
      bankBranchNo: [null],
      contactPersion: [null],
      contactPersionMobile: [null],
      narration: [null],
      bpgroup: [null],
      ext: [null]
    });

    this.formData = { ...this.addOrEditService.editData };
    if (!isNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
    }
  }

  ngOnInit() {
    this.getTableData();
    this.getstateList();
    this.getPaymenttermsList();
    this.getregionsList();
    this.getcountrysList();
    this.getptypeList();
    this.getEmployeesList();
    this.getPartnerGroupsTableData();
    this.getTDSTableData();
    this.getTDSRateTableData();
    this.getGLAccountData();
  }

  onbpChange() {
    this.controlAccountList = [];
    this.bpgLists=[];
    let data = this.ptypeList.find(res => res.code == this.modelFormData.get('bptype').value);
    this.controlAccountList = this.glList.filter(res => res.controlAccount == data.description);
    this.bpgLists=this.bpgList.filter(res => res.bptype == data.code);

  }

  onChange(event: any) {
    const getAccountSubGrouplist = String.Join('/', this.apiConfigService.getbpNumbers,
      this.modelFormData.get('bpgroup').value, this.modelFormData.get('bpnumber').value);
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

  gettingbpgroupname() {
    const getAccountSubGrouplist = String.Join('/', this.apiConfigService.getttingbpNames,
      this.modelFormData.get('bpgroup').value);
    this.apiService.apiGetRequest(getAccountSubGrouplist)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.bpname = res.response['bpname'];
              this.modelFormData.patchValue({
                ext: this.bpname
              });
            }
          }
          this.spinner.hide();
        });
  }

  getBPNumberData() {
    this.gettingbpgroupname();
    const getAccountSubGrouplist = String.Join('/', this.apiConfigService.getttingbpNumbers,
      this.modelFormData.get('bpgroup').value);
    this.apiService.apiGetRequest(getAccountSubGrouplist)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {

              this.bpaNum = res.response['bpaNum'];
              this.modelFormData.patchValue({
                bpnumber: this.bpaNum
              });
            }
          }
          this.spinner.hide();
        });
  }

  getGLAccountData() {
    const getGLAccountUrl = String.Join('/', this.apiConfigService.getGLAccountList);
    this.apiService.apiGetRequest(getGLAccountUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.glList = res.response['glList'];
            }
          }
          this.spinner.hide();
        });
  }

  getTableData() {
    const getCompanyUrl = String.Join('/', this.apiConfigService.getCompanyList);
    this.apiService.apiGetRequest(getCompanyUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.companyList = res.response['companiesList'];
            }
          }
          this.spinner.hide();
        });
  }

  getTDSTableData() {
    const getTDSUrl = String.Join('/', this.apiConfigService.getTDStypeList);
    this.apiService.apiGetRequest(getTDSUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.tdsList = res.response['tdsList'];
            }
          }
          this.spinner.hide();
        });
  }

  getTDSRateTableData() {
    const getTDSRateUrl = String.Join('/', this.apiConfigService.getTDSRateList);
    this.apiService.apiGetRequest(getTDSRateUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.tdsratesList = res.response['tdsratesList'];
            }
          }
          this.spinner.hide();
        });
  }

  getPartnerGroupsTableData() {
    const gettPartnerGroupsUrl = String.Join('/', this.apiConfigService.getBusienessPartnersGroupsList);
    this.apiService.apiGetRequest(gettPartnerGroupsUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.bpgList = res.response['bpgList'];
            }
          }
          this.spinner.hide();
        });
  }

  getPaymenttermsList() {
    const getpmList = String.Join('/', this.apiConfigService.getPaymentsTermsList);
    this.apiService.apiGetRequest(getpmList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.ptermsList = res.response['ptermsList'];
            }
          }
          this.spinner.hide();
        });
  }

  getregionsList() {
    const getRegionsList = String.Join('/', this.apiConfigService.getRegionsList);
    this.apiService.apiGetRequest(getRegionsList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.regionsList = res.response['RegionList'];
            }
          }
          this.spinner.hide();
        });
  }

  getcountrysList() {
    const getCountrysList = String.Join('/', this.apiConfigService.getCountrysList);
    this.apiService.apiGetRequest(getCountrysList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.countrysList = res.response['CountryList'];
            }
          }
          this.spinner.hide();
        });
  }

  getstateList() {
    const getstateList = String.Join('/', this.apiConfigService.getstatesList);
    this.apiService.apiGetRequest(getstateList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.stateList = res.response['StatesList'];
            }
          }
          this.spinner.hide();
        });
  }

  getptypeList() {
    const getcurrencyList = String.Join('/', this.apiConfigService.getPartnerTypeList);
    this.apiService.apiGetRequest(getcurrencyList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.ptypeList = res.response['ptypeList'];
            }
          }
          this.spinner.hide();
        });
  }

  getEmployeesList() {
    const getEmployeeList = String.Join('/', this.apiConfigService.getEmployeeList);
    this.apiService.apiGetRequest(getEmployeeList)
      .subscribe(
        response => {
          const res = response.body;
          if (!isNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!isNullOrUndefined(res.response)) {
              this.employeesList = res.response['employeesList'];
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
    this.modelFormData.controls['bpnumber'].enable();
    this.formData.item = this.modelFormData.value;
    this.addOrEditService[this.formData.action](this.formData, (res) => {
      this.router.navigate(['/dashboard/master/businesspartner']);
    });
    if (this.formData.action == 'Edit') {
      this.modelFormData.controls[''].disable();
    }
  }

  cancel() {
    this.router.navigate(['/dashboard/master/businesspartner']);
  }

  ngOnDestroy() {
    this.addOrEditService.editData = null;
  }
}