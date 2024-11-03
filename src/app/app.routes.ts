import { Routes } from '@angular/router';
import { AdminLoginComponent } from './pages/login/admin-login/admin-login.component';
import { CashierLoginComponent } from './pages/login/cashier-login/cashier-login.component';
import { SignupComponent } from './pages/signup/signup.component';

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
        path:"Create Account",
        component:SignupComponent
    }
];
