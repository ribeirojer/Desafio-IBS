import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDateMask]',
  standalone: true
})

export class DateMaskDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInput(event: any) {
    const input = event.target;
    const value = input.value;

    if (value.length <= 2) {
      input.value = value.replace(/[^0-9]/g, '');
    } else if (value.length <= 4) {
      input.value = value.replace(/^(\d{2})(\d{0,2})/, '$1/$2');
    } else if (value.length <= 8) {
      input.value = value.replace(/^(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
    } else {
      input.value = value.substring(0, 10);
    }
  }

}
