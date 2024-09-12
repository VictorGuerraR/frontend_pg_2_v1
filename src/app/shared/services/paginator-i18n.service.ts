import { Injectable, inject } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root',
})
export class PaginatorI18nService {

  paginatorIntl = new MatPaginatorIntl();

  constructor() {
  }

  getPaginatorIntl() {

    this.paginatorIntl.getRangeLabel = this.getRangeLabel.bind(this);

    this.paginatorIntl.changes.next();

    return this.paginatorIntl;
  }

  private getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0 || pageSize === 0) {
    }
    length = Math.max(length, 0);

    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
      startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

    return ''
  }
}
