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

@Component({
  selector: 'app-purcahseorder',
  templateUrl: './purcahseorder.component.html',
  styleUrls: ['./purcahseorder.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class PurchaseOrderComponent implements OnInit {

  // form control
  formData: FormGroup;
  formData1: FormGroup;

  @ViewChild(TableComponent, { static: false }) tableComponent: TableComponent;

  // sendDynTableData: any;

  // header props
  companyList = [];
  plantList = [];
  deptList = [];
  branchList = [];
  costcenterList = [];
  profitCenterList = [];
  projectNameList = [];
  wbsList = [];
  termsofDeliveryList = [{ id: "FOR", text: "FOR" },
  { id: "FOB", text: "FOB" }, { id: "CIF", text: "CIF" }, { id: "FAS", text: "FAS" }];

  // details props
  tableData = [];
  dynTableProps: any;
  routeEdit = '';
  materialList: any;
  pcgroupList: any;
  functionaldeptList: any;
  porderList: any;
  fcList: any;
  citemList: any;
  locList: any;
  employeesList: any;
  qnoList: any;
  ptypeList: any;
  ptermsList: any;
  filesend: any;
  // user details
  loginUser: any;
  bpaList: any;
  imgShow: any;
  taxCodeList = [];

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
    this.loginUser = JSON.parse(localStorage.getItem('user'));
    if (!this.commonService.checkNullOrUndefined(this.route.snapshot.params.value)) {
      this.routeEdit = this.route.snapshot.params.value;
    }
  }

  ngOnInit() {
    this.formDataGroup();
    this.getCompanyList();
    this.getTaxRatesList  ();
    // this.getPurchaseGroupData();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }


  formDataGroup() {
    this.formData = this.formBuilder.group({

      company: [null, [Validators.required]],
      plant: [null],
      branch: [null],
      profitCenter: [null],
      purchaseOrderType: [null],
      quotationDate: [null],
      supplierCode: [null],
      gstno: [null],
      deliveryDate: [null],
      deliveryPeriod: [null],
      termsofDelivery: null,
      paymentTerms: [null],
      purchaseOrderDate: null,
      addWho: [null],
      addDate: [null],
      editWho: null,
      editDate: [null],
      filePath: [null],
      advance: [null],
      igst: [0],
      cgst: [0],
      sgst: [0],
      amount: [0],
      totalTax: [0],
      totalAmount: [0],
      saleOrderNo: [null, [Validators.required]],
    });
    this.formData.controls.gstno.disable();

    this.formData1 = this.formBuilder.group({
      materialCode: [''],
      taxCode: [''],
      qty: ['', Validators.required],
      rate: [''],
      discount: [''],
      cgst: 0,
      sgst: 0,
      igst: 0,
      amount: [''],
      total: [''],
      action: 'editDelete',
      index: 0
    });

  }


  getTaxRatesList() {
    const taxCodeUrl = String.Join('/', this.apiConfigService.getTaxRatesList);
    this.apiService.apiGetRequest(taxCodeUrl)
      .subscribe(
        response => {
          const res = response;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              const resp = res.response['TaxratesList'];
              const data = resp.length && resp.filter((t: any) => t.taxType == 'Output');
              this.taxCodeList = data;
            }
          }
        });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formData.patchValue({
        filePath: file
      });
    }
  }

  supplierCodeChange() {
    const obj = this.bpaList.find((b: any) => b.text == this.formData.value.supplierCode);
    this.formData.patchValue({
      gstno: obj.gstNo
    })
  }
  quotationNumberChange() {
    this.getSaleOrderDetail();
  }

  getSaleOrderDetail() {
    this.tableComponent.defaultValues();
    const qsDetUrl = String.Join('/', this.apiConfigService.getSaleOrderDetail, this.formData.value.saleOrderNo);
    this.apiService.apiGetRequest(qsDetUrl)
      .subscribe(
        response => {
          this.spinner.hide();
          const res = response;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.formData.patchValue(res.response['SaleOrderMasters']);
              res.response['SaleOrderDetails'].forEach((s: any, index: number) => { s.action = 'editDelete'; s.index = index + 1; })
              this.tableData = res.response['SaleOrderDetails'];
            }
          }
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
          this.getsuppliercodeList();
        });
  }
  // getPaymenttermsList() {
  //   const getpmList = String.Join('/', this.apiConfigService.getPaymentsTermsList);
  //   this.apiService.apiGetRequest(getpmList)
  //     .subscribe(
  //       response => {
  //         const res = response;
  //         if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
  //           if (!this.commonService.checkNullOrUndefined(res.response)) {
  //             this.ptermsList = res.response['ptermsList'];
  //           }
  //         }
  //         this.getsuppliercodeList();
  //       });
  // }
  getsuppliercodeList() {
    const getsuppliercodeList = String.Join('/', this.apiConfigService.getCustomerList);
    this.apiService.apiGetRequest(getsuppliercodeList)
      .subscribe(
        response => {
          const res = response;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              const resp = res.response['bpList'];
              const data = resp.length && resp.filter((t: any) => t.bptype == 'Vendor');
              this.bpaList = data;

            }
          }
          this.getSaleOrderList();
        });
  }
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
  //         this.getSaleOrderList();
  //       });
  // }
  getSaleOrderList() {
    const getSaleOrderUrl = String.Join('/', this.apiConfigService.getSaleOrderList);
    this.apiService.apiGetRequest(getSaleOrderUrl)
      .subscribe(
        response => {
          const res = response;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.qnoList = res.response['BPList'];
            }
          }
          this.getpurchaseordertypetData();
        });
  }
  getpurchaseordertypetData() {
    const getpurchaseordertypeUrl = String.Join('/', this.apiConfigService.getpurchaseOrderTypeList);
    this.apiService.apiGetRequest(getpurchaseordertypeUrl)
      .subscribe(
        response => {
          const res = response;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.porderList = res.response['porderList'];
            }
          }
          this.getProfitcenterData();
        });
  }
  // getFundCenterList() {
  //   const fcUrl = String.Join('/', this.apiConfigService.getfundcenterList);
  //   this.apiService.apiGetRequest(fcUrl)
  //     .subscribe(
  //       response => {
  //         const res = response;
  //         if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
  //           if (!this.commonService.checkNullOrUndefined(res.response)) {
  //             this.fcList = res.response['fcList'];
  //           }
  //         }
  //         this.getCommitmentList();
  //       });
  // }
  // getCommitmentList() {
  //   const cmntUrl = String.Join('/', this.apiConfigService.getCommitmentList);
  //   this.apiService.apiGetRequest(cmntUrl)
  //     .subscribe(
  //       response => {
  //         const res = response;
  //         if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
  //           if (!this.commonService.checkNullOrUndefined(res.response)) {
  //             this.citemList = res.response['citemList'];
  //           }
  //         }
  //         this.getlocationsList();
  //       });
  // }
  // getlocationsList() {
  //   const getlocationsList = String.Join('/', this.apiConfigService.getlocationsList);
  //   this.apiService.apiGetRequest(getlocationsList)
  //     .subscribe(
  //       response => {
  //         const res = response;
  //         if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
  //           if (!this.commonService.checkNullOrUndefined(res.response)) {
  //             this.locList = res.response['locationList'];
  //           }
  //         }
  //         this.getfunctionaldeptList();
  //       });
  // }
  // getfunctionaldeptList() {
  //   const taxCodeUrl = String.Join('/', this.apiConfigService.getfunctionaldeptList);
  //   this.apiService.apiGetRequest(taxCodeUrl)
  //     .subscribe(
  //       response => {
  //         const res = response;

  //         if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
  //           if (!this.commonService.checkNullOrUndefined(res.response)) {
  //             this.functionaldeptList = res.response['fdeptList'];
  //           }
  //         }
  //         this.getCostCenterData();
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
  //         this.getCostCenterData();
  //       });
  // }

  // getCostCenterData() {
  //   const getccUrl = String.Join('/', this.apiConfigService.getCostCentersList);
  //   this.apiService.apiGetRequest(getccUrl)
  //     .subscribe(
  //       response => {
  //         const res = response;
  //         if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
  //           if (!this.commonService.checkNullOrUndefined(res.response)) {
  //             this.costcenterList = res.response['costcenterList'];
  //           }
  //         }
  //         this.getProfitcenterData();
  //       });
  // }

  getProfitcenterData() {
    const getpcUrl = String.Join('/', this.apiConfigService.getProfitCentersList);
    this.apiService.apiGetRequest(getpcUrl)
      .subscribe(
        response => {
          const res = response;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.profitCenterList = res.response['profitCenterList'];
            }
          }

          this.getRolesList()
        });
  }
  getRolesList() {
    const getEmployeeList = String.Join('/', this.apiConfigService.getrolelist);
    this.apiService.apiGetRequest(getEmployeeList)
      .subscribe(
        response => {
          const res = response;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.employeesList = res.response['roleList'];
              this.employeesList = res.response['roleList'].filter(resp => resp.roleId == this.loginUser.role)
            }
          }
          this.getmaterialData();
        });
  }
  // getPurchaseGroupData() {
  //   const getpcUrl = String.Join('/', this.apiConfigService.getPurchaseGroupList);
  //   this.apiService.apiGetRequest(getpcUrl)
  //     .subscribe(
  //       response => {
  //         const res = response;
  //         if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
  //           if (!this.commonService.checkNullOrUndefined(res.response)) {
  //             this.pcgroupList = res.response['pcgroupList'];
  //           }
  //         }

  //         this.spinner.hide()
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
            this.getPurchaseorderDetails(this.routeEdit);
          }
          // this.getWbsList();
        });
  }

  // getWbsList() {
  //   const segUrl = String.Join('/', this.apiConfigService.getwbselement);
  //   this.apiService.apiGetRequest(segUrl)
  //     .subscribe(
  //       response => {
  //         this.spinner.hide();
  //         const res = response;
  //         if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
  //           if (!this.commonService.checkNullOrUndefined(res.response)) {
  //             this.wbsList = res.response['wbsList'];
  //           }
  //         }
  //         // this.dynTableProps = this.tablePropsFunc();
  //         if (this.routeEdit != '') {
  //           this.getPurchaseorderDetails(this.routeEdit);
  //         }
  //       });
  // }

  getPurchaseorderDetails(val) {
    const cashDetUrl = String.Join('/', this.apiConfigService.getpurchaseorderDetail, val);
    this.apiService.apiGetRequest(cashDetUrl)
      .subscribe(
        response => {
          this.spinner.hide();
          const res = response;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.formData.patchValue(res.response['pomasters']);
              // this.sendDynTableData = { type: 'edit', data: res.response['poDetail'] };
              this.formData.disable();
              this.tableData = res.response['poDetail'];

            }
          }
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
    debugger
    if (this.formData1.invalid) {
      return;
    }
    this.dataChange();

    let data: any = this.tableData;
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
      this.calculate();
    });
    this.resetForm();
  }

  editOrDeleteEvent(value) {
    if (value.action === 'Delete') {
      this.tableComponent.defaultValues();
      this.tableData = this.tableData.filter((res: any) => res.index != value.item.index);
      this.calculate();
    } else {
      this.formData1.patchValue(value.item);
    }
  }

  dataChange() {
    debugger
    const formObj = this.formData1.value;
    const obj = this.taxCodeList.find((tax: any) => tax.taxRateCode == formObj.taxCode);
    const igst = obj.igst ? ((+formObj.qty * +formObj.rate) * obj.igst) / 100 : 0;
    const cgst = obj.cgst ? ((+formObj.qty * +formObj.rate) * obj.cgst) / 100 : 0;
    const sgst = obj.sgst ? ((+formObj.qty * +formObj.rate) * obj.sgst) / 100 : 0;
    this.formData1.patchValue({
      amount: (+formObj.qty * +formObj.rate),
      total: (+formObj.qty * +formObj.rate) + (igst + sgst + cgst),
      igst: igst,
      cgst: cgst,
      sgst: sgst,
    })
  }

  calculate() {
    this.formData.patchValue({
      igst: 0,
      cgst: 0,
      sgst: 0,
      amount: 0,
      totalTax: 0,
      totalAmount: 0,
    })
    this.tableData && this.tableData.forEach((t: any) => {
      this.formData.patchValue({
        igst: this.formData.value.igst + t.igst,
        cgst: this.formData.value.cgst + t.cgst,
        sgst: this.formData.value.sgst + t.sgst,
        amount: this.formData.value.amount + (t.qty * t.rate),
        totalTax: this.formData.value.totalTax + (t.igst + t.cgst + t.sgst),
      })
    })
    this.formData.patchValue({
      totalAmount: this.formData.value.amount + this.formData.value.totalTax,
    })
  }
  // emitColumnChanges(data) {
  //   this.tableData = data.data;
  // }


  back() {
    this.router.navigate(['dashboard/transaction/purchaseorder'])
  }

  save() {
    if (this.tableData.length == 0 && this.formData.invalid) {
      return;
    }
    this.savepurcahseorder();
  }

  savepurcahseorder() {
    const addprorder = String.Join('/', this.apiConfigService.addpurchaseorder);
    this.formData.controls.gstno.enable();
    const requestObj = { poHdr: this.formData.value, poDtl: this.tableData };
    this.apiService.apiPostRequest(addprorder, requestObj).subscribe(
      response => {
        const res = response;
        this.tableData = [];
        // this.saveimage();
        if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!this.commonService.checkNullOrUndefined(res.response)) {
            this.alertService.openSnackBar('Purchase Order created Successfully..', Static.Close, SnackBar.success);
            this.router.navigate(['/dashboard/transaction/purchaseorder'])
          }
          // this.reset();
          this.spinner.hide();
        }
      });
  }
  downloadImg() {
    const url = String.Join('/', this.apiConfigService.getFile, this.formData.get('filePath').value);
    this.apiService.apiGetRequest(url)
      .subscribe(
        response => {
          const res = response;
          this.imgShow = res.response;
          this.commonService.downloadFile(res.response)
          this.spinner.hide();
        });
  }

  downloadDocFile(data) {
    const DocFileName = data.DocFile;
    var DocFile = DocFileName.slice(0, -5);
  }
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.filesend = file;
    this.formData.patchValue({
      filePath: file.name
    });
  }
  saveimage() {
    var formData: any = new FormData();
    formData.append("avatar", this.filesend);
    const getLoginUrl = String.Join('/', this.apiConfigService.saveimage);
    this.apiService.apiPostRequest(getLoginUrl, formData)
      .subscribe(
        response => {
          const res = response;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.alertService.openSnackBar('Image Saved Successfully..', Static.Close, SnackBar.success);
            }
          }
          this.spinner.hide();
        });
  }
  return() {
    const addpo = String.Join('/', this.apiConfigService.returnpurchaseorder, this.routeEdit);
    this.apiService.apiGetRequest(addpo).subscribe(
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
