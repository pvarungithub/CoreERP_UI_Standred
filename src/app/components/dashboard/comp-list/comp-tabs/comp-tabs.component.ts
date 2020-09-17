import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit, ComponentRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CompListService } from '../comp-list.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../../services/common.service';
@Component({
  selector: 'app-comp-tabs',
  templateUrl: './comp-tabs.component.html',
  styleUrls: ['./comp-tabs.component.scss']
})
export class CompTabsComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild("dynamicTabs", { read: ViewContainerRef }) dynamicTabs: ViewContainerRef;

  params: any;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private activatedRoute: ActivatedRoute,
    private compListService: CompListService,
    private cdr: ChangeDetectorRef,
    private commonService: CommonService
  ) {
    activatedRoute.params.subscribe(params => {
      this.params = params.id;
      this.commonService.routeParam = params.id
      // this.getTableParameters(params.id);
      // if (!this.commonService.checkNullOrUndefined(this.tableComponent)) {
      //   this.tableComponent.defaultValues();
      // }
    });
  }

  ngOnInit() {

  }
  
  ngAfterViewInit() {
    //This pieces of code adds dynamic component ( Just trust me for now  )
    let resolver = this.componentFactoryResolver.resolveComponentFactory(this.compListService.getDynComponents(this.params));
    this.dynamicTabs.createComponent(resolver);
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
      this.cdr.detach();
      this.commonService.routeParam = null;
  }

}
