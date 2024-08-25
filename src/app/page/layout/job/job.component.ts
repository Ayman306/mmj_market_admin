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
      platform: 'admin',
    };
    this.apiService.getAllJobList(body).subscribe((res) => {
      this.dataSource = res?.result?.map((job: any) => ({
        id: job?.jobpost.job_detail.id,
        title: job?.jobpost.job_detail.title,
        company: job?.jobpost.job_detail.company_name,
        phone: job?.jobpost.contact_detail.primary_contact,
        expiry_date: this.formatDate(job?.jobpost.job_detail.created_date),
        status: job?.jobpost.job_detail.status,
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

  editRecord(data: any) {
    this.apiService.getAllJobList(data).subscribe((apiResponseData) => {
      console.log(apiResponseData);
      const dialogRef = this.dialog.open(AddServiceComponent, {
        data: {
          title: 'job',
          apiResponse: apiResponseData[0].jobpost, // The object you received from the API
        },
      });
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          // Handle the result from the dialog
          console.log('Edited job:', result);
          // Optionally, refresh the job list
          if (result?.contact_detail?.primary_contact) {
            result.contact_detail.contact_available = true;
          } else {
            result.contact_detail.contact_available = false;
          }
          result.job_detail['id'] = apiResponseData[0].jobpost.job_detail.id;
          result.contact_detail['id'] =
            apiResponseData[0].jobpost.contact_detail.id;
          // this.editJob(result);
        }
      });
    });
    console.log(data);
  }
  editStatus(item: any) {
    console.log(item);
    let data = {
      job_detail: {
        id: item.id,
        status: item.status,
      },
    };
    if (data) {
      this.editJob(data);
    }
  }

  openJobDialog() {
    const dialogRef = this.dialog.open(AddServiceComponent, {
      data: {
        title: 'job',
      },
      panelClass: 'addservice-dialog-class',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Handle the result from the dialog
        console.log('New job added:', result);
        // Optionally, refresh the job list
        if (result?.contact_detail?.primary_contact) {
          result.contact_detail.contact_available = true;
        }
        this.addJob(result);
      }
    });
  }

  addJob(data: any) {
    this.apiService.addJob(data).subscribe(
      (res) => {
        console.log('job added');
        this.loadJobs();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  editJob(data: any) {
    this.apiService.editJob(data).subscribe(
      (res) => {
        console.log('job edited');
        this.loadJobs();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
