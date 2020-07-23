import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Directive({
  selector: '[appNumberInput]',
})
export class NumberInputDirective {
  @Output() valueChange = new EventEmitter();
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this.el.nativeElement.value;
    const newValue = initalValue.replace(/[^0-9]*/g, '');
    this.el.nativeElement.value = newValue;
    this.valueChange.emit(newValue);
    if (initalValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
