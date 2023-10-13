import { Component, OnInit, ViewChild } from '@angular/core';
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
import { TableComponent } from 'src/app/reuse-components';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-receipt-of-goods',
  templateUrl: './receipt-of-goods.component.html',
  styleUrls: ['./receipt-of-goods.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class ReceiptOfGoodsComponent implements OnInit {

  formData: FormGroup;
  formData1: FormGroup;
  routeEdit = '';

  tableData = [];
  materialCodeList = [];
  perChaseOrderList = [];


  dynTableProps: any;
  sendDynTableData: any;
  grnDate: any;
  // header props
  porderList = [];
  companyList = [];
  plantList = [];
  branchList = [];
  profitCenterList = [];
  employeesList = [];
  movementList = [];
  stlocList = [];
  materialList = [];
  purchaseordernoList: any;
  podetailsList: any;
  bpaList: any;

  @ViewChild(TableComponent, { static: false }) tableComponent: TableComponent;


  constructor(
    private formBuilder: FormBuilder,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private datepipe: DatePipe,
    public commonService: CommonService,
    public route: ActivatedRoute,
    private router: Router) {
    if (!this.commonService.checkNullOrUndefined(this.route.snapshot.params.value)) {
      this.routeEdit = this.route.snapshot.params.value;
    }
  }

  ngOnInit(): void {
    this.formDataGroup();
    this.getpurchaseOrderTypeData();
  }
  approveOrReject(event) {
    if (event) {
      this.formData.patchValue({
        qualityCheck: "Accpt",
        reject: null
      });
    } else {
      this.formData.patchValue({
        qualityCheck: null,
        reject: "Reject"
      });
    }
  }

  formDataGroup() {
    this.formData = this.formBuilder.group({
      purchaseOrderNo: [null, Validators.required],
      company: [null, [Validators.required]],
      // plant: [null],
      // branch: [null],
      profitCenter: [null],
      supplierCode: [null],
      //supplierName: [null],
      supplierReferenceNo: [null],

      receivedBy: [null],
      receivedDate: [null],
      receiptDate: [null],
      // supplierGinno: [null],
      // movementType: [null],
      // grnno: [null],
      // grndate: [null],
      // qualityCheck: [null],
      // storageLocation: [null],
      customerName: [null],
      id: ['0'],
      // rrno: [null],
      vehicleNo: [null],
      addWho: [null],
      addDate: [null],
      editWho: [null],
      editDate: [null],
      totalAmount: [''],
      lotNo: [''],
    });


    this.formData1 = this.formBuilder.group({
      rejectQty: [''],
      receivedQty: ['', Validators.required],
      materialCode: [''],
      netWeight: [''],
      purchaseOrderNumber: [''],
      description: [''],
      qty: [''],
      type: [''],
      action: 'editDelete',
      index: 0
    });
  }


  resetForm() {
    this.formData1.reset();
    this.formData1.patchValue({
      index: 0,
      action: 'editDelete'
    });
  }

  saveForm() {
    if (this.formData1.invalid) {
      return;
    }
    let data: any = this.tableData;
    data = (data && data.length) ? data : [];
    let qtyT = 0
    data.forEach((t: any) => {
      if (t.materialCode == this.formData1.value.materialCode) {
        qtyT = qtyT + (+t.receivedQty + +t.rejectQty)
      }
    })
    const remainigQ = this.formData1.value.qty - qtyT;
    if (remainigQ < (+this.formData1.value.receivedQty + +this.formData1.value.rejectQty)) {
      this.alertService.openSnackBar("You can't recevie more Quantity", Static.Close, SnackBar.error);
      return;
    }
    this.tableData = null;
    this.tableComponent.defaultValues();
    if (this.formData1.value.index == 0) {
      this.formData1.patchValue({
        index: data ? (data.length + 1) : 1
      });
      data = [...data, this.formData1.value];
    } else {
      data = data.map((res: any) => res = res.index == this.formData1.value.index ? this.formData1.value : res);
    }
    setTimeout(() => {
      this.tableData = data;
    });
    this.resetForm();
  }

  editOrDeleteEvent(value) {
    if (value.action === 'Delete') {
      this.tableComponent.defaultValues();
      this.tableData = this.tableData.filter((res: any) => res.index != value.item.index);
    } else {
      this.formData1.patchValue(value.item);
    }
  }

  tablePropsFunc() {
    return {
      tableData: {
        checkAll:
        {
          value: false, type: 'checkbox'
        },

        materialCode: {
          value: null, type: 'text', width: 75, maxLength: 15, disabled: true,
          //value: null, type: 'dropdown', list: this.materialList, id: 'id', text: 'text', displayMul: true, width: 100
        },
        description: {
          value: null, type: 'text', width: 75, maxLength: 15, disabled: true,
        },
        poqty: {
          value: null, type: 'number', width: 75, maxLength: 15, disabled: true,
        },
        receivedQty: {
          value: null, type: 'number', width: 75, maxLength: 15, disabled: true, fieldEnable: true
        },
        plant: {
          value: null, type: 'text', width: 75, maxLength: 15, disabled: true,
          //value: null, type: 'dropdown', list: this.plantList, id: 'plantCode', text: 'plantname', displayMul: true, width: 100
        },
        storageLocation: {
          value: null, type: 'text', width: 75, maxLength: 15, disabled: true,
          //value: null, type: 'dropdown', list: this.stlocList, id: 'code', text: 'name', displayMul: true, width: 100
        },
        profitCenter: {
          value: null, type: 'text', width: 75, maxLength: 15, disabled: true,
          //value: null, type: 'dropdown', list: this.profitCenterList, id: 'code', text: 'description', displayMul: true, width: 100
        },
        project: {
          value: null, type: 'text', width: 75, maxLength: 15, disabled: true,
        },
        branch: {
          value: null, type: 'text', width: 75, maxLength: 15, disabled: true,
          //value: null, type: 'dropdown', list: this.branchList, id: 'id', text: 'text', displayMul: true, width: 100
        },
        movementType: {
          value: null, type: 'text', width: 75, maxLength: 15, disabled: true,
          // value: null, type: 'dropdown', list: this.movementList, id: 'code', text: 'description', displayMul: true, width: 100, 
        },
        lotNo: {
          value: null, type: 'number', width: 100, maxLength: 50, fieldEnable: true
        },
        lotDate: {
          value: null, type: 'datepicker', width: 100, fieldEnable: true
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

  grndatechange() {
    if (this.tableData.length) {
      this.tableData.map(resp => resp.lotDate.value === this.formData.get('grndate').value)
      // this.sendDynTableData = { type: 'add', data: this.tableData };
    }
  }

  ponoselect() {
    let data = [];
    this.perChaseOrderList = [];
    if (!this.commonService.checkNullOrUndefined(this.formData.get('purchaseOrderNo').value)) {
      data = this.podetailsList.filter(resp => resp.purchaseOrderNumber == this.formData.get('purchaseOrderNo').value);
    }
    if (data.length) {
      data.forEach((d: any, index: number) => {
        const obj = {
          materialCode: d.materialCode ? d.materialCode : '',
          netWeight: d.netWeight ? d.netWeight : '',
          purchaseOrderNumber: d.purchaseOrderNumber ? d.purchaseOrderNumber : '',
          rejectQty: d.rejectQty ? d.rejectQty : '',
          qty: d.qty ? d.qty : '',
          receivedQty: d.receivedQty ? d.receivedQty : '',
          description: d.description ? d.description : '',
          action: '',
          index: index + 1
        }
        this.perChaseOrderList.push(obj)
      })
      // this.tableData = this.perChaseOrderList;
      const unique = [...new Set(this.perChaseOrderList.map(item => item.materialCode))]
      
      this.materialCodeList = unique;
      this.formData1.patchValue({
        qty: '',
        netWeight: '',
      })
      this.tableData = null;
      const obj = this.purchaseordernoList.find(resp => resp.id == this.formData.get('purchaseOrderNo').value);
      this.formData.patchValue({
        customerName: obj.text
      })
    }
  }

  materialCodeChange() {
    const obj = this.perChaseOrderList.find((p: any) => p.materialCode == this.formData1.value.materialCode);
    this.formData1.patchValue({
      qty: obj.qty,
      netWeight: obj.netWeight,
    })
  }

  getpurchaseOrderTypeData() {
    const getpurchaseOrderTypeUrl = String.Join('/', this.apiConfigService.getpurchaseOrderTypeList);
    this.apiService.apiGetRequest(getpurchaseOrderTypeUrl)
      .subscribe(
        response => {
          const res = response;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.porderList = res.response['porderList'];
            }
          }
          this.getCompanyList();
        });
  }

  getCompanyList() {
    const companyUrl = String.Join('/', this.apiConfigService.getCompanyList);
    this.apiService.apiGetRequest(companyUrl)
      .subscribe(
        response => {
          const res = response;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.companyList = res.response['companiesList'];
            }
          }
          this.getpodetailsList();
        });
  }
  getpodetailsList() {
    const getpodetailsListUrl = String.Join('/', this.apiConfigService.getpodetailsList);
    this.apiService.apiGetRequest(getpodetailsListUrl)
      .subscribe(
        response => {
          const res = response;
          console.log(res);
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.podetailsList = res.response['podetailsList'];
            }
          }
          this.getpurchasenoList();
        });
  }
  getpurchasenoList() {
    const poUrl = String.Join('/', this.apiConfigService.getpurchasenoList);
    this.apiService.apiGetRequest(poUrl)
      .subscribe(
        response => {
          const res = response;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.purchaseordernoList = res.response['purchaseordernoList'];
            }
          }
          this.getProfitcenterData();
        });
  }
  // getsuppliercodeList() {
  //   const getsuppliercodeList = String.Join('/', this.apiConfigService.getBusienessPartnersAccList);
  //   this.apiService.apiGetRequest(getsuppliercodeList)
  //     .subscribe(
  //       response => {
  //         const res = response;
  //         console.log(res);
  //         if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
  //           if (!this.commonService.checkNullOrUndefined(res.response)) {
  //             this.bpaList = res.response['bpaList'];
  //             this.bpaList = res.response['bpaList'].filter(resp => resp.bpTypeName == 'Vendor')

  //           }
  //         }
  //         this.getplantList();
  //       });
  // }

  // getplantList() {
  //   const getplantList = String.Join('/', this.apiConfigService.getplantList);
  //   this.apiService.apiGetRequest(getplantList)
  //     .subscribe(
  //       response => {
  //         const res = response;
  //         if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
  //           if (!this.commonService.checkNullOrUndefined(res.response)) {
  //             this.plantList = res.response['plantList'];
  //           }
  //         }
  //         this.getBranchList();
  //       });
  // }

  // getBranchList() {
  //   const branchUrl = String.Join('/', this.apiConfigService.getBranchList);
  //   this.apiService.apiGetRequest(branchUrl)
  //     .subscribe(
  //       response => {
  //         const res = response;
  //         if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
  //           if (!this.commonService.checkNullOrUndefined(res.response)) {
  //             this.branchList = res.response['branchsList'];
  //           }
  //         }
  //         this.getProfitcenterData();
  //       });
  // }

  getProfitcenterData() {
    const getpcUrl = String.Join('/', this.apiConfigService.getProfitCenterList);
    this.apiService.apiGetRequest(getpcUrl)
      .subscribe(
        response => {
          const res = response;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.profitCenterList = res.response['profitCenterList'];
            }
          }
          this.getEmployeesList()
        });
  }

  getEmployeesList() {
    const getEmployeeList = String.Join('/', this.apiConfigService.getEmployeeList);
    this.apiService.apiGetRequest(getEmployeeList)
      .subscribe(
        response => {
          const res = response;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.employeesList = res.response['emplist'];
            }
          }
          this.getmaterialData();
        });
  }


  // getMomentTypeList() {
  //   const MomentTypeList = String.Join('/', this.apiConfigService.getmomenttypeList);
  //   this.apiService.apiGetRequest(MomentTypeList)
  //     .subscribe(
  //       response => {
  //         const res = response;
  //         if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
  //           if (!this.commonService.checkNullOrUndefined(res.response)) {
  //             this.movementList = res.response['movementList'];
  //           }
  //         }
  //         this.getstorageLocationData();
  //       });
  // }

  // getstorageLocationData() {
  //   const getstorageUrl = String.Join('/', this.apiConfigService.getStList);
  //   this.apiService.apiGetRequest(getstorageUrl)
  //     .subscribe(
  //       response => {
  //         const res = response;
  //         if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
  //           if (!this.commonService.checkNullOrUndefined(res.response)) {
  //             this.stlocList = res.response['stlocList'];
  //           }
  //         }
  //         this.getmaterialData();
  //       });
  // }

  getmaterialData() {
    const getmaterialUrl = String.Join('/', this.apiConfigService.getMaterialList);
    this.apiService.apiGetRequest(getmaterialUrl)
      .subscribe(
        response => {
          this.spinner.hide();
          const res = response;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.materialList = res.response['materialList'];
            }
          }
          // this.dynTableProps = this.tablePropsFunc();
          if (this.routeEdit != '') {
            this.getRecepitOfGoodsDetails(this.routeEdit);
          }
        });
  }

  getRecepitOfGoodsDetails(val) {
    const cashDetUrl = String.Join('/', this.apiConfigService.getgoodsreceiptDetail, val);
    this.apiService.apiGetRequest(cashDetUrl)
      .subscribe(
        response => {
          this.spinner.hide();
          const res = response;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.formData.patchValue(res.response['grmasters']);
              this.formData.patchValue({
                purchaseOrderNo: +res.response['grmasters'].purchaseOrderNo
              })
              this.perChaseOrderList = []
              res.response['grDetail'].forEach((d: any, index: number) => {
                const obj = {
                  materialCode: d.materialCode ? d.materialCode : '',
                  netWeight: d.netWeight ? d.netWeight : '',
                  purchaseOrderNumber: d.purchaseOrderNumber ? d.purchaseOrderNumber : '',
                  rejectQty: d.rejectQty ? d.rejectQty : '',
                  qty: d.qty ? d.qty : '',
                  receivedQty: d.receivedQty ? d.receivedQty : '',
                  description: d.description ? d.description : '',
                  type: 'edit',
                  action: 'editDelete',
                  index: index + 1
                }
                this.perChaseOrderList.push(obj)
              })
              this.tableData = this.perChaseOrderList;
              const arr = this.podetailsList.filter(resp => !this.perChaseOrderList.some((p: any) => p.materialCode == resp.materialCode));
              const unique = [...new Set(arr.map(item => item.materialCode))];
              this.materialCodeList = unique;
              this.formData.disable();
            }
          }
        });
  }
  getLotNumData(row) {

    const getlotnos = String.Join('/', this.apiConfigService.gettinglotNumbers, row.data[row.index].materialCode.value);
    this.apiService.apiGetRequest(getlotnos)
      .subscribe(
        response => {
          const res = response;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {

              row.data[row.index].lotNo.value = res.response['lotNum']
              //row.data[row.index].lotDate.value =JSON.stringify(this.grnDate);
              // this.sendDynTableData = { type: 'add', data: row.data };
              // this.tableData = row.data;
            }
          }
          //this.spinner.hide();
        });

  }

  emitColumnChanges(data) {
    this.tableData = data.data;
    if (data.column == 'checkAll') {
      if (data.data[data.index].checkAll.value) {
        this.getLotNumData(data);
      }

    }

  }



  back() {
    this.router.navigate(['dashboard/transaction/goodsreceipts'])
  }

  save() {
    // this.tableData = this.commonService.formatTableData(this.tableData, 0);
    if (this.tableData.length == 0 && this.formData.invalid) {
      return;
    }
    this.savegoodsreceipt();
  }

  savegoodsreceipt() {
    const arr = this.tableData.filter((d: any) => !d.type);
    const addgoodsreceipt = String.Join('/', this.apiConfigService.addgoodsreceipt);
    const formData = this.formData.value;
    formData.receivedDate = this.formData.get('receivedDate').value ? this.datepipe.transform(this.formData.get('receivedDate').value, 'MM-dd-yyyy') : '';
    const requestObj = { grHdr: formData, grDtl: arr };
    this.apiService.apiPostRequest(addgoodsreceipt, requestObj).subscribe(
      response => {
        const res = response;
        if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!this.commonService.checkNullOrUndefined(res.response)) {
            this.alertService.openSnackBar('Goods Receipt created Successfully..', Static.Close, SnackBar.success);
            this.router.navigateByUrl('dashboard/transaction/goodsreceipts');
          }
          this.reset();
          this.spinner.hide();
        }
      });
  }

  return() {
    const addCashBank = String.Join('/', this.apiConfigService.returngoodsreceipt, this.routeEdit);
    this.apiService.apiGetRequest(addCashBank).subscribe(
      response => {
        const res = response;
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
    // this.sendDynTableData = { type: 'reset', data: this.tableData };
  }

}
