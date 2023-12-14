import { Component, OnInit } from "@angular/core";
import { OrderService } from "../_services/order.service";
import { TableService } from "../_services";
import { first } from "rxjs/operators";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Order } from "../_models/order";


@Component({ templateUrl: 'bartenders-list-order.component.html' })
export class BartendersListOrderComponent implements OnInit {
    public orders?: any | undefined;
    public form!: FormGroup

    constructor(private orderService: OrderService, private formBuilder: FormBuilder) {

    }

    ngOnInit(): void {

        this.orderService.get().subscribe((orders) => this.orders = orders?.map(x => ({
            ...x,
            dateCreation: new Date(Date.now()), // Converti la stringa in un oggetto Date
            dishes: (x.dishes) ? x.dishes.filter(x => x.state !== 'INSERITO' && x.category === "BEVANDA"): undefined
        }))
        .sort((x, y) => x.dateCreation.getTime() - y.dateCreation.getTime())
        .filter(x => x.payed === false));

        this.form = this.formBuilder.group({
            state: ['']
        })
    }

    switchstate(orderId: number, id: string) {
        console.log("qq"+ orderId + " "+ id);
        return this.orderService.update(orderId, this.form.value, id).subscribe(order => {
                this.orders.find((x: { orderId: number; }) => x.orderId === orderId).dishes.find((x: { id: string; }) => x.id === id).state = (order.dishes) ? order.dishes.find(x => (x.id === id))?.state: undefined;
        });
    }
}