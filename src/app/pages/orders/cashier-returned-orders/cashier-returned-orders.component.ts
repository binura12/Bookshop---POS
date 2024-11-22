import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CashierNavBarComponent } from '../../common/cashier-nav-bar/cashier-nav-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cashier-returned-orders',
  standalone: true,
  imports: [CashierNavBarComponent, CommonModule],
  templateUrl: './cashier-returned-orders.component.html',
  styleUrl: './cashier-returned-orders.component.css'
})
export class CashierReturnedOrdersComponent {
  returnedOrders: any= [];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.http.get<any[]>("http://localhost:8080/orders/returned")
      .subscribe({
        next: (data) => {
          this.returnedOrders = data;
          console.log(this.returnedOrders);
        }
      });
  }
}
