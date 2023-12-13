import { Component, Inject, Optional, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { String } from 'typescript-string-operations';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { TableComponent } from 'src/app/reuse-components';
import { CommonService } from 'src/app/services/common.service';
import { ApiConfigService } from 'src/app/services/api-config.service';
import { ApiService } from 'src/app/services/api.service';
import { AlertService } from 'src/app/services/alert.service';
import { SnackBar, StatusCodes } from 'src/app/enums/common/common';
import { Static } from 'src/app/enums/common/static';

@Component({
  selector: 'app-material-requisition-view',
  templateUrl: './material-requisition-view.component.html',
  styleUrls: ['./material-requisition-view.component.scss']
})
export class MaterialRequisitionViewComponent {


  @ViewChild(TableComponent, { static: false }) tableComponent: TableComponent;


  formData: FormGroup;

  tableData = [];

  constructor(public commonService: CommonService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private apiConfigService: ApiConfigService,
    private apiService: ApiService,
    public route: ActivatedRoute,
    public router: Router,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<MaterialRequisitionViewComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {


  }

  ngOnInit() {
    this.getCommitmentList();
  }

  getCommitmentList() {
    this.tableData = [];
    if (this.tableComponent) {
      this.tableComponent.defaultValues();
    }
    const url = String.Join('/', this.apiConfigService.getProductionStatus, this.data.saleOrderNumber, this.data.materialCode, this.data.productionTag);
    this.apiService.apiGetRequest(url)
      .subscribe(
        response => {
          this.spinner.hide();
          const res = response;
          if (!this.commonService.checkNullOrUndefined(res) && res.status === StatusCodes.pass) {
            if (!this.commonService.checkNullOrUndefined(res.response)) {
              this.tableData = res.response.tagsDetailStatus;
            }
          }
        });
  }


  back() {
    this.dialogRef.close();
  }

}
