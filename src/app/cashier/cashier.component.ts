import { Component, OnInit } from '@angular/core';

import { Order, Table, User } from '../_models';
import { AccountService, TableService } from '../_services';
import { OrderService } from '../_services/order.service';

@Component({ templateUrl: 'cashier.component.html' })
export class CashierComponent implements OnInit {
    user: User | null;
    tables: any | undefined;
    orders: any | undefined;
    orderId!: number;

    constructor(private accountService: AccountService, private tableService: TableService, private orderService: OrderService) {
        this.user = this.accountService.userValue;
    }

    ngOnInit(): void {
        this.tableService.getAll().pipe().subscribe((tables: any[] | undefined) => {
            this.tables = tables?.sort((x, y) => x.tableId - y.tableId)
        });
        this.orderService.get().subscribe(orders => this.orders = orders);
    }

}