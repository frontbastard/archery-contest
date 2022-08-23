import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { NgModel } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, distinctUntilChanged, skip } from 'rxjs/operators';

@UntilDestroy()
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngModelChangeDebounced]',
})
export class NgModelChangeDebouncedDirective {
  @Output()
  ngModelChangeDebounced = new EventEmitter<any>();
  @Input()
  ngModelChangeDebounceTime = 500; // optional, 500 default

  constructor(private ngModel: NgModel) {
    this.ngModel.control.valueChanges
      .pipe(
        skip(1), // skip initial value
        untilDestroyed(this),
        distinctUntilChanged(),
        debounceTime(this.ngModelChangeDebounceTime)
      )
      .subscribe(value => this.ngModelChangeDebounced.emit(value));
  }
}
