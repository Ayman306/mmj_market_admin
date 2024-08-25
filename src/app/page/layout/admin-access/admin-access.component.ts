import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddServiceComponent } from '../../../service/module/add-service/add-service.component';
import { ApiService } from '../../../service/api.service';
import { ListFilterComponent } from '../../../service/module/list-filter/list-filter.component';
import { TableComponent } from '../../../service/module/table/table.component';

@Component({
  selector: 'app-admin-access',
  standalone: true,
  imports: [TableComponent, ListFilterComponent],
  templateUrl: './admin-access.component.html',
  styleUrl: './admin-access.component.scss',
})
export class AdminAccessComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.loadUser();
  }
  dialog = inject(MatDialog);

  currentRoute = 'Jobs';
  displayedColumns: string[] = ['Username', 'Name', 'Role', 'Email', 'Action'];
  dataSource: any;

  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  loadUser() {
    this.apiService.getUser().subscribe((res) => {
      this.dataSource = res;
      console.log(res);
    });
  }

  openJobDialog() {
    const dialogRef = this.dialog.open(AddServiceComponent, {
      data: {
        title: 'user',
      },
      panelClass: 'addservice-dialog-class',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log('New user added:', result);
        this.createUser(result?.user_field);
      }
    });
  }

  editRecord(data: any) {
    console.log(data);

    const dialogRef = this.dialog.open(AddServiceComponent, {
      data: {
        title: 'user',
        apiResponse: { user_field: data }, // The object you received from the API
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Handle the result from the dialog
        console.log('Edited job:', result);
        // Optionally, refresh the job list
        // if (result?.contact_detail?.primary_contact) {
        //   result.contact_detail.contact_available = true;
        // } else {
        //   result.contact_detail.contact_available = false;
        // }
        result.user_field.id = data.id;
        this.editUser(result.user_field);
      }
    });
  }

  editUser(data: any) {
    this.apiService.editUser(data).subscribe(
      (res) => {
        console.log('user update', res);
        this.loadUser();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editStatus(item: any) {
    console.log(item);
    if (item) {
      this.editUser(item);
    }
  }
  createUser(data: any) {
    this.apiService.addUser(data).subscribe(
      (res) => {
        console.log('job added', res);
        this.loadUser();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
