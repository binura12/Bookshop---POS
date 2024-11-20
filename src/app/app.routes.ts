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
        path:"admin-dashboard",
        component:AdminDashboardComponent,
        // canActivate: [EmailAuthGuard]
    },
    {
        path:"users/admin",
        component:AdminComponent,
        // canActivate: [EmailAuthGuard]
    },
    {
        path:"users/cashiers",
        component:CashierComponent,
        // canActivate: [EmailAuthGuard]
    },
    {
        path:"users/employees",
        component:EmployeesComponent,
        // canActivate: [EmailAuthGuard]
    },
    {
        path:"items-manage",
        component:ItemsComponent
    },
    {
        path:"supplier-management",
        component:SupplierComponent
    },
    {
        path:"orders/place",
        component:PlaceOrderComponent
    }
];
