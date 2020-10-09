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
  selector: 'app-workcentercreation',
  templateUrl: './workcentercreation.component.html',
  styleUrls: ['./workcentercreation.component.scss']
})
export class WorkCenterCreationComponent implements OnInit {

  companyList = [];
  plantList = [];
  locList = [];
  empList = [];
  uomList = [];
  costCenterList = [];
  workCenterTypeList = [{ id: 'Machine', text: 'Machine' }, { id: 'Labour', text: 'Labour' }, { id: 'Set up', text: 'Set up' }, { id: 'Production line', text: 'Production line' }, { id: 'Maintenance', text: 'Maintenance' }]
  usageList = [{ id: 'Routing', text: 'Routing' }, { id: 'Maintenance task list', text: 'Maintenance task list' }, { id: 'Quality inspection', text: 'Quality inspection' }, { id: 'Standard net work', text: 'Standard net work' }]

  modelFormData: FormGroup;
  formData: any;

  dynTablePropsActivity: any;
  dynTablePropsCapacity = this.tablePropsCapacityFunc();

  activityTableData = [];
  capacityTableData = [];

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
    this.getCompanyList();
  }

  tablePropsActivityFunc() {
    return {
      tableData: {
        activity: {
          value: null, type: 'text', width: 150
        },
        description: {
          value: null, type: 'text', width: 150
        },
        uom: {
          value: null, type: 'dropdown', list: this.uomList, id: 'id', text: 'text',
          disabled: false, displayMul: true
        },
        costCenter: {
          value: null, type: 'dropdown', list: this.costCenterList, id: 'code', text: 'costCenterName',
          disabled: false, displayMul: true
        },
        formula: {
          value: null, type: 'text', width: 150
        },
        delete: {
          type: 'delete',
          newObject: true
        }
      },
      formControl: {
        activity: [null, [Validators.required]]
      }
    }
  }

  tablePropsCapacityFunc() {
    return {
      tableData: {
        resource: {
          value: null, type: 'text', width: 150
        },
        capacity: {
          value: null, type: 'text', width: 150
        },
        workingHours: {
          value: null, type: 'text', width: 150
        },
        breakTime: {
          value: null, type: 'text', width: 150
        },
        netHours: {
          value: null, type: 'text', width: 150
        },
        shifts: {
          value: null, type: 'text', width: 150
        },
        totalCapacity: {
          value: null, type: 'text', width: 150
        },
        weekDays: {
          value: null, type: 'text', width: 150
        },
        hoursPerWeek: {
          value: null, type: 'text', width: 150
        },
        delete: {
          type: 'delete',
          newObject: true
        }
      },
      formControl: {
        resource: [null, [Validators.required]]
      }
    }
  }

  emitTableActivityData(data) {
    this.activityTableData = data;
  }

  emitTableCapacityData(data) {
    this.capacityTableData = data;
  }

  formDataGroup() {
    this.modelFormData = this.formBuilder.group({
      company: [null, [Validators.required]],
      plant: [null, [Validators.required]],
      workcenterType: [null],
      name: [null],
      location: [null],
      person: [null],
      usage: [null],
      autoPostingOfGoods: [false],
      formula: [null],
      scheduling: [null],
      costDerivation: [null],
      capacityRequirement: [null],
      goodsReceiptPosting: [null],
      qualityInspection: [null],
      netHours: [null],
      moveTime: [null],
      waitTime: [null],
      queueTime: [null],
      setupTime: [null],
      runTime: [null],
      leadTime: [null],
      autopostingGoods: [null],
      workcenterCode: [null],
      capacityReqirement: [null],
      runTimeforEachUnit: [null],
    });

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
              this.modelFormData.patchValue({
                company: this.companyList.length ? this.companyList[0].id : null
              })
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
              this.modelFormData.patchValue({
                plant: this.plantList.length ? this.plantList[0].id : null
              })
            }
          }
          this.getlocationsList();
        });
  }

  getlocationsList() {
    const getlocationsList = String.Join('/', this.apiConfigService.getlocationsList);
    this.apiService.apiGetRequest(getlocationsList)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.locList = res.response['locationList'];
            }
          }
          this.getEmployeeList();
        });
  }

  getEmployeeList() {
    const getemployeeUrl = String.Join('/', this.apiConfigService.getEmployeeList);
    this.apiService.apiGetRequest(getemployeeUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.empList = res.response['emplist'];
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
          this.dynTablePropsActivity = this.tablePropsActivityFunc();
          this.spinner.hide();
        });
  }

  reset() {
    this.modelFormData.reset();
    this.activityTableData = [];
    this.capacityTableData = [];
    this.addOrEditService.sendDynTableData({ type: 'reset', data: [] });
  }

  save() {
    if (this.modelFormData.invalid) {
      return;
    }
    this.formData.item = this.modelFormData.value;
    this.addOrEditService[this.formData.action](this.formData, (res) => {
      this.router.navigate(['/dashboard/master/workcentercreation']);
    });
    if (this.formData.action == 'Edit') {
      this.modelFormData.controls[''].disable();
    }
  }

}
