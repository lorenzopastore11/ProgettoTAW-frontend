import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { OrderService } from "../_services/order.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertService } from "../_services/alert.service"
import {TableService } from "../_services/table.service";
import { FormControl, FormGroup } from "@angular/forms";
import { SocketService } from "../_services/socket.service";
import { Observable } from "rxjs/internal/Observable";
import { io } from "socket.io-client";
import { environment } from "src/environment/environment";

@Component({ templateUrl: 'cashier-list-order.component.html' })
export class CashierListOrderComponent implements OnInit, OnChanges {

    orders: any | undefined;
    tables: any | undefined;
    tableId: number | undefined;
    orderId!: number;
    form!: FormGroup;
    total = 0.00;
    sk!: any;
    socket!: Observable<any>;
    submitted = false;
    submitting = false;

    constructor(private orderService: OrderService, private tableService: TableService, private socketService: SocketService, private route: ActivatedRoute, private alertService: AlertService,
        private router: Router) {
        
    }


    ngOnInit(): void {
        this.tableId = this.route.snapshot.params['tableId']
        this.orderId = this.route.snapshot.params['orderId']
        console.log("tableid" + this.tableId + " orderid" + this.orderId)
        this.orderService.get(this.orderId).subscribe(order => this.orders = order);
        this.tableService.getAll(this.tableId).subscribe(table => this.tables = table);

    }

    ngOnChanges(changes: SimpleChanges): void {
        
    }

    check() {
        if(this.orders[0].dishes.length===0) return false;
        return this.orders[0].dishes.every((x: { state: string; }) => x.state === "CONSEGNATO");
    }

    bill() {
        this.total = 2*this.orders[0].covers + this.orders[0].dishes.reduce((accumulator: any, currentValue: any) => accumulator + currentValue.price, 0);   
        this.form = new FormGroup({
            totalcost: new FormControl(this.total),
            payed: new FormControl('true'),
        });
        return this.total;
    }

    OnSubmit() {

        this.submitted = true;
        this.alertService.clear();
        this.submitting = true;
        this.alertService.onAlert();

        this.orderService.update(this.orderId, this.form.value, "-2").subscribe(order => { //Aggiorno orders e libero il tavolo
            this.router.navigate(['../../../'], {relativeTo: this.route} );
            this.alertService.success("Ordine aggiornato e liberato il tavolo!");
            this.orders = order;
            this.tables.orderId = null;
        });
    }
}