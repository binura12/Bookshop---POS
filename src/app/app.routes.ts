import { Routes } from '@angular/router';
import { AdminLoginComponent } from './pages/login/admin-login/admin-login.component';
import { CashierLoginComponent } from './pages/login/cashier-login/cashier-login.component';
import { ForgotPasswordComponent } from './pages/login/forgot-password/forgot-password.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './pages/users/admin/admin.component';
import { CashierComponent } from './pages/users/cashier/cashier.component';

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
        component:ForgotPasswordComponent
    },
    {
        path:"admin-dashboard",
        component:AdminDashboardComponent
    },
    {
        path:"users/admin",
        component:AdminComponent
    },
    {
        path:"users/cashiers",
        component:CashierComponent
    }
];
