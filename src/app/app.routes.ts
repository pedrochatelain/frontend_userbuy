import { Routes } from '@angular/router';
import { HomeComponent } from './features/product/components/home/home.component';
import { LoginComponent } from './login/login.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { AuthGuard } from './auth/auth.guard';
import { WalletComponent } from './wallet/wallet.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default route redirects to login
    { path: 'login', component: LoginComponent },         // Login route  
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'purchases/:id_user', component: PurchasesComponent, canActivate: [AuthGuard] },
    { path: 'wallet/:id_user', component: WalletComponent, canActivate: [AuthGuard] },
];
