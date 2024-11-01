import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  constructor(private apiService: ApiService) { }
  ngOnInit(): void {
    this.loadAllCategories()
  }
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
  totalJobs = 0;
  pageSize = 10;
  currentPage = 0;
  dataSource: any;


  loadAllCategories(data?: any) {
    const body = {
      page: this.currentPage + 1, // Adding 1 because backend might expect 1-based indexing
      itemsPerPage: this.pageSize,
      offset: this.currentPage * this.pageSize,
      platform: 'admin',
      ...data
    };
    this.apiService.getCategories(body).subscribe({
      next: (res) => {
        this.dataSource = res.result.map((category: any) => ({
          id: category?.id,
          title: category?.title,
          total: category?.total,
          active: category?.activeCount,
          inactive: category?.inactiveCount,
          logo: category?.media || '../../../../assets/mmj_logo.png'
        }))
      }
    })
  }
}
