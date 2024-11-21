import { Component } from '@angular/core';
import { NavBarComponent } from "../../common/nav-bar/nav-bar.component";
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [NavBarComponent, FormsModule, CommonModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {
  activeOrders: any= [];
  orderItems: any[] = [];
  selectedOrderId: any;
  selectedCustomer: any;
  total: number = 0;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.loadOrders();
  }


  loadOrders() {
    this.http.get<any[]>("http://localhost:8080/orders/not-returned")
      .subscribe({
        next: (data) => {
          this.activeOrders = data;
        },
        error: (error) => {
          console.error('Error loading active items:', error);
        }
      });
  }

  viewOrder(orderId: string, customerName: string) {
    this.http.get<any[]>(`http://localhost:8080/orders/order-items/${orderId}`)
    .subscribe({
      next: (data) => {
        this.selectedOrderId = orderId;
        this.selectedCustomer = customerName;
        this.orderItems = data;
        this.calculateTotals();
      },
      error: (error) => {
        console.error('Error loading order items:', error);
      }
    });
  }

  calculateTotals(){
    this.total = this.orderItems.reduce((acc, item) => acc + item.total, 0);
  }

  returnOrder(orderId: string) {
    if (confirm('Are you sure you want to return this order?')) {
      this.http.put(`http://localhost:8080/orders/return/${orderId}`, {})
        .subscribe({
          next: () => {
            alert('Order returned successfully');
            this.loadOrders();
            this.orderItems = [];
            this.selectedOrderId = null;
            this.selectedCustomer = null;
            this.total = 0;
          },
          error: (error) => {
            console.error('Error returning order:', error);
            alert('Error returning order');
          }
        });
    }
  }
}
