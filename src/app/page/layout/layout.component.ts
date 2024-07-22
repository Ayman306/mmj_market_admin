import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  menu = [
    {
      name: 'Dashboard',
      route: 'main',
      icon: 'bi-boxes',
    },
    {
      name: 'job',
      route: 'job',
      icon: 'bi-person-bounding-box',
      subRoute: [
        {
          name: 'Add job',
          route: 'add-job',
        },
      ],
    },
    {
      name: 'Business',
      route: 'business',
      icon: 'bi-shop',
      subRoute: [
        {
          name: 'Add Business',
          route: 'add-business',
        },
      ],
    },
    {
      name: 'Restaurent',
      route: 'restaurent',
      icon: 'bi-cup-hot-fill',
      subRoute: [
        {
          name: 'Add restaurent',
          route: 'add-restaurent',
        },
      ],
    },
    {
      name: 'Category',
      route: 'category',
      icon: 'bi-database-fill',
      subRoute: [
        {
          name: 'Add Category',
          route: 'add-category',
        },
      ],
    },
  ];
  navigateUser(name: string) {
    console.log(name);
  }
}
