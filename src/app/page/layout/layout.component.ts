import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SharedService } from '../../service/shared.service';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit, OnDestroy {
  title = 'mmj_market_admin';
  showNav = true;
  currentUrl = 'dashboard';
  private routerSubscription: Subscription | undefined;

  constructor(private router: Router, private shared: SharedService) {}

  ngOnInit() {
    this.routerSubscription = this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        // Extract the current route without the '/admin/' prefix
        this.currentUrl = event.urlAfterRedirects.split('/').pop() || '';
        console.log(this.currentUrl, 'currentUrl');

        // Redirect to dashboard if the URL is empty or just '/admin'
        if (this.currentUrl === '' || this.currentUrl === 'admin') {
          this.router.navigateByUrl('/admin/dashboard');
        }
      });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  menu = [
    {
      name: 'Dashboard',
      route: 'dashboard',
      icon: 'bi-boxes',
      status: true,
    },
    {
      name: 'job',
      route: 'job',
      icon: 'bi-person-bounding-box',
      status: true,
    },
    {
      name: 'Business',
      route: 'business',
      icon: 'bi-shop',
      status: false,
    },
    {
      name: 'Restaurent',
      route: 'restaurent',
      icon: 'bi-cup-hot-fill',
      status: false,
    },
    {
      name: 'Category',
      route: 'category',
      icon: 'bi-database-fill',
      status: true,
    },
    {
      name: 'Admin access',
      route: 'admin-access',
      icon: 'bi-database-fill',
      status: true,
    },
  ];
  navigateUser(route: string) {
    this.router.navigateByUrl('/admin/' + route);
  }
  logout() {
    this.shared.logout();
  }
}
