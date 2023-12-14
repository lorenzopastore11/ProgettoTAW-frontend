import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environment/environment';
import { Dish } from '../_models/dish';
import { formatNumber, getLocaleCurrencyCode } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class DishService {
    dish: any;

    constructor(private router: Router, private http: HttpClient) { }

    /**
     * 
     * @param dish the dish to insert
     * @returns an Observable of the result of the post http method
     */
    create(dish: Dish) {
        return this.http.post(`${environment.apiUrl}/dishes`, dish);
    }

    /**
     * 
     * @returns all dishes 
     */
    getAll() {
        return this.http.get<Dish[]>(`${environment.apiUrl}/dishes`);
    }

    /**
     * @requires the dish is not null or undefined
     * @param id 
     * @returns the dish identified by id
     */
    get(id: string) {
        return this.http.get<Dish>(`${environment.apiUrl}/dishes/${id}`);
    }

    /**
     * 
     * @param id 
     * @param params 
     * @returns dishes modified
     */
    update(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/dishes/${id}`, params);
    }

    /**
     * 
     * @param id 
     * @returns the deletion of a dish
     */
    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/dishes/${id}`)
            .pipe(map(x => { return x; }));
    }
}