import { Routes } from '@angular/router';
import { HomeComponent } from './features/product/components/home/home.component';
import { LoginComponent } from './features/login/components/login/login.component';
import { PurchasesComponent } from './features/purchases/purchases.component';
import { AuthGuard } from './auth/auth.guard';
import { WalletComponent } from './features/wallet/components/wallet/wallet.component';
import { SearchComponent } from './features/product/components/search/search.component';
import { ProductDetailsComponent } from './features/product/components/product-details/product-details.component';
import { LoginWithAccountComponent } from './features/login/components/login-with-account/login-with-account.component';
import { CreateAccountComponent } from './features/login/components/create-account/create-account.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default route redirects to login
    { path: 'login', component: LoginComponent },         // Login route  
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
    { path: 'purchases/:id_user', component: PurchasesComponent, canActivate: [AuthGuard] },
    { path: 'wallet/:id_user', component: WalletComponent, canActivate: [AuthGuard] },
    { path: 'products/:id_product', component: ProductDetailsComponent, canActivate: [AuthGuard] },
    { path: 'search/:term', component: SearchComponent, canActivate: [AuthGuard] },
    { path: 'login-with-account', component: LoginWithAccountComponent },
    { path: 'create-account', component: CreateAccountComponent },
];
