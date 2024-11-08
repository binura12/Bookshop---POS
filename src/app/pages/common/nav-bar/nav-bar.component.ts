import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AdminService } from '../../../admin.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isCollapsed = false;
  submenuStates: { [key: string]: boolean } = {
    profile: false,
    users: false,
    orders: false,
    reports: false
  };

  constructor(private router: Router, private adminService:AdminService) {}

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
    this.adminService.setEmail("");
    this.router.navigate(['/admin-login']);
  }
}
