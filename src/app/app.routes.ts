import { Routes } from '@angular/router';
import { ManageCustomerComponent } from './component/manage-customer/manage-customer.component';
import { ManageItemsComponent } from './component/manage-items/manage-items.component';
import { ManageRentalComponent } from './component/manage-rental/manage-rental.component';

export const routes: Routes = [
    {
        path : "items",
        component: ManageItemsComponent
    },
    {
        path : "customers",
        component: ManageCustomerComponent
    },
    {
        path : "",
        component: ManageRentalComponent
    }
];
