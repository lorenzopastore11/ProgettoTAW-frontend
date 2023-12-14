import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListTableComponent } from './list-table.component';
import { AddEditTableComponent } from './add-edit-table.component';

const routes: Routes = [
    { path: '', component: ListTableComponent },
    { path: 'add', component: AddEditTableComponent },
    { path: 'edit/:id', component: AddEditTableComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TablesRoutingModule { }