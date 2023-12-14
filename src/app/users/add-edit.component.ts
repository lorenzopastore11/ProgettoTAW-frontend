import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '../_services';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form!: FormGroup;
    id?: string;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;
    public roles = [
        { value: 'CAMERIERE'},
        { value: 'CUOCO' },
        { value: 'BARISTA' },
    ];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        public accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];

        // form with validation rules
        this.form = this.formBuilder.group({
            firstName: [''.trim(), Validators.required],
            lastName: [''.trim(), Validators.required],
            username: [''.trim(), Validators.required],
            // password only required in add mode
            password: ['', [Validators.minLength(6), ...(!this.id) ? [Validators.required]: []]],
            role: ['', Validators.required]
        }); 
        this.title = 'Aggiungi utente';
        if (this.id) {
            // edit mode
            this.title = 'Modifica utente';
            this.loading = true;
            this.accountService.get(this.id)
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
        this.saveUser()
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('User saved', true);
                    this.router.navigateByUrl('/users');
                },
                error: (error: any) => {
                    this.alertService.error(error);
                    this.submitting = false;
                }
            })
    }

    private saveUser() {
        // create or update user based on id param
        return this.id
            ? this.accountService.update(this.id!, this.form.value)
            : this.accountService.register(this.form.value);
    }
}