import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiConfigService } from '../../../../services/api-config.service';
import { String } from 'typescript-string-operations';
import { ApiService } from '../../../../services/api.service';
import { StatusCodes, SnackBar } from '../../../../enums/common/common';
import { CommonService } from '../../../../services/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { Static } from '../../../../enums/common/static';
import { AlertService } from '../../../../services/alert.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../../../directives/format-datepicker';

@Component({
  selector: 'app-inspectioncheck',
  templateUrl: './inspectioncheck.component.html',
  styleUrls: ['./inspectioncheck.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class InspectioncheckComponent implements OnInit {

  // form control
  formData: FormGroup;
  sendDynTableData: any;

  // header props
  companyList = [];
  plantList = [];
  deptList = [];
  branchList = [];
  costcenterList = [];
  profitCenterList = [];
  projectNameList = [];
  wbsList = [];

  // details props
  tableData = [];
  dynTableProps: any;
  routeEdit = '';
  costunitList: any;
  materialList: any;
  UomList: any;
  ptypeList: any;
  locationList: any;
  purchaseordernoList: any;
  inspectionnoList: any;
  inspectiondetailsList: any;
  grList: any;

  constructor(
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    public route: ActivatedRoute,
    private router: Router
  ) {
    if (!this.commonService.checkNullOrUndefined(this.route.snapshot.params.value)) {
      this.routeEdit = this.route.snapshot.params.value;
    }
  }

  ngOnInit() {
    this.formDataGroup();
    this.getCompanyList();
  }

  tablePropsFunc() {
    return {
      tableData: {
        checkAll:
        {
          value: false, type: 'checkbox'
        },
        materialCode: {
          value: null, type: 'number', width: 100, maxLength: 50,disabled: true
          //value: null, type: 'dropdown', list: this.materialList, id: 'id', text: 'text', displayMul: true, width: 100
        },
        description: {
          value: null, type: 'text', width: 100, maxLength: 50,disabled: true
        },
        receivedQty: {
          value: null, type: 'number', width: 100, maxLength: 50,disabled: true
        },
        rejectedQty: {
          value: null, type: 'number', width: 100, maxLength: 50,disabled: true,fieldEnable: true
        },
        location: {
          value: null, type: 'text', width: 100, maxLength: 50,disabled: true
          //value: null, type: 'dropdown', list: this.locationList, id: 'locationId', text: 'description', displayMul: false, width: 100
        },
        
        movementTo: {
          value: null, type: 'text', width: 100, maxLength: 50,disabled: true
        },
        rejectReason: {
          value: null, type: 'text', width: 100, maxLength: 50,disabled: true,fieldEnable: true
        },
        text: {
          value: null, type: 'text', width: 100, maxLength: 50,disabled: true
        },
        lotNo: {
          value: null, type: 'number', width: 100, maxLength: 50, disabled: true
        },
        lotDate: {
          value: new Date(), type: 'datepicker', width: 100, disabled: true
        },

        delete: {
          type: 'delete', width: 10
        }
      },

      formControl: {
        materialCode: [null, [Validators.required]],
      }
    };
  }

  formDataGroup() {
    this.formData = this.formBuilder.group({
      company: [null, [Validators.required]],
      plant: [null],
      branch: [null],
      profitCenter: [null],
      inspectionCheckNo: [null],
      status: [null],
      addWho: [null],
      addDate: [null],
      editWho: [null],
      editDate: [null]
    });
  }

  getCompanyList() {
    const companyUrl = String.Join('/', this.apiConfigService.getCompanyList);
    this.apiService.apiGetRequest(companyUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.companyList = res.response['companiesList'];
            }
          }
          this.getlocationList();
        });
  }
  getlocationList() {
    const getlocationUrl = String.Join('/', this.apiConfigService.getlocationList);
    this.apiService.apiGetRequest(getlocationUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.locationList = res.response['locationList'];
            }
          }
          this.getmaterialData();
        });
  }
  getmaterialData() {
    const getmaterialUrl = String.Join('/', this.apiConfigService.getMaterialList);
    this.apiService.apiGetRequest(getmaterialUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.materialList = res.response['materialList'];
            }
          }
          this.getinspectionnoList();
        });
  }
  getinspectionnoList() {
    const poUrl = String.Join('/', this.apiConfigService.getinspectionnoList);
    this.apiService.apiGetRequest(poUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.inspectionnoList = res.response['inspectionnoList'];
            }
          }
         this.getplantList();
        });
  }

  getplantList() {
    const getplantList = String.Join('/', this.apiConfigService.getplantList);
    this.apiService.apiGetRequest(getplantList)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.plantList = res.response['plantList'];
            }
          }
          this.getBranchList();
        });
  }



  getBranchList() {
    const branchUrl = String.Join('/', this.apiConfigService.getBranchList);
    this.apiService.apiGetRequest(branchUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.branchList = res.response['branchsList'];
            }
          }
          this.getProfitcenterData();
        });
  }


  getProfitcenterData() {
    const getpcUrl = String.Join('/', this.apiConfigService.getProfitCenterList);
    this.apiService.apiGetRequest(getpcUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.profitCenterList = res.response['profitCenterList'];
            }
          }
          this.getGoodsreceiptData();
        });
  }
  getGoodsreceiptData() {
    const getgrUrl = String.Join('/', this.apiConfigService.getGoodsreceiptDataList);
    this.apiService.apiGetRequest(getgrUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.grList = res.response['grList'];
            }
          }
          this.getinspectioncheckdetailsList();
        });
  }
  getinspectioncheckdetailsList() {
    const getinspectioncheckListUrl = String.Join('/', this.apiConfigService.getinspectioncheckList);
    this.apiService.apiGetRequest(getinspectioncheckListUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.inspectiondetailsList = res.response['inspectiondetailsList'];
            }
          }
          this.getWbsList();
        });
  }
  getWbsList() {
    const segUrl = String.Join('/', this.apiConfigService.getwbselement);
    this.apiService.apiGetRequest(segUrl)
      .subscribe(
        response => {
          this.spinner.hide();
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.wbsList = res.response['wbsList'];
            }
          }
          this.dynTableProps = this.tablePropsFunc();
          if (this.routeEdit != '') {
            this.getInspectionCheckDetails(this.routeEdit);
          }
        });
  }

  getInspectionCheckDetails(val) {
    const qsDetUrl = String.Join('/', this.apiConfigService.getinspectioncheckDetail, val);
    this.apiService.apiGetRequest(qsDetUrl)
      .subscribe(
        response => {
          this.spinner.hide();
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.formData.setValue(res.response['icmasters']);
              console.log(res.response['icDetail']);
              this.sendDynTableData = { type: 'edit', data: res.response['icDetail'] };
              this.formData.disable();
            }
          }
        });
  }

  inspectionCheckNoselect() {
    let data = [];
    let newData = [];

    if (!this.commonService.checkNullOrUndefined(this.formData.get('inspectionCheckNo').value)) {
  var  data1 = this.grList.find(resp => resp.inspectionNoteNo == this.formData.get('inspectionCheckNo').value);

      data = this.inspectiondetailsList.filter(resp => resp.purchaseOrderNo ==data1.purchaseOrderNo);
    }
    if (data.length) {
      console.log(data, this.tablePropsFunc());
      data.forEach((res, index) => {
        newData.push(this.tablePropsFunc().tableData);
        newData[index].materialCode.value = res.materialCode;
        newData[index].location.value = res.storageLocation;
        newData[index].description.value = res.description;
        newData[index].movementTo.value = res.movementType;
        newData[index].rejectReason.value = null;
        newData[index].receivedQty.value = res.receivedQty;
        newData[index].rejectedQty.value = null;
        newData[index].text.value = null;
        newData[index].lotNo.value = res.lotNo;
       newData[index].lotDate.value = new Date();
      })
    }
    //
    this.sendDynTableData = { type: 'add', data: newData, removeEmptyRow: 0 };
  }
  emitColumnChanges(data) 
  {
    if (data.column == 'checkAll')
    {
      this.sendDynTableData = { type: 'add', data: data.data, removeEmptyRow: 0 };
    }
  }

  emitTableData(data)
 {
    this.tableData = data;
  }


  back() {
    this.router.navigate(['dashboard/transaction/inspectioncheck'])
  }

  save() {
    if (this.tableData.length == 0 && this.formData.invalid) {
      return;
    }
    this.saveinspectioncheck();
  }

  saveinspectioncheck() {
    const addsq = String.Join('/', this.apiConfigService.addinspectioncheck);
    const requestObj = { icHdr: this.formData.value, icDtl: this.tableData };
    this.apiService.apiPostRequest(addsq, requestObj).subscribe(
      response => {
        const res = response.body;
        if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!this.commonService.checkNullOrUndefined(res.response)) {
            this.alertService.openSnackBar('Inspection Check created Successfully..', Static.Close, SnackBar.success);
          }
          this.reset();
          this.spinner.hide();
        }
      });
  }

  return() {
    const addCashBank = String.Join('/', this.apiConfigService.returnsupplierqs, this.routeEdit);
    this.apiService.apiGetRequest(addCashBank).subscribe(
      response => {
        const res = response.body;
        if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!this.commonService.checkNullOrUndefined(res.response)) {
            this.alertService.openSnackBar(res.response, Static.Close, SnackBar.success);
          }
        }
      });
  }

  reset() {
    this.tableData = [];
    this.formData.reset();
    //this.formData.controls['voucherNumber'].disable();
    this.sendDynTableData = { type: 'reset', data: this.tableData };
  }

}
