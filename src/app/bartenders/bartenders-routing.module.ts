import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BartendersListOrderComponent } from "./bartenders-list-order.component";


const routes: Routes = [
    { path: '', component: BartendersListOrderComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BartendersRoutingModule { }