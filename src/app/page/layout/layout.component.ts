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
        this.currentUrl = event.urlAfterRedirects.replace(/^\/admin\//, '');
        console.log(this.currentUrl, 'currentUrl');
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
    {
      name: 'Admin access',
      route: 'admin-access',
      icon: 'bi-database-fill',
    },
  ];
  navigateUser(route: string) {
    this.router.navigateByUrl('/admin/' + route);
  }
  logout() {
    this.shared.logout();
  }
}
