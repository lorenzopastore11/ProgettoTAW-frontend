import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { CashierRoutingModule } from "./cashier-routing.module";
import { CashierComponent } from "./cashier.component";
import { CashierListOrderComponent } from "./cashier-list-order.component";


@NgModule ({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CashierRoutingModule,
    ],
    declarations: [
        CashierListOrderComponent,
    ],
    providers: [
        CashierComponent,
    ]
})
export class CashierModule { }