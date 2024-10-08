import { JsonPipe, NgClass, NgStyle } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatPaginatorModule,
    JsonPipe,
    NgClass,
    NgStyle,
    MatSlideToggleModule,
    MatTooltipModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() displayedColumns: string[] | undefined;
  @Input() dataSource: any | undefined;
  @Input() total: number | undefined;
  @Input() pageSize: number = 10;
  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() editRecordData = new EventEmitter<any>();
  @Output() statusUpdate = new EventEmitter<any>();
  @Output() displayService = new EventEmitter<any>();

  objectKeys = Object.keys;
  onPageChange(event: PageEvent) {
    this.pageChange.emit(event);
  }

  editRecord(data: any) {
    this.editRecordData.emit(data);
  }

  serviceDetail(data: any) {
    const value = JSON.parse(JSON.stringify(data));
    value.readonly = true
    this.displayService.emit(value)
  }

  onStatusChange(item: any, event: MatSlideToggleChange) {
    item.status = event.checked;
    this.statusUpdate.emit(item);
    // Here you can also call a service method to update the status in the backend
    // this.yourService.updateItemStatus(item.id, item.status).subscribe(...)
  }
}
