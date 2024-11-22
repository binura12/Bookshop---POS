import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CashierNavBarComponent } from '../../common/cashier-nav-bar/cashier-nav-bar.component';

interface CartItem {
  itemId: any;
  itemName: string;
  price: number;
  qty: number;
  total: number;
}

@Component({
  selector: 'app-cashier-place-order',
  standalone: true,
  imports: [RouterLink, CashierNavBarComponent, FormsModule, CommonModule],
  templateUrl: './cashier-place-order.component.html',
  styleUrl: './cashier-place-order.component.css'
})
export class CashierPlaceOrderComponent {
  activeItems: any = [];
  ItemCategory: string = "";
  allItems: any = [];
  searchTerm: string = '';
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  grandTotal: number = 0;
  orderId: string = '';
  customerName: string = '';

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.loadItems();
    this.generateOrderId();
  }

  generateOrderId() {
    this.http.get('http://localhost:8080/orders/next-id', { responseType: 'text' })
      .subscribe({
        next: (response: string) => {
          this.orderId = response;
        }
      });
  }

  loadItems() {
    this.http.get<any[]>("http://localhost:8080/item/all-active-items")
      .subscribe({
        next: (data) => {
          this.allItems = data;
          this.activeItems = data;
        },
        error: (error) => {
          console.error('Error loading active items:', error);
        }
      });
  }

  filterByCategory(category: string) {
    this.ItemCategory = category;
    if (category === '') {
      this.activeItems = this.allItems;
    } else {
      this.activeItems = this.allItems.filter((item: any) =>
        item.category === category
      );
    }
  }

  searchItems() {
    const searchTermLower = this.searchTerm.toLowerCase().trim();

    if (!searchTermLower) {
      this.filterByCategory(this.ItemCategory);
      return;
    }
    let filteredItems = this.allItems;
    if (this.ItemCategory) {
      filteredItems = filteredItems.filter((item: any) => item.category === this.ItemCategory);
    }
    this.activeItems = filteredItems.filter((item: any) => item.itemName.toLowerCase().includes(searchTermLower));
  }

  addToCart(item: any) {
    const existingItem = this.cartItems.find(cartItem => cartItem.itemId === item.id);
    if (existingItem) {
      existingItem.qty += 1;
      existingItem.total = existingItem.qty * existingItem.price;
    } else {
      const newItem: CartItem = {
        itemId: item.id,
        itemName: item.itemName,
        price: item.price,
        qty: 1,
        total: item.price
      }
      this.cartItems.push(newItem);
    }
    item.qty -= 1;
    this.calculateTotals();
  }

  updateQuantity(item: CartItem) {
    if (item.qty < 1) {
      item.qty = 1;
    }
    item.total = item.price * item.qty;
    this.calculateTotals();
  }

  removeItem(index: any) {
    this.cartItems.splice(index, 1);
    this.calculateTotals();
  }

  calculateTotals() {
    this.subtotal = this.cartItems.reduce((sum, item) => sum + item.total, 0);
    this.grandTotal = this.subtotal;
  }

  validateOrder(): boolean {
    if (this.cartItems.length === 0) {
      alert('Cart is empty! Please add items to cart.');
      return false;
    }

    if (!this.customerName?.trim()) {
      alert('Please enter customer name.');
      return false;
    }

    for (const cartItem of this.cartItems) {
      const item = this.allItems.find((i: any) => i.id === cartItem.itemId);
      if (!item) {
        alert(`Item ${cartItem.itemName} not found in inventory!`);
        return false;
      }

      if (cartItem.qty > item.qty + 1) {
        alert(`Insufficient stock for ${cartItem.itemName}!`);
        return false;
      }
    }
    return true;
  }

  placeOrder() {
    if (!this.validateOrder()) {
      return;
    } else {
      const order = {
        orderId: this.orderId,
        cusName: this.customerName,
        orderItems: this.cartItems.map(item => ({
          itemId: item.itemId,
          itemName: item.itemName,
          itemPrice: item.price,
          quantity: item.qty,
          subTotal: item.total,
          total: item.total,
          isReturn: false
        })),
        isReturn: false
      };

      const stockUpdate = this.cartItems.map(item => ({
        itemId: item.itemId,
        quantity: item.qty
      }));

      this.http.post('http://localhost:8080/item/update-stock', stockUpdate).subscribe({
        next: () => {
          this.http.post('http://localhost:8080/orders/save', order).subscribe({
            next: (response) => {
              alert('Order placed successfully!');
              this.resetOrder();
              this.loadItems();
            },
            error: (error) => {
              alert('Error placing order!');
              console.error('Error:', error);
              // Rollback stock update on order save failure
              this.http.post('http://localhost:8080/item/rollback-stock', stockUpdate).subscribe();
            }
          });
        },
        error: (error) => {
          alert('Error updating stock!');
          console.error('Error:', error);
        }
      });
    }
  }

  resetOrder() {
    this.customerName = '';
    this.cartItems = [];
    this.subtotal = 0;
    this.grandTotal = 0;
    this.generateOrderId();
  }
}
