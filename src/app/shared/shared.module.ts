import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { MaterialModule } from '../material/material.module';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [DialogComponent],
  imports: [CommonModule, MaterialModule, TranslocoModule],
  exports: [MaterialModule, TranslocoModule],
})
export class SharedModule {}
