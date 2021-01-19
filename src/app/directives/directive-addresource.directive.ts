import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[addresourceHost]'
})
export class DirectiveAddresourceDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
