import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { TableService } from '../_services/table.service';
import { AccountService } from '../_services';
import { FormGroup } from '@angular/forms';
import { OrderService } from '../_services/order.service';

@Component({ templateUrl: 'order.component.html' })
export class OrderComponent implements OnInit {
    form!: FormGroup;
    tables?: any;
    username: any;
    orders: any
    orderId!: number;
    submitting = false;

    constructor(private tableService: TableService, private accountService: AccountService, private orderService: OrderService) {}

    ngOnInit() {
        this.username = this.accountService.userValue?.username

        /**
         * For each table assigned to a certain waiter, it is possible to view details associated to each table
         */
        this.tableService.getAll(this.username)
            .pipe(first())
            .subscribe((tables: any[] | undefined) => this.tables = tables);

        /**
         * This get retrieves all the ordination
         */
        this.orderService.get().subscribe(orders => { console.log(orders)
            this.orders = orders});
    }

    /**
     * 
     * @param orderId 
     * @returns true if a certain property is satisfy for all the element in the dishes field
     */
    check(orderId: number) {
        if(this.orders.find((x: { orderId: number; }) => x.orderId === orderId).dishes.length===0) return true;
        else return this.orders.find((x: { orderId: number; }) => x.orderId === orderId).dishes.every((x: { state: string; }) => x.state === "INSERITO");
    }

    /**
     * 
     * @param orderId 
     * @returns a certain property of the orders table
     */
    checkpaymentrequest(orderId: number) {
        return this.orders.find((x: { orderId: number; }) => x.orderId === orderId).paymentRequest;
    }


    /**
     * @requires the element which is represented by orderId is not undefined or null
     * @param orderId 
     * @returns the order table modified
     */
    deleteOrder(orderId: number) {
        const table = this.tables!.find((x: { orderId: number; }) => x.orderId === orderId);
        table.isDeleting = true;
        this.orderService.delete(table.orderId)
            .subscribe((x) => {return x;});
        table.orderId = null;
    }
}