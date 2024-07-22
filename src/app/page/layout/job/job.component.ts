import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TableComponent } from '../../../service/module/table/table.component';
import { ListFilterComponent } from '../../../service/module/list-filter/list-filter.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddServiceComponent } from '../../../service/module/add-service/add-service.component';

const ELEMENT_DATA = [
  {
    title: 'Software Engineer',
    company: 'Horizonttal',
    phone: '+91-9988223344',
    expiry_date: '07:11:2024',
    status: true,
  },
  {
    title: 'Software Engineer',
    company: 'Horizonttal',
    phone: '+91-9988223344',
    expiry_date: '07:11:2024',
    status: true,
  },
  {
    title: 'Software Engineer',
    company: 'Horizonttal',
    phone: '+91-9988223344',
    expiry_date: '07:11:2024',
    status: true,
  },
  {
    title: 'Software Engineer',
    company: 'Horizonttal',
    phone: '+91-9988223344',
    expiry_date: '07:11:2024',
    status: true,
  },
  {
    title: 'Software Engineer',
    company: 'Horizonttal',
    phone: '+91-9988223344',
    expiry_date: '07:11:2024',
    status: true,
  },
  {
    title: 'Software Engineer',
    company: 'Horizonttal',
    phone: '+91-9988223344',
    expiry_date: '07:11:2024',
    status: true,
  },
  {
    title: 'Software Engineer',
    company: 'Horizonttal',
    phone: '+91-9988223344',
    expiry_date: '07:11:2024',
    status: true,
  },
  {
    title: 'Software Engineer',
    company: 'Horizonttal',
    phone: '+91-9988223344',
    expiry_date: '07:11:2024',
    status: true,
  },
];
@Component({
  selector: 'app-job',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    TableComponent,
    ListFilterComponent,
    MatDialogModule,
  ],
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss',
})
export class JobComponent {
  currentRoute = 'Jobs';
  displayedColumns: string[] = [
    'Job Title',
    'Company',
    'Phone',
    'Expires on',
    'Action',
  ];
  dataSource = ELEMENT_DATA;
  total = 20;
  dialog = inject(MatDialog);

  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  addJobs() {
    const dialogRef = this.dialog.open(AddServiceComponent, {
      data: {
        title: 'job',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
