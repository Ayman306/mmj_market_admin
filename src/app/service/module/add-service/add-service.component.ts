import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  customformGroupName: string[] = [];

  ngOnInit(): void {
    console.log(this.data, 'data');
    if (this.data?.title) {
      this.formTypeInit(this.data.title);
    }
  }

  formTypeInit(type: string) {
    switch (type) {
      case 'job':
        this.formType = this.sharedService.jobPostFields;
        this.form = this.fb.group({
          job_detail: this.fb.group(
            this.createFields(this.formType.job_detail)
          ),
          contact_details: this.fb.group(
            this.createFields(this.formType.contact_details)
          ),
        });
        this.customformGroupName = ['job_detail', 'contact_details'];
        break;
      case 'business':
        this.formType = this.sharedService.businessFields;
        break;
      case 'category':
        this.formType = this.sharedService.categoryFields;
        break;
      default:
        this.formType = [];
    }
  }

  createFields(fields: any): any {
    const group: { [key: string]: FormControl } = {};
    fields.forEach((field: any) => {
      group[field.key] = new FormControl('');
    });
    return group;
  }

  onSubmit() {
    console.log(this.form.value);
    this.sendValues();
  }

  cancel(): void {
    this.form.reset();
    this.dialogRef.close();
  }
  sendValues() {
    this.dialogRef.close({
      size: this.data.title,
    });
  }
}
