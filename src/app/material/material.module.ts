import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoModule } from '@ngneat/transloco';
import { SnackBarComponent } from './customization/snack-bar/snack-bar.component';
import { MatTableResponsiveDirective } from './mat-table-responsive/mat-table-responsive.directive';

const modules = [
  //TODO: вперше таке бачу, виглядає так що створює проблеми. Ти впевнений що всі ці модулі треба і експортити і імпортити? Газва змінної взагалі нічого не пояснює
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatButtonModule,
  MatInputModule,
  MatCheckboxModule,
  MatTableModule,
  MatSelectModule,
  MatPaginatorModule,
  MatSortModule,
  MatTooltipModule,
  MatCardModule,
  MatDividerModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatDialogModule,
  MatSnackBarModule,
  MatTabsModule,
  MatSlideToggleModule,
];

@NgModule({
  imports: [CommonModule, TranslocoModule, ...modules],
  exports: [...modules, MatTableResponsiveDirective],
  declarations: [MatTableResponsiveDirective, SnackBarComponent],
})
export class MaterialModule {}
