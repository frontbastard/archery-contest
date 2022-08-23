import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  constructor(private translocoService: TranslocoService) {
    super();

    this.translocoService
      .selectTranslation()
      .pipe(untilDestroyed(this))
      .subscribe((_event: Event) => {
        this.getAndInitTranslations();
      });
    this.getAndInitTranslations();
  }

  private getAndInitTranslations(): void {
    //TODO: виглядає дуже дивно, як ніби у індуса списав
    this.itemsPerPageLabel = this.translocoService.translate(
      'elements.paginator.itemsPerPage'
    );
    this.nextPageLabel = this.translocoService.translate(
      'elements.paginator.nextPage'
    );
    this.previousPageLabel = this.translocoService.translate(
      'elements.paginator.previousPage'
    );
    this.firstPageLabel = this.translocoService.translate(
      'elements.paginator.firstPage'
    );
    this.lastPageLabel = this.translocoService.translate(
      'elements.paginator.lastPage'
    );
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
