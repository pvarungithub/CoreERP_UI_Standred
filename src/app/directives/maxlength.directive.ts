import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Directive({
  selector: '[appMaxlength]'
})
export class MaxlengthDirective {

  @Input() pattern: any;
  oldValue: any;

  constructor(private el: ElementRef) { }

  @HostListener('input') onInput(event) {
    const length = this.el.nativeElement.value ? this.el.nativeElement.value.length : 0;

    if (length > this.pattern) {
      this.el.nativeElement.value = this.el.nativeElement.value.substr(0, length - 1);
    }
  }

}
