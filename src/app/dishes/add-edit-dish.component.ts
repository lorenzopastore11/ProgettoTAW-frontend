import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { DishService } from '../_services/dish.service';
import { AlertService } from '../_services';

@Component({ templateUrl: 'add-edit-dish.component.html' })
export class AddEditDishComponent implements OnInit {
    form!: FormGroup;
    id?: string;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;
    public types = [
        { value: 'PRIMO' },
        { value: 'SECONDO'},
        { value: 'CONTORNO'},
        { value: 'DOLCE' },
        { value: 'BEVANDA' },
    ];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private dishService: DishService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        //new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(dish.price);
        // form with validation rules
        this.form = new FormGroup({
            name: new FormControl ('', [Validators.required]),
            price: new FormControl ('', [Validators.required, Validators.min(0)]),
            type: new FormControl ('', [Validators.required]),
            // password only required in add mode
            description: new FormControl ('')
        });

        this.title = 'Aggiungi piatto';
        if (this.id) {
            // edit mode
            this.title = 'Modifica piatto';
            this.loading = true;
            this.dishService.get(this.id)
                .pipe(first())
                .subscribe(x => {
                    this.form.patchValue(x);
                    this.loading = false;
                });
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.submitting = true;
        this.saveDish()
            .pipe(first())
            .subscribe({
                next: () => {
                    this.id ? this.alertService.success('Piatto aggiornato', true) 
                            : this.alertService.success('Piatto aggiunto', true);
                    this.router.navigateByUrl('/dishes');
                },
                error: (error: any) => {
                    this.alertService.error(error);
                    this.submitting = false;
                }
            })
    }

    private saveDish() {
        // create or update user based on id param
        return this.id
            ? this.dishService.update(this.id!, this.form.value)
            : this.dishService.create(this.form.value);
    }
}