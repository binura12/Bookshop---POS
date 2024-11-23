import { Routes } from '@angular/router';
import { AdminLoginComponent } from './pages/login/admin-login/admin-login.component';
import { CashierLoginComponent } from './pages/login/cashier-login/cashier-login.component';
import { ForgotPasswordComponent } from './pages/login/forgot-password/forgot-password.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './pages/users/admin/admin.component';
import { CashierComponent } from './pages/users/cashier/cashier.component';
import { EmployeesComponent } from './pages/users/employees/employees.component';
import { EmailAuthGuard } from './email-auth.guard';
import { ItemsComponent } from './pages/items/items.component';
import { SupplierComponent } from './pages/supplier/supplier.component';
import { PlaceOrderComponent } from './pages/orders/place-order/place-order.component';
import { OrderHistoryComponent } from './pages/orders/order-history/order-history.component';
import { ReturnedOrdersComponent } from './pages/orders/returned-orders/returned-orders.component';
import { CashierDashboardComponent } from './pages/cashier-dashboard/cashier-dashboard.component';
import { CashierEmailAuthGuard } from './cashier-email-auth.guard';
import { CashierItemsComponent } from './pages/cashier-items/cashier-items.component';
import { CashierPlaceOrderComponent } from './pages/orders/cashier-place-order/cashier-place-order.component';
import { CashierOrderHistoryComponent } from './pages/orders/cashier-order-history/cashier-order-history.component';
import { CashierReturnedOrdersComponent } from './pages/orders/cashier-returned-orders/cashier-returned-orders.component';
import { CashierSupplierComponent } from './pages/cashier-supplier/cashier-supplier.component';
import { CashierForgotPasswordComponent } from './pages/login/cashier-forgot-password/cashier-forgot-password.component';

export const routes: Routes = [
    {
        path:"",
        redirectTo:"admin-login",
        pathMatch: "full"
    },
    {
        path:"admin-login",
        component:AdminLoginComponent
    },
    {
        path:"cashier-login",
        component:CashierLoginComponent
    },
    {
        path:"forgot-password",
        component:ForgotPasswordComponent,
    },
    {
        path:"cashier-forgot-password",
        component:CashierForgotPasswordComponent
    },
    {
        path:"admin-dashboard",
        component:AdminDashboardComponent,
        canActivate: [EmailAuthGuard]
    },
    {
        path:"cashier-dashboard",
        component:CashierDashboardComponent,
        canActivate: [CashierEmailAuthGuard]
    },
    {
        path:"users/admin",
        component:AdminComponent,
        canActivate: [EmailAuthGuard]
    },
    {
        path:"users/cashiers",
        component:CashierComponent,
        canActivate: [EmailAuthGuard]
    },
    {
        path:"users/employees",
        component:EmployeesComponent,
        canActivate: [EmailAuthGuard]
    },
    {
        path:"items-manage",
        component:ItemsComponent,
        canActivate: [EmailAuthGuard]
    },
    {
        path:"cashier/items-manage",
        component:CashierItemsComponent,
        canActivate: [CashierEmailAuthGuard]
    },
    {
        path:"supplier-management",
        component:SupplierComponent,
        canActivate: [EmailAuthGuard]
    },
    {
        path:"cashier/supplier-management",
        component:CashierSupplierComponent,
        canActivate: [CashierEmailAuthGuard]
    },
    {
        path:"orders/place",
        component:PlaceOrderComponent,
        canActivate: [EmailAuthGuard]
    },
    {
        path:"cashier/orders/place",
        component:CashierPlaceOrderComponent,
        canActivate: [CashierEmailAuthGuard]
    },
    {
        path:"orders/history",
        component:OrderHistoryComponent,
        canActivate: [EmailAuthGuard]
    },
    {
        path:"cashier/orders/history",
        component:CashierOrderHistoryComponent,
        canActivate: [CashierEmailAuthGuard]
    },
    {
        path:"orders/returns",
        component:ReturnedOrdersComponent,
        canActivate: [EmailAuthGuard]
    },
    {
        path:"cashier/orders/returns",
        component:CashierReturnedOrdersComponent,
        canActivate: [CashierEmailAuthGuard]
    }
];
