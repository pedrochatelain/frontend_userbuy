import { Routes } from '@angular/router';
import { HomeComponent } from './features/product/components/home/home.component';
import { LoginComponent } from './features/login/components/login/login.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { AuthGuard } from './auth/auth.guard';
import { WalletComponent } from './features/wallet/components/wallet/wallet.component';
import { SearchComponent } from './features/product/components/search/search.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default route redirects to login
    { path: 'login', component: LoginComponent },         // Login route  
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
    { path: 'purchases/:id_user', component: PurchasesComponent, canActivate: [AuthGuard] },
    { path: 'wallet/:id_user', component: WalletComponent, canActivate: [AuthGuard] },
];
