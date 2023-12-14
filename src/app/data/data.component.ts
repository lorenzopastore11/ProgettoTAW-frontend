import { Component, OnInit } from '@angular/core';
import { TableService } from '../_services';
import { OrderService } from '../_services/order.service';

import {registerLocaleData} from '@angular/common';
import localeIt from '@angular/common/locales/it';
registerLocaleData(localeIt);

@Component({ templateUrl: 'data.component.html' })
export class DataComponent implements OnInit {
    tables: any | undefined;
    orders: any | undefined;
    clientsnow = 0;
    clients = 0;
    dishesserved = 0;
    dishesservedsinceopening = 0;
    earnedmoney = 0;
    percentageclientscerseats = 0;

    constructor(private tableService: TableService, private orderService: OrderService) {}

    ngOnInit(): void {
        this.tableService.getAll().subscribe((tables: any) => {
            this.tables = tables;
        });

        this.orderService.get().subscribe(orders => this.orders = orders);
    }

    numberOfClientsNow() {
        this.clientsnow = this.orders.filter((x: { payed: boolean; }) => x.payed === false).reduce((accumulator: any, currentValue: any) => accumulator + currentValue.covers, 0);
        return this.clientsnow;
    }

    numberOfClients() {
        this.clients = this.orders.reduce((accumulator: any, currentValue: any) => accumulator + currentValue.covers, 0);
        return this.clients;
    }

    percentageClientsPerSeats() {
        this.percentageclientscerseats = (this.orders.filter((x: { payed: boolean }) => x.payed === false)
            .reduce((accumulator: any, currentValue: any) => accumulator + currentValue.covers, 0)) / (this.tables.reduce((accumulator: any, currentValue: any) => accumulator + currentValue.seats, 0)) * 100;
        return this.percentageclientscerseats;
    }

    numberOfDishesServed() {
        this.dishesserved = this.orders.filter((x: { payed: boolean; }) => x.payed === false).map((x: { dishes: any[]; }) => ({
            ...x,
            dishes: (x.dishes) ? x.dishes.filter(x => x.state === 'PRONTO' || x.state === "CONSEGNATO"): undefined
        })).reduce((accumulator: any, currentValue: any) => accumulator + 1, 0);
        return this.dishesserved;
    }

    numberOfDishesServedSinceOpening() {
        this.dishesservedsinceopening = this.orders.map((x: { dishes: any[]; }) => ({
            ...x,
            dishes: (x.dishes) ? x.dishes.filter(x => x.state === 'PRONTO' || x.state === "CONSEGNATO"): undefined
        })).reduce((accumulator: any, currentValue: any) => accumulator + 1, 0);
        return this.dishesservedsinceopening;
    }

    moneyearned() {
        this.earnedmoney = this.orders.reduce((accumulator: any, currentValue: any) => accumulator + currentValue.totalCost, 0);
        return this.earnedmoney;
    }
}