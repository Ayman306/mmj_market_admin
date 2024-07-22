import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private router: Router) {}

  loginForm = this.fb.group({
    mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
  });
  login() {
    this.router.navigateByUrl('/dashboard');
  }
  get m() {
    return this.loginForm.controls;
  }
}
