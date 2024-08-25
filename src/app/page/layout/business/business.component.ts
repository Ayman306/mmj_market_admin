import { Component, OnInit } from '@angular/core';
import { ListFilterComponent } from '../../../service/module/list-filter/list-filter.component';
import { TableComponent } from '../../../service/module/table/table.component';
import { PageEvent } from '@angular/material/paginator';
import { ApiService } from '../../../service/api.service';

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
export class BusinessComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.loadJobs();
  }
  displayedColumns: string[] = ['Company', 'Category', 'Joined Date', 'Action'];
  dataSource = ELEMENT_DATA;
  total = 20;
  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  totalJobs = 0;
  pageSize = 10;
  currentPage = 0;

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
        phone: job?.jobpost.contact_detail.primary_contact,
        expiry_date: this.formatDate(job?.jobpost.job_detail.created_date),
        status: job?.jobpost.contact_detail.contact_available,
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
}
