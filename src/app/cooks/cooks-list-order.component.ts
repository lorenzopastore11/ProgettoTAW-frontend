import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { OrderService } from "../_services/order.service";
import { TableService } from "../_services";
import { first, window } from "rxjs/operators";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Order } from "../_models/order";
import { SocketService } from "../_services/socket.service";


@Component({ templateUrl: 'cooks-list-order.component.html' })
export class CooksListOrderComponent implements OnInit {
    public orders?: any | undefined;
    public form!: FormGroup
    
    constructor(private orderService: OrderService, private tableService: TableService,
        private formBuilder: FormBuilder, private socketService: SocketService) {

    }

    ngOnInit() {
        this.getFood();

        this.socketService.pippo('connection').subscribe(() => this.getFood());

        this.form = this.formBuilder.group({
            state: ['']
        })
    }

    getFood() : any{
        return this.orderService.get().subscribe((orders) => this.orders = orders?.map(x => ({
            ...x,
            dateCreation: new Date(Date.now()), // Converti la stringa in un oggetto Date
            dishes: (x.dishes) ? x.dishes.filter(x => x.state !== 'INSERITO' && x.category !== "BEVANDA"): undefined
        }))
        .sort((x, y) => x.dateCreation.getTime() - y.dateCreation.getTime())
        .filter(x => x.payed === false));
    }

    switchstate(orderId: number, id: string) {
        console.log(orderId + " " + id)
        return this.orderService.update(orderId, this.form.value, id)
        .subscribe(order =>
            this.orders.find((x: { orderId: number; }) => x.orderId === orderId).dishes.find((x: { id: string; }) => x.id === id).state = (order.dishes) ? order.dishes.find(x => (x.id === id))?.state: undefined)
    }
}