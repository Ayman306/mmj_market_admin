import { Component } from '@angular/core';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  categoryList = [
    {
      image: '../../../../assets/mmj_logo.png',
      title: 'Restaurant',
      total: 10,
      active: 10,
      inactive: 10,
    },
    {
      image: '../../../../assets/mmj_logo.png',
      title: 'Restaurant',
      total: 10,
      active: 10,
      inactive: 10,
    },
    {
      image: '../../../../assets/mmj_logo.png',
      title: 'Restaurant',
      total: 10,
      active: 10,
      inactive: 10,
    },
    {
      image: '../../../../assets/mmj_logo.png',
      title: 'Restaurant',
      total: 10,
      active: 10,
      inactive: 10,
    },
    {
      image: '../../../../assets/mmj_logo.png',
      title: 'Restaurant',
      total: 10,
      active: 10,
      inactive: 10,
    },
    {
      image: '../../../../assets/mmj_logo.png',
      title: 'Restaurant',
      total: 10,
      active: 10,
      inactive: 10,
    },
  ];
}
