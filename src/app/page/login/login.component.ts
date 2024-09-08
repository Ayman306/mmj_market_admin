import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MyErrorStateMatcher } from '../../utils/error-state-mtatcher';
import { SharedService } from '../../service/shared.service';
import { ApiService } from '../../service/api.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  hide = true;
  loginForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  resetPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sharedService: SharedService,
    private apiService: ApiService,
    private toaster: NgToastService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.loginForm.value['platform'] = 'admin';
      if (this.resetPassword) {
        this.apiService.resetPassword(this.loginForm.value).subscribe({
          next: (res) => {
            console.log(res);
            this.resetValue();
            this.toaster.success('Reset password request successful, check mail ')
          },
          error: (err) => {
            this.toaster.danger('Error: ' + err.message)
            console.log(err);
          }
        });
      } else {
        this.apiService.loginUser(this.loginForm.value).subscribe({
          next: (res) => {
            console.log(res);
            if (res?.user?.role == 'admin') {
              this.sharedService.setLoginValues(
                'token',
                JSON.stringify(res?.token)
              );
              this.sharedService.setLoginValues(
                'user',
                JSON.stringify(res?.user)
              );
              this.toaster.success('MMJ dashboard is configured!', 'Welcome')
              this.router.navigateByUrl('/admin');
            }
          },
          error: (err) => {
            this.toaster.danger('Error: ' + err.message)
            console.log(err.message);
          }
        });
      }
      // this.sharedService.setLoginValues(this.loginForm.value);
      // Perform login logic here
    }
  }
  resetValue() {
    this.resetPassword = !this.resetPassword;

    // Reset form values without triggering validation
    this.loginForm.patchValue({
      email: '',
      password: '',
    });

    // Mark form controls as untouched and pristine
    // Object.keys(this.loginForm.controls).forEach((key) => {
    //   const control = this.loginForm.get(key);
    //   control?.markAsUntouched();
    //   control?.markAsPristine();
    // });

    // Update form status
    // this.loginForm.updateValueAndValidity();
  }
}
