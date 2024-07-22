import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private router: Router) {}
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('/dashboard');
  }
  jobPostFields = {
    job_detail: [
      { label: 'Title', type: 'text', place_holder: 'Job title', key: 'title' },
      {
        label: 'Company name',
        type: 'text',
        place_holder: 'Company name',
        key: 'company_name',
      },
      {
        label: 'Description',
        type: 'text',
        place_holder: 'Job Description',
        key: 'description',
      },
      {
        label: 'Responsibility',
        type: 'text',
        place_holder: 'Responsibility',
        key: 'responsibility',
      },
      {
        label: 'Qualification',
        type: 'text',
        place_holder: 'Qualification',
        key: 'qualification',
      },
      {
        label: 'Employment Type',
        type: 'dropdown',
        place_holder: 'Employment Type',
        key: 'employment_type',
        options: [
          { label: 'Full-Time', value: 'Full-time' },
          { label: 'Part-Time', value: 'Part-time' },
          { label: 'Contract', value: 'Contract' },
        ],
      },
      {
        label: 'Salary',
        type: 'number',
        place_holder: 'Salary range',
        key: 'salary_range',
      },
      {
        label: 'Number of openings',
        type: 'number',
        place_holder: 'Number of openings',
        key: 'number_of_opening',
      },
      { label: 'Notes', type: 'text', place_holder: 'Notes', key: 'notes' },
      {
        label: 'Application Url',
        type: 'text',
        place_holder: 'Application Url',
        key: 'apply_url',
      },
      {
        label: 'Expiration date',
        type: 'date',
        place_holder: 'Expiration date',
        key: 'expiry_date',
      },
    ],
    contact_details: [
      {
        label: 'Primary contact',
        type: 'number',
        place_holder: 'Primary contact',
        key: 'primary_contact',
      },
      {
        label: 'Alternative contact',
        type: 'number',
        place_holder: 'Primary contact',
        key: 'alternative_contact',
      },
      { label: 'Email', type: 'email', place_holder: 'Email', key: 'email' },
      {
        label: 'addresss',
        type: 'text',
        place_holder: 'addresss',
        key: 'address',
      },
      { label: 'city', type: 'text', place_holder: 'city', key: 'city' },
      { label: 'state', type: 'text', place_holder: 'state', key: 'state' },
      {
        label: 'pincode',
        type: 'number',
        place_holder: 'pincode',
        key: 'pincode',
      },
      {
        label: 'Website',
        type: 'text',
        place_holder: 'Website',
        key: 'web_url',
      },
    ],
  };

  businessFields = {};
  categoryFields = {};
}
