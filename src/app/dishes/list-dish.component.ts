import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { DishService } from '../_services/dish.service';
import { AccountService } from '../_services';


import {registerLocaleData} from '@angular/common';
import localeIt from '@angular/common/locales/it';
registerLocaleData(localeIt);

@Component({ templateUrl: 'list-dish.component.html' })
export class ListDishComponent implements OnInit {
    dishes?: any[];
    role?: string;

    constructor(private dishService: DishService, private accountService: AccountService) {}

    ngOnInit() {
        this.role = this.accountService.userValue?.role
        this.dishService.getAll()
            .subscribe((dishes: any[] | undefined) => this.dishes = dishes);
    }

    deleteDish(id: string) {
        const dish = this.dishes!.find(x => x.id === id);
        dish.isDeleting = true;
        this.dishService.delete(id)
            .pipe(first())
            .subscribe(() => this.dishes = this.dishes!.filter(x => x.id !== id));
    }
}
