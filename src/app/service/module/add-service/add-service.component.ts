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
      if (this.data.apiResponse) {
        this.patchFormValues(this.data.apiResponse);
      }
    }
  }

  patchFormValues(apiResponse: any) {
    if (!this.form) return;

    this.customformGroupName.forEach((groupName) => {
      const groupData = apiResponse[groupName];
      if (groupData) {
        const formGroup = this.form.get(groupName) as FormGroup;
        if (formGroup) {
          Object.keys(groupData).forEach((key) => {
            if (formGroup.get(key)) {
              if (key.includes('id')) {
                // Set true for any key that includes 'id'
                formGroup.get(key)?.patchValue(true);
              } else if (
                key === 'media' &&
                typeof groupData[key] === 'string'
              ) {
                try {
                  const mediaObj = JSON.parse(groupData[key]);
                  if (Array.isArray(mediaObj) && mediaObj.length > 0) {
                    formGroup.get(key)?.patchValue(groupData[key]);
                  }
                } catch (e) {
                  console.error('Error parsing media JSON:', e);
                }
              } else {
                formGroup.get(key)?.patchValue(groupData[key]);
              }
            }
          });
        }
      }
    });
  }

  formTypeInit(type: string) {
    switch (type) {
      case 'job':
        this.formType = this.sharedService.jobPostFields;
        this.form = this.fb.group({
          job_detail: this.fb.group(
            this.createFields(this.formType.job_detail)
          ),
          contact_detail: this.fb.group(
            this.createFields(this.formType.contact_detail)
          ),
        });
        this.customformGroupName = ['job_detail', 'contact_detail'];
        break;
      case 'business':
        this.formType = this.sharedService.businessFields;
        break;
      case 'category':
        this.formType = this.sharedService.categoryFields;
        break;
      case 'user':
        this.formType = this.sharedService.user;
        this.form = this.fb.group({
          user_field: this.fb.group(
            this.createFields(this.formType.user_field)
          ),
        });
        this.customformGroupName = ['user_field'];
        break;
      default:
        this.formType = [];
        break;
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
    this.dialogRef.close(this.form.value);
  }
}
