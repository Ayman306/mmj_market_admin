import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
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
export class ListFilterComponent {
  @Input() filterOption: any;
  search = '';
  searchData() {
    console.log(this.search);
  }
}
