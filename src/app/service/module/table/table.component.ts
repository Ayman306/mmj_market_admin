import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() displayedColumns: string[] | undefined;
  @Input() dataSource: any | undefined;
  @Input() total: number | undefined;
  @Input() pageSize: number | undefined;
  @Output() pageChange = new EventEmitter<PageEvent>();

  objectKeys = Object.keys;
  onPageChange(event: PageEvent) {
    this.pageChange.emit(event);
  }
}
