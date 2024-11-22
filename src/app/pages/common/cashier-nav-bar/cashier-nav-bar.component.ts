import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CashierService } from '../../../cashier.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cashier-nav-bar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './cashier-nav-bar.component.html',
  styleUrl: './cashier-nav-bar.component.css'
})
export class CashierNavBarComponent {
  isCollapsed = false;
  submenuStates: { [key: string]: boolean } = {
    profile: false,
    users: false,
    orders: false,
    reports: false
  };

  constructor(private router: Router, private cashierService:CashierService) {}

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) {
      Object.keys(this.submenuStates).forEach(key => {
        this.submenuStates[key] = false;
      });
    }
  }

  toggleSubmenu(menu: string): void {
    if (!this.isCollapsed) {
      Object.keys(this.submenuStates).forEach(key => {
        if (key !== menu) {
          this.submenuStates[key] = false;
        }
      });
      this.submenuStates[menu] = !this.submenuStates[menu];
    }
  }

  logout(): void {
    this.cashierService.setEmail('');
    this.router.navigate(['/cashier-login']);
  }
}
