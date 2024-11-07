import { Component, Input, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./pages/common/nav-bar/nav-bar.component";
import { AdminDashboardComponent } from "./pages/admin-dashboard/admin-dashboard.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, AdminDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bookshop-pos';
}
