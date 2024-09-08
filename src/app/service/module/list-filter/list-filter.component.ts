import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
@Component({
  selector: 'app-list-filter',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './list-filter.component.html',
  styleUrl: './list-filter.component.scss',
})
export class ListFilterComponent implements OnInit {
  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(500)).subscribe((searchText) => {
      this.logSearch(searchText);
    });
  }
  filterOption: any = [
    { label: 'Anytime', value: 'anytime' },
    { label: 'Past 24 hours', value: '24 hours' },
    { label: 'Past weeek', value: 'week' },
    { label: 'Past month', value: 'month' },
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];;
  @Output() search = new EventEmitter<any>();
  @Output() filter = new EventEmitter<any>();
  private searchSubject: Subject<string> = new Subject();


  onSearch(event: any) {
    const searchText = event.target.value;
    this.searchSubject.next(searchText);

  }
  logSearch(text: any) {
    this.search.emit(text);
    console.log(text);
  }
  onSelect(event: any) {
    this.filter.emit(event);
    console.log(event);
  }
}
