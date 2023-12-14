import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CooksListOrderComponent } from "./cooks-list-order.component";


const routes: Routes = [
    { path: '', component:  CooksListOrderComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CooksRoutingModule { }