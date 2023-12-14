import { Injectable, booleanAttribute } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environment/environment';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;
    public role: User | undefined;

    constructor(private router: Router, private http: HttpClient) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    /**
     * Useful method to retrieve user information after login
     */
    public get userValue() {
        return this.userSubject.value;
    }

    /**
     * authenticates user and logges in it. After authentication, all user information are stored in localStorage
     * in order to keep them available when necessary
     * @param username 
     * @param password 
     * @returns 
     */
    login(username: string, password: string) {
        return this.http.post<User>(`${environment.apiUrl}/login`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    /**
     * remove user from local storage and set current user to null
     */
    logout() {
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }

    /**
     * insert a new user
     * @param user 
     * @returns an Observable of the response of the API rest
     */
    register(user: User) {
        return this.http.post(`${environment.apiUrl}/register`, user);
    }

    /**
     * Verify presence of at least one user logged in
     * @returns true if users are logged in the application
     */
    check() {
        return this.http.get<User[]>(`${environment.apiUrl}/users/check`); 
    }

    /**
     * 
     * @param term 
     * @returns 
     */
    getAllRole(term?: string) {
        return this.http.get<User[]>(`${environment.apiUrl}/usersall/${term}`);
    }

    /**
     * gets one user identified by id
     * @param id user identification
     * @param params query filter
     * @returns Observable of the response of the call
     */
    get(id?: string, params?:any) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}?query=${params}`);
    }

    /**
     * Update information about user
     * @param id the user identification
     * @param params the value to update
     * 
     */
    update(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue?.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    /**
     * Delete a single user identified by id
     * @param id 
     * @returns 
     */
    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue?.id) {
                    this.logout();
                }
                return x;
            }));
    }
}