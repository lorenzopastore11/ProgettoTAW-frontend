import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OrderComponent } from "./order.component";
import { ListOrderComponent } from "./list-order.component";
import { AddEditOrderComponent } from "./add-edit-order.component";


const routes: Routes = [
    { path: '', component:  OrderComponent},
    { path: 'orders/:tableId', component: ListOrderComponent},
    { path: 'orders/:tableId/:orderId', component: ListOrderComponent},
    { path: 'orders/:tableId/:orderId/add/:orderId', component:  AddEditOrderComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WaitersRoutingModule { }