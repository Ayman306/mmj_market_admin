import { Component, OnInit, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TableComponent } from '../../../service/module/table/table.component';
import { ListFilterComponent } from '../../../service/module/list-filter/list-filter.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddServiceComponent } from '../../../service/module/add-service/add-service.component';
import { ApiService } from '../../../service/api.service';
import { PageEvent } from '@angular/material/paginator';
import { NgToastService } from 'ng-angular-popup';
import { NgClass } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    TableComponent,
    ListFilterComponent,
    MatDialogModule,
    NgClass,
    MatTooltipModule
  ],
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss',
})
export class JobComponent implements OnInit {
  constructor(private apiService: ApiService, private toaster: NgToastService) { }

  ngOnInit(): void {
    this.loadJobs();
  }

  totalJobs = 0;
  pageSize = 10;
  currentPage = 0;

  jobApprovalIsActive = false

  displayedColumns: string[] = [
    'Job Title',
    'Company',
    'Phone',
    'Created date',
    'Action',
  ];
  dataSource: any = [];
  dialog = inject(MatDialog);

  options = [
    { label: 'Anytime', value: 'anytime' },
    { label: 'Past 24 hours', value: '24 hours' },
    { label: 'Past weeek', value: 'week' },
    { label: 'Past month', value: 'month' },
  ];

  filterOption = {
    search: '',
    filter: ''
  }
  sortJobBy: string = '';
  onSelect(option: any) {
    this.sortJobBy = option.value;
    this.filterOption.filter = option.value;
    this.loadJobs(this.filterOption)
    console.log('Selected value:', this.sortJobBy);
  }

  onSearch(searchText: any) {
    this.totalJobs = 0;
    this.pageSize = 10;
    this.currentPage = 0;

    // Emit the search text to the subject
    console.log('Searched text:', searchText);
    this.filterOption.search = searchText;
    this.loadJobs(this.filterOption, false)
  }

  loadJobs(data?: any, showToaster: boolean = false) {
    const body = {
      page: this.currentPage + 1, // Adding 1 because backend might expect 1-based indexing
      itemsPerPage: this.pageSize,
      offset: this.currentPage * this.pageSize,
      platform: 'admin',
      ...data
    };
    this.apiService.getAllJobList(body).subscribe({
      next: (res) => {
        this.dataSource = res?.result?.map((job: any) => ({
          id: job?.jobid,
          title: job?.title,
          company: job?.company_name,
          phone: job?.primary_contact,
          created_date: this.formatDate(job?.updated_date),
          status: job?.status,
        }
        )
        );
        this.totalJobs = res.result[0]?.totalcount || 0;
        if (showToaster) {
          this.toaster.success('Latest job lists...', 'Job posts')
        }
      },
      error: (err) => {
        this.toaster.success(err, 'Error')
      }
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
        disableClose: true,
        data: {
          title: 'job',
          apiResponse: apiResponseData[0], // The object you received from the API
          readonly: data?.readonly || false
        },
      });
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          // Handle the result from the dialog
          console.log('Edited job:', result);
          result.id = apiResponseData[0].jobid;
          this.editJob(result);
        }
      });
    });
    console.log(data);
  }


  editStatus(item: any) {
    console.log(item);
    let data
    data = {
      id: item.id,
      status: item.status,
      updateType: 'status_update'
    };
    if (item.status) {
      data = {
        ...data,
        approval_date: new Date().toISOString().split('T')[0] // Format as YYYY-MM-DD
      };
    }
    this.editJob(data);
  }

  displayService(item: any) {
    this.editRecord(item);
  }

  openJobDialog() {
    const dialogRef = this.dialog.open(AddServiceComponent, {
      disableClose: true,
      data: {
        title: 'job',
      },
      panelClass: 'addservice-dialog-class',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Handle the result from the dialog
        console.log('New job added:', result);
        this.addJob(result);
      }
    });
  }

  addJob(data: any) {
    this.apiService.addJob(data).subscribe({
      next: (res) => {
        console.log('job added');
        this.toaster.success('Job added')
        this.loadJobs();
      },
      error: (err) => {
        this.toaster.danger('Internal Server Error' + err);
        console.log(err);
      }
    });
  }

  activeJobApproval(showToaster = false) {
    this.jobApprovalIsActive = !this.jobApprovalIsActive;
    if (this.jobApprovalIsActive) {
      this.resetValues()

      const body = {
        page: this.currentPage + 1, // Adding 1 because backend might expect 1-based indexing
        itemsPerPage: this.pageSize,
        offset: this.currentPage * this.pageSize,
        platform: 'admin',
      };
      this.apiService.getAllJobApprovalList(body).subscribe({
        next: (res) => {
          this.dataSource = res?.result?.map((job: any) => ({
            id: job?.jobid,
            title: job?.title,
            company: job?.company_name,
            phone: job?.primary_contact,
            created_date: this.formatDate(job?.created_date),
            status: job?.status,
          }
          )
          );
          this.totalJobs = res.result[0].totalcount;
          if (showToaster) {
            this.toaster.success('Switched to job approval lists...', 'Job approval lists')
          }
        },
        error: (err) => {
          this.toaster.success(err, 'Error')
        }
      });
    } else {
      this.loadJobs()
    }
  }


  editJob(data: any) {
    this.apiService.editJob(data).subscribe({
      next: (res: any) => {
        console.log('job edited');
        this.toaster.success('job status updated')
        if (this.jobApprovalIsActive) {
          this.activeJobApproval(true)
        } else {
          this.loadJobs();
        }
      },
      error: (err) => {
        this.toaster.danger('Error while editing job', err)
        console.log(err);
      }
    });
  }

  resetValues() {
    this.totalJobs = 0;
    this.pageSize = 10;
    this.currentPage = 0;
    this.dataSource = {}
    this.filterOption = {
      search: '',
      filter: ''
    }
    this.sortJobBy = '';

  }
}
