import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  constructor(private _translocoService: TranslocoService) {
    super();

    this._translocoService
      .selectTranslation()
      .pipe(untilDestroyed(this))
      .subscribe((_event: Event) => {
        this.getAndInitTranslations();
      });
    this.getAndInitTranslations();
  }

  private getAndInitTranslations(): void {
    const translates =
      this._translocoService.translateObject('elements.paginator');

    Object.keys(translates).forEach(key => {
      this[key] = translates[key];
    });
    this.changes.next();
  }

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 / ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} / ${length}`;
  };
}
