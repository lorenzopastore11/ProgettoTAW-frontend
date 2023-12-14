import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListDishComponent } from './list-dish.component';
import { AddEditDishComponent } from './add-edit-dish.component';

const routes: Routes = [
    { path: '', component: ListDishComponent },
    { path: 'add', component: AddEditDishComponent },
    { path: 'edit/:id', component: AddEditDishComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DishesRoutingModule { }