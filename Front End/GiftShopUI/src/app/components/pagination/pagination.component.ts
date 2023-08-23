import { Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { PaginatedResult } from 'src/app/models/paginated-response';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  changePage(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.pageChange.emit(newPage);
    }
  }
}






