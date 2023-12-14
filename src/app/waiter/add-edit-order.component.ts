import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { DishService } from '../_services/dish.service';
import { AlertService, TableService } from '../_services';
import { Dish, Table } from '../_models';
import { OrderService } from '../_services/order.service';
import { io } from 'socket.io-client';
import { environment } from 'src/environment/environment';

@Component({ templateUrl: 'add-edit-order.component.html' })
export class AddEditOrderComponent implements OnInit {
    form!: FormGroup;
    id?: string;
    sk!: any;
    orderId!: number;
    tableId?: number;
    title!: string;
    index!: string;
    dishes?: Dish[];
    orders!: any;
    table?: Table;
    loading = false;
    submitting = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private orderService: OrderService,
        private alertService: AlertService,
        private dishService: DishService,
        public tableService: TableService
    ) { }

    ngOnInit() {      
        this.orderId = this.route.snapshot.params['orderId'];
        this.index = this.route.snapshot.params['index'];

        this.dishService.getAll()
        .subscribe((dishes: any[] | undefined) => this.dishes = dishes);

        this.orderService.get(this.orderId).subscribe(orders => this.orders = orders);
        
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            state: ['INSERITO', Validators.required],
            category: ['']
        });

        this.title = 'Aggiungi ordinazione';
        if (this.index) {
            this.title = 'Modifica ordinazione';
            this.loading = true;
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {

        this.submitted = true;
        this.alertService.clear();
        if (this.form.invalid) {
            return;
        }

        if(this.index) {
            this.title = "Modifica ordinazione";
            this.loading = true;
        }

        this.submitting = true;
        /**
         * Here I'll update the order insering the form values
         */
        this.orderService.update(this.orderId, this.form.value)
            .pipe(first())
            .subscribe({
                next: (order) => {
                    this.alertService.success('Ordinazione aggiunta', true);
                    this.router.navigate(['../../'], {relativeTo: this.route} );
                },
                error: (error: any) => {
                    this.alertService.error(error);
                    this.submitting = false;
                }
            })
    }
}