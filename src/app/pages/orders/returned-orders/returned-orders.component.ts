import { Component } from '@angular/core';
import { NavBarComponent } from "../../common/nav-bar/nav-bar.component";
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-returned-orders',
  standalone: true,
  imports: [NavBarComponent, CommonModule],
  templateUrl: './returned-orders.component.html',
  styleUrl: './returned-orders.component.css'
})
export class ReturnedOrdersComponent {
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
