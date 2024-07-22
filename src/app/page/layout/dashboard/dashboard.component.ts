import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  counts = [
    {
      title: 'Total Users',
      count: 100,
      icon: 'bi-people',
    },
    {
      title: 'Total Jobs',
      count: 100,
      icon: 'bi-person-bounding-box',
    },
    {
      title: 'Total Business',
      count: 100,
      icon: 'bi-shop',
    },
    {
      title: 'Total Restaurents',
      count: 100,
      icon: 'bi-cup-hot',
    },
  ];

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'July',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [{ data: [65, 59, 80, 81, 56, 55, 100], label: 'Users' }],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = ['Restraunts', 'Business', 'Events'];
  public pieChartDatasets = [
    {
      data: [300, 500, 100],
    },
  ];
  public pieChartLegend = true;
  public pieChartPlugins = [];
}
