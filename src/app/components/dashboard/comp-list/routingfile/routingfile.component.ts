import { Component, OnInit } from '@angular/core';
import { ApiConfigService } from '../../../../services/api-config.service';
import { String } from 'typescript-string-operations';
import { ApiService } from '../../../../services/api.service';
import { CommonService } from '../../../../services/common.service';
import { StatusCodes } from '../../../../enums/common/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddOrEditService } from '../add-or-edit.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-routingfile',
  templateUrl: './routingfile.component.html',
  styleUrls: ['./routingfile.component.scss']
})


export class RoutingFileComponent implements OnInit {

  modelFormData: FormGroup;
  formData: any;
  companyList = [];
    plantList: any;
    costunitList: any;
    matypeList: any;
    ordertypeList: any;
    costCenterList: any;
    uomList: any;

  constructor(
    private addOrEditService: AddOrEditService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    private commonService: CommonService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formDataGroup();
    this.getCompanyList();
  }

  

  formDataGroup() {
    this.modelFormData = this.formBuilder.group({
      company: [null, [Validators.required]],
      plant: null,
      costUnit: null,
      material: null,
      orderNumber: null,
      saleOrder: null,
      saleDocument: null,
      routingKey: null,
      description: null,
      creationDate: null,
      version: null,
      operation: null,
      subOperation: null,
      workCenter: null,
      baseQuantity: null,
      operationUnit: null,
      costCenter: null,
      activity: null,
      standardValue: null,
      uom: null,
      formula: null,
      qty: null,
      toolsEqupment: null,
      numbers:null
    })
    this.formData = { ...this.addOrEditService.editData };
    if (!this.commonService.checkNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
    }
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
          this.getplantsList();
        });
  }

  getplantsList() {
    const getplantsList = String.Join('/', this.apiConfigService.getPlantsList);
    this.apiService.apiGetRequest(getplantsList)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.plantList = res.response['plantsList'];
             
            }
          }
          this.getordernumberData();
        });
  }
  getordernumberData() {
    const getorderelementUrl = String.Join('/', this.apiConfigService.getordernolist);
    this.apiService.apiGetRequest(getorderelementUrl)
      .subscribe(
        response => {
          const res = response.body;
          console.log(res);
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.ordertypeList = res.response['ordertypeList'];
            }
          }
          this.getcostunitsData();
        });
  }

  getcostunitsData() {
    const getsecondelementUrl = String.Join('/', this.apiConfigService.getcostingunitsList);
    this.apiService.apiGetRequest(getsecondelementUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.costunitList = res.response['costunitList'];
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
              this.matypeList = res.response['materialList'];
            }
          }
          this.getUomTypeData();
        });
  }
  getUomTypeData() {
    const getuomTypeUrl = String.Join('/', this.apiConfigService.getuomList);
    this.apiService.apiGetRequest(getuomTypeUrl)
      .subscribe(
        response => {
          const res = response.body;
          console.log(res);
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.uomList = res.response['UomList'];
            }
          }
          this.getCostCenterData();
        });
  }

  getCostCenterData() {
    const getccUrl = String.Join('/', this.apiConfigService.GetCostCenterList);
    this.apiService.apiGetRequest(getccUrl)
      .subscribe(
        response => {
          const res = response.body;
          console.log(res);
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.costCenterList = res.response['costcenterList'];
            }
          }
          this.spinner.hide();
        });
  }

  cancel() {
  }

  save() {
    if (this.modelFormData.invalid) {
      return;
    }
    this.formData.item = this.modelFormData.value;
    this.addOrEditService[this.formData.action](this.formData, (res) => {
      this.router.navigate(['/dashboard/master/routingfile']);
    });
    if (this.formData.action == 'Edit') {
      this.modelFormData.controls[''].disable();
    }

  }
  
}
