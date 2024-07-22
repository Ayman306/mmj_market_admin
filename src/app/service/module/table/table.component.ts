import { AfterViewInit, Component, Input } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';

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
  @Input() totalRecords: number | undefined;
  pagesize = 0;
  objectKeys = Object.keys;
}
