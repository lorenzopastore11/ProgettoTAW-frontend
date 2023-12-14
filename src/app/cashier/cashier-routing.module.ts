import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CashierComponent } from "./cashier.component";
import { CashierListOrderComponent } from "./cashier-list-order.component";


const routes: Routes = [
    { path: '', component:  CashierComponent},
    { path: 'orders/:tableId/:orderId', component:  CashierListOrderComponent},
    //{ path: 'view/:tableId', component:  CooksDishesComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CashierRoutingModule { }