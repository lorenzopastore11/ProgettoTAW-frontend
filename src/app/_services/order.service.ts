import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environment/environment';
import { Order} from '../_models';

@Injectable({ providedIn: 'root' })
export class OrderService {
    order: any;

    constructor(private http: HttpClient) { }

    /**
     * 
     * @param order 
     * @returns an Observable of the result of the post http method
     */
    create(order: Order): Observable<Order> {
        return this.http.post<Order>(`${environment.apiUrl}/orders`, order);
    }

    /**
     * 
     * @param tableId 
     * @returns all the ordination associated to the param, included payed ordination
     */
    get(tableId?: number) {
        return this.http.get<Order[]>(`${environment.apiUrl}/orders/?orderId=${tableId}`);
    }

    /**
     * 
     * @param orderId the id ordination where the update needs to be executed
     * @param options the object with values of fields to updated
     * @param id the id of a single plates of the ordination
     * @returns generic update for ordinations; each update differs to other by options param
     */
    update(orderId: number, options: any, id?: string) {
        return this.http.put<Order>(`${environment.apiUrl}/orders/${orderId}?id=${id}`, options)
            .pipe(map(order => {
                // update stored order if the logged in order updated their own record
                localStorage.setItem('order', JSON.stringify(order));
                return order;
            }));
    }

    /**
     * 
     * @param orderId the id ordination where the update needs to be executed
     * @param options the id of a single plates of the ordination
     * @returns the deletion of an order or a particular dish
     */
    delete(orderId: number, options?: any) {
        return this.http.delete<Order>(`${environment.apiUrl}/orders?orderId=${orderId}&id=${options}`)
            .pipe(map(x => { return x; }));
    }
}