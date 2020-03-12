import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDragColor]'
})
export class DragColorDirective {

  constructor(
    private el: ElementRef
  ) { }

  @HostListener('dragover') dragover() {
    this.el.nativeElement.style.border = "2px dashed #34f018"
   
  }

  @HostListener('drop') drop() {
    this.el.nativeElement.style.border = "1px solid black"
   
  }
  @HostListener('dragleave') dragleave() {
    this.el.nativeElement.style.border = "1px solid black"
   
  }

}
