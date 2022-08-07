import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslocoService } from '@ngneat/transloco';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  constructor(private translocoService: TranslocoService) {
    super();

    this.translocoService.selectTranslation().subscribe((_event: Event) => {
      this.getAndInitTranslations();
    });
    this.getAndInitTranslations();
  }

  private getAndInitTranslations(): void {
    this.itemsPerPageLabel = this.translocoService.translate(
      'elements.paginator.itemsPerPage'
    );
    this.nextPageLabel = this.translocoService.translate(
      'elements.paginator.nextPage'
    );
    this.previousPageLabel = this.translocoService.translate(
      'elements.paginator.previousPage'
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
