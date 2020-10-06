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
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  modelFormData: FormGroup;
  formData: any;
    personList: any;
    costCenterList: any;
    wbsElementList: any;
    materialList: any;
    materialCodeList: any;
  resourceList = [{ id: 'Machine', text: 'Machine' },
    { id: 'Labour', text: 'Labour' }, { id: 'Persons', text: 'Persons' },
    { id: 'Material ', text: 'Material ' }]
  constructor(
    private addOrEditService: AddOrEditService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    private commonService: CommonService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formDataGroup();
    this.getEmployeeList();
  }

  getEmployeeList() {
    const getemployeeUrl = String.Join('/', this.apiConfigService.getEmployeeList);
    this.apiService.apiGetRequest(getemployeeUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.personList = res.response['emplist'];
            }
          }
          this.getWbselementList();
        });
  }
  getWbselementList() {
    const getwbselementUrl = String.Join('/', this.apiConfigService.getwbselement);
    this.apiService.apiGetRequest(getwbselementUrl)
      .subscribe(
        response => {
          const res = response.body;
          console.log(res);
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.wbsElementList = res.response['wbsList'];
            }
          }
          this.getmaterialList();
        });
  }
  getmaterialList() {
    const   getmaterialUrl = String.Join('/', this.apiConfigService.getMaterialList);
    this.apiService.apiGetRequest(getmaterialUrl)
      .subscribe(
        response => {
          const res = response.body;
          console.log(res);
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.materialCodeList = res.response['materialList'];
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

  formDataGroup() {
    this.modelFormData = this.formBuilder.group({
      wbselement: [null],
      taskNumber: [null],
      description: [null],
      immediatePrecedessors: [null],
      successorTask: [null],
      timeNeeded: [null],
      period: [null],
      earlyStart: [null],
      earlyFinish: [null],
      lateStart: [null],
      lateFinish: [null],
      forwardTotal: [null],
      backwardTotal: [null],
      person: [null],
      risk: [null],
      resource: [null],
      materialCode: [null],
      qty: [null],
      costCenter: [null],
      activity: [null],
      rate: [null],
    });

    this.formData = { ...this.addOrEditService.editData };
    if (!this.commonService.checkNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
    }
  }

  cancel() {

  }

  save() {
    if (this.modelFormData.invalid) {
      return;
    }
    this.formData.item = this.modelFormData.value;
    this.addOrEditService[this.formData.action](this.formData, (res) =>
    {
      this.router.navigate(['/dashboard/master/tasks']);
    });
    if (this.formData.action == 'Edit') {
      this.modelFormData.controls[''].disable();
    }

  }

}
