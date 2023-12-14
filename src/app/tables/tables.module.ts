import { TablesRoutingModule } from './tables-routing.module';
import { ListTableComponent } from './list-table.component';
import { AddEditTableComponent } from './add-edit-table.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TablesRoutingModule
    ],
    declarations: [
        AddEditTableComponent
    ],
    providers: [
        ListTableComponent
    ]
})
export class TableModule { }