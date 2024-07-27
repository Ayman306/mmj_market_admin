import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { LayoutComponent } from './page/layout/layout.component';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SharedService } from './service/shared.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'mmj_market_admin';
  showNav = true;
  currentUrl = '';
  constructor(private router: Router, private shared: SharedService) {}
  ngOnInit() {
    // this.router.events
    //   .pipe(filter((event) => event instanceof NavigationEnd))
    //   .subscribe((event: any) => {
    //     console.log(event.url);
    //     if (event.url == '/login' || event.url == '/') {
    //       this.showNav = false;
    //     } else {
    //       this.showNav = true;
    //     }
    //     this.currentUrl = event.url.replace(/^\/+/, '');
    //   });
  }
  menu = [
    {
      name: 'Dashboard',
      route: 'dashboard',
      icon: 'bi-boxes',
    },
    {
      name: 'job',
      route: 'job',
      icon: 'bi-person-bounding-box',
    },
    {
      name: 'Business',
      route: 'business',
      icon: 'bi-shop',
    },
    {
      name: 'Restaurent',
      route: 'restaurent',
      icon: 'bi-cup-hot-fill',
    },
    {
      name: 'Category',
      route: 'category',
      icon: 'bi-database-fill',
    },
  ];
  navigateUser(route: string) {
    this.router.navigateByUrl('/' + route);
  }
  logout() {
    this.shared.logout();
  }
}
