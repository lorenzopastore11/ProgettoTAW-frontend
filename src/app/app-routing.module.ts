import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_utilities';
import { LoginComponent } from './login';
import { RegisterComponent } from './account';
import { DataComponent } from './data/data.component';

const cashierModule = () => import('./cashier/cashier.module').then(x => x.CashierModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const tableModule = () => import('./tables/tables.module').then(x => x.TableModule);
const dishModule  = () => import('./dishes/dishes.module').then(x => x.DishModule);
const waitersModule  = () => import('./waiter/waiters.module').then(x => x.WaitersModule);
const cooksModule = () => import('./cooks/cooks.module').then(x => x.CooksModule)
const bartendersModule = () => import('./bartenders/bartenders.module').then(x => x.BartendersModule);

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'check', component: RegisterComponent},
  { path: 'data', component: DataComponent },
  { path: 'cashier', loadChildren: cashierModule, canActivate: [AuthGuard] },
  { path: 'users',  loadChildren: usersModule, canActivate: [AuthGuard] },
  { path: 'tables', loadChildren: tableModule, canActivate: [AuthGuard] },
  { path: 'dishes', loadChildren: dishModule, canActivate: [AuthGuard] },
  { path: 'waiters', loadChildren: waitersModule, canActivate: [AuthGuard] },
  { path: 'cooks', loadChildren: cooksModule, canActivate: [AuthGuard] },
  { path: 'bartenders', loadChildren: bartendersModule, canActivate: [AuthGuard] },
  



  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
