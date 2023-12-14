import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorInterceptor, JwtInterceptor} from './_utilities';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login';
import { RegisterComponent } from './account';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './_components';
import { ListComponent } from './users/list.component';
import { ListTableComponent } from './tables/list-table.component';
import { ListDishComponent } from './dishes/list-dish.component';
import { OrderComponent } from './waiter/order.component';
import { CooksListOrderComponent } from './cooks/cooks-list-order.component';
import { BartendersListOrderComponent } from './bartenders/bartenders-list-order.component';
import { CashierComponent } from './cashier';
import { DataComponent } from './data/data.component';

@NgModule({
  declarations: [
    AppComponent,
    CashierComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    ListComponent,
    ListTableComponent,
    ListDishComponent,
    OrderComponent,
    CooksListOrderComponent,
    BartendersListOrderComponent,
    DataComponent,
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
