import { Component, Inject, Optional, OnInit } from '@angular/core';
import { String } from 'typescript-string-operations';
import { ApiService } from '../../../../services/api.service';

import { AlertService } from '../../../../services/alert.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConfigService } from '../../../../services/api-config.service';
import { SnackBar, StatusCodes } from '../../../../enums/common/common';
import { CommonService } from 'src/app/services/common.service';
import { AddOrEditService } from '../add-or-edit.service';
import { Static } from 'src/app/enums/common/static';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {


  modelFormData: FormGroup;
  isSubmitted = false;
  formData: any;
  companyList: any;


  constructor(
    private apiService: ApiService,
    private apiConfigService: ApiConfigService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private router: Router,
    private addOrEditService: AddOrEditService) {

    this.modelFormData = this.formBuilder.group({
      branchId: [''],
      employeeId: [0],
      employeeCode: ['', Validators.required],
      branchCode: ['', Validators.required],
      designationId: [''],
      employeeName: [''],
      dob: [''],
      maritalStatus: [''],
      gender: [''],
      qualification: [''],
      address: [''],
      phoneNumber: [''],
      mobileNumber: [''],
      email: [''],
      joiningDate: [''],
      releavingDate: [''], //
      isActive: [''],
      narration: [''],
      bloodGroup: [''],
      passportNo: [''],
      accessCardNumber: [''], //
      bankName: [''],
      bankAccountNumber: [''],
      employeeType: [''], //
      iFSCCode: [''], //
      panNumber: [''],
      aadharNumber: [''],
      recomendedBy: [''],
      reportedBy: [''],
      approvedBy: [''],

      pfNumber: [''],
      esiNumber: [''],

    });

    this.formData = { ...this.addOrEditService.editData };
    if (!this.commonService.checkNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      this.modelFormData.controls['employeeCode'].disable();
      this.modelFormData.controls['employeeId'].disable();
    }

  }

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    this.spinner.show();
    const getCompanyUrl = String.Join('/', this.apiConfigService.getCompanysList);
    this.apiService.apiGetRequest(getCompanyUrl)
      .subscribe(
        response => {
          const res = response.body;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              console.log(res);
              this.companyList = res.response['companiesList'];
            }
          }
          this.spinner.hide();
        }, error => {

        });
  }




  showErrorAlert(caption: string, message: string) {
    // this.alertService.openSnackBar(caption, message);
  }

  get formControls() { return this.modelFormData.controls; }


  save() {
    if (this.modelFormData.invalid) {
      return;
    }
    this.formData.item = this.modelFormData.value;
    this.modelFormData.controls['employeeCode'].enable();
    this.modelFormData.controls['employeeId'].enable();
    if (this.modelFormData.value.employeeId) {
      this.update();
      return
    }
    const addCashBank = String.Join('/', this.apiConfigService.registerEmployee);
    this.apiService.apiPostRequest(addCashBank, this.modelFormData.value).subscribe(
      response => {
        const res = response;
        if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!this.commonService.checkNullOrUndefined(res.response)) {
            this.alertService.openSnackBar('Employee created Successfully..', Static.Close, SnackBar.success);
            this.router.navigate(['/dashboard/master/employee']);
          }
          this.spinner.hide();
        }
      });
  }

  update() {
    const addCashBank = String.Join('/', this.apiConfigService.updateEmployee);
    this.apiService.apiUpdateRequest(addCashBank, this.modelFormData.value).subscribe(
      response => {
        const res = response;
        if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!this.commonService.checkNullOrUndefined(res.response)) {
            this.alertService.openSnackBar('Employee created Successfully..', Static.Close, SnackBar.success);
            this.router.navigate(['/dashboard/master/employee']);
          }
          this.spinner.hide();
        }
      });
  }

  cancel() {
    this.router.navigate(['dashboard/master/employee'])
  }

}

