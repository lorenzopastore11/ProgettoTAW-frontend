import { NgModule } from "@angular/core";
import { WaitersRoutingModule } from "./waiters-routing.module";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { OrderComponent } from "./order.component";
import { ListOrderComponent } from "./list-order.component";
import { AddEditOrderComponent } from "./add-edit-order.component";


@NgModule ({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        WaitersRoutingModule,
    ],
    declarations: [
        ListOrderComponent,
        AddEditOrderComponent,
    ],
    providers: [
        OrderComponent
    ]
})
export class WaitersModule { }