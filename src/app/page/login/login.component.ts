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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sharedService: SharedService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.sharedService.setLoginValues(this.loginForm.value);
      // Perform login logic here
      this.router.navigateByUrl('/admin');
    }
  }
}
