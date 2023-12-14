import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { CooksRoutingModule } from "./cooks-routing.module";
import { CooksListOrderComponent } from "./cooks-list-order.component";


@NgModule ({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CooksRoutingModule
    ],
    declarations: [],
    providers: [
        CooksListOrderComponent
    ]
})
export class CooksModule { }