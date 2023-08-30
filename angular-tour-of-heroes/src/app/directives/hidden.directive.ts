import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appHidden]',
})
export class HiddenDirective {
  constructor(private readonly ref: ElementRef) {}

  @Input() public set appHidden(val: boolean) {
    if (val) {
      this.ref.nativeElement.style.display = 'none';
    } else {
      this.ref.nativeElement.style.display = 'block';
    }
  }
}
