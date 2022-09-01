import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { NgModelChangeDebouncedDirective } from '../directives/ng-model-change-debounced.directive';
import { MaterialModule } from '../material/material.module';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [NgModelChangeDebouncedDirective, DialogComponent],
  imports: [CommonModule, MaterialModule, TranslocoModule],
  exports: [NgModelChangeDebouncedDirective, MaterialModule, TranslocoModule],
})
export class SharedModule {}
