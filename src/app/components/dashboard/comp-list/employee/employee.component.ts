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
      branchCode: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(4)]],
      branchName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      employeeId: [null],
      branchId: [null],
      designationId: [null],
      employeeName: [null],
      employeeCode: [null],
      dob: [null],
      maritalStatus: [null],
      gender: [null],
      qualification: [null],
      address: [null],
      phoneNumber: [null],
      mobileNumber: [null],
      email: [null],
      joiningDate: [null],
      terminationDate: [null],
      isActive: [null],
      narration: [null],
      bloodGroup: [null],
      passportNo: [null],
      passportExpiryDate: [null],
      labourCardNumber: [null],
      labourCardExpiryDate: [null],
      salaryType: [null],
      bankName: [null],
      bankbranchName: [null],
      bankAccountNumber: [null],
      bankbranchCode: [null],
      panNumber: [null],
      pfNumber: [null],
      esiNumber: [null],
      extraDate: [null],
      extra1: [null],
      extra2: [null],
      eefaultPackageId: [null],
      aadharNumber: [null],
      recomendedBy: [null],
      recomendedId: [null],
      reportedBy: [null],
      approvedBy: [null],

    });

    this.formData = { ...this.addOrEditService.editData };
    if (!this.commonService.checkNullOrUndefined(this.formData.item)) {
      this.modelFormData.patchValue(this.formData.item);
      this.modelFormData.controls['code'].disable();
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
    const addCashBank = String.Join('/', this.apiConfigService.registeraqsnList);
    this.apiService.apiPostRequest(addCashBank, this.formData.item).subscribe(
      response => {
        const res = response;
        if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
          if (!this.commonService.checkNullOrUndefined(res.response)) {
            this.alertService.openSnackBar('Employee created Successfully..', Static.Close, SnackBar.success);
          }
          this.spinner.hide();
        }
      });
  }

  cancel() {
    this.router.navigate(['dashboard/master/employee'])
  }

}

