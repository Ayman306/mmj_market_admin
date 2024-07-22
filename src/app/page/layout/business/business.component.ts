import { Component } from '@angular/core';
import { ListFilterComponent } from '../../../service/module/list-filter/list-filter.component';
import { TableComponent } from '../../../service/module/table/table.component';

const ELEMENT_DATA = [
  {
    title: 'MMJ',
    company: 'Horizonttal',
    phone: '+91-9988223344',
    status: true,
  },
];
@Component({
  selector: 'app-business',
  standalone: true,
  imports: [ListFilterComponent, TableComponent],
  templateUrl: './business.component.html',
  styleUrl: './business.component.scss',
})
export class BusinessComponent {
  displayedColumns: string[] = ['Company', 'Category', 'Joined Date', 'Action'];
  dataSource = ELEMENT_DATA;
  total = 20;
  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
}
