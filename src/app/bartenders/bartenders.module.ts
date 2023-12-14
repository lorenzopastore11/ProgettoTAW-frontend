import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { BartendersRoutingModule } from "./bartenders-routing.module";
import { BartendersListOrderComponent } from "./bartenders-list-order.component";



@NgModule ({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        BartendersRoutingModule
    ],
    declarations: [
        
    ],
    providers: [
        BartendersListOrderComponent
    ]
})
export class BartendersModule { }