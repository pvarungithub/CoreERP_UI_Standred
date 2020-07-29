import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { startWith, map, debounceTime, switchMap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { String } from 'typescript-string-operations';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  @Output() emitTypeAheadValue = new EventEmitter();
  @Input() label: string;
  @Input() value: string;
  @Input() id: string;
  @Input() placeholder: string;
  dataConfig: any;

  @Input()
  set configData(value) {
    // if (!this.appService.checkNullOrUndefined(value)) {
    //   this.dataConfig = value;
    // }
  }

  @Input()
  set clearTypeAhead(value) {
    if (value) {
      // this.typeAhead['searchInput']['nativeElement'].value = '';
      // this.skuArray();
    }
  }

  @Input()
  set editTypeAhead(value) {
    // if (!this.appService.checkNullOrUndefined(value)) {
    //   this.typeAhead['searchInput']['nativeElement'].value = value;
    // }
    // this.skuArray();
  }


  // Autocomplete setup
  objectControl = new FormControl();
  filteredObjectOptions$: Observable<any>;

  constructor(
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.filteredObjectOptions$ = this.objectControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(400),
        switchMap(val => {
          return this.filter(val || '');
        })
      );
  }

  // filter and return the values
  filter(value: string) {
    this.emitTypeAheadValue.emit(null);
    // this.appErrService.clearAlert();
    if (value.length >= 3) {
      // if (!this.appService.checkNullOrUndefined(value)) {
        const skuValue = value.trim().toUpperCase();
        this.spinner.show();
        const requestObj = { ClientData: '', UIData: this.dataConfig.uiData };
        const url = String.Join('/', this.dataConfig.url, encodeURIComponent(encodeURIComponent(skuValue)));
        // return this.apiservice.apiPostRequest(url, requestObj)
        //   .map((response) => {
            // const res = response.body;
            this.spinner.hide();
            // if (!this.appService.checkNullOrUndefined(res) && res.Status === StatusCodes.pass) {
            //   return res.Response;
            // } else if (!this.appService.checkNullOrUndefined(res) && res.Status === StatusCodes.fail) {
            //   // this.appErrService.setAlert(res.ErrorMessage.ErrorDetails, true);
            //   return [];
            // }
          // });
      // }
    } else {
      // this.skuArray();
      this.spinner.hide();
      return [];
    }
    // this.typeAhead.element.firstChild.classList.remove('required-red');
  }


  // Display function for object options
  displayFn(user?): string | undefined {
    return user ? user : undefined;
  }

}
