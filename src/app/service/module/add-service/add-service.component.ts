import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { SharedService } from '../../shared.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { JsonPipe } from '@angular/common';
import { NumberRangePipe } from '../../../utils/pipes/number-range.pipe';

@Component({
  selector: 'app-add-service',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    JsonPipe,
    NumberRangePipe
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.scss',
})
export class AddServiceComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sharedService: SharedService,
    private fb: FormBuilder
  ) {}

  formType: any;
  form!: FormGroup;
  readonly = false

  ngOnInit(): void {
    console.log(this.data, 'data');
    if (this.data?.title) {
      this.formTypeInit(this.data.title);
      if (this.data.apiResponse) {
        this.patchFormValues(this.data.apiResponse);
      }
    }
    this.readonly = this.data?.readonly

  }

  patchFormValues(apiResponse: any) {
    Object.keys(apiResponse).forEach(key => {
      if (this.form.controls[key]) {
        this.form.controls[key].setValue(apiResponse[key]);
      }
    });
  }

  formTypeInit(type: string) {
    switch (type) {
      case 'job':
        this.formType = this.sharedService.jobPostFields;
        this.form = this.fb.group(this.createFields(this.formType));
        break;
      case 'business':
        this.formType = this.sharedService.businessFields;
        break;
      case 'category':
        this.formType = this.sharedService.categoryFields;
        break;
      case 'user':
        this.formType = this.sharedService.user;
        this.form = this.fb.group(this.createFields(this.formType));
        break;
      default:
        this.formType = [];
        break;
    }
  }

  createFields(fields: any): any {
    const group: { [key: string]: FormControl } = {};
    fields?.forEach((field: any) => {
      group[field.key] = new FormControl('');
    });
    return group;
  }

  onSubmit() {
    console.log(this.form.value);
    if (this.form.value?.expiry_date.length == 0) {
      const currentDate = new Date();
      const expiryDate = new Date(currentDate.setDate(currentDate.getDate() + 15));
      this.form.patchValue({
        expiry_date: expiryDate
      });
    }
    if (!this.data.apiResponse) {
      this.form.value['status'] = true
      this.form.value['approval_date'] = new Date().toISOString().split('T')[0] // Format as YYYY-MM-DD
    }
    this.dialogRef.close(this.form.value);
  }

  cancel(): void {
    this.form.reset();
    this.dialogRef.close();
  }
}
