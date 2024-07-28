import { Component, OnInit, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TableComponent } from '../../../service/module/table/table.component';
import { ListFilterComponent } from '../../../service/module/list-filter/list-filter.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddServiceComponent } from '../../../service/module/add-service/add-service.component';
import { ApiService } from '../../../service/api.service';
import { PageEvent } from '@angular/material/paginator';

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
export class JobComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.loadJobs();
  }

  totalJobs = 0;
  pageSize = 10;
  currentPage = 0;

  currentRoute = 'Jobs';
  displayedColumns: string[] = [
    'Job Title',
    'Company',
    'Phone',
    'Expires on',
    'Action',
  ];
  dataSource: any;
  total = 20;
  dialog = inject(MatDialog);

  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  loadJobs() {
    const body = {
      page: this.currentPage + 1, // Adding 1 because backend might expect 1-based indexing
      itemsPerPage: this.pageSize,
      offset: this.currentPage * this.pageSize,
    };
    this.apiService.getAllJobList(body).subscribe((res) => {
      this.dataSource = res?.result?.map((job: any) => ({
        title: job?.jobpost.job_detail.title,
        company: job?.jobpost.job_detail.company_name,
        phone: job?.jobpost.contact_details.primary_contact,
        expiry_date: this.formatDate(job?.jobpost.job_detail.created_date),
        status: job?.jobpost.contact_details.contact_available,
      }));
      this.totalJobs = res.total;
    });
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // Format as DD/MM/YYYY
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadJobs();
  }

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
