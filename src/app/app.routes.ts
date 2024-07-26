import { Routes } from '@angular/router';
import { ManageCustomerComponent } from './component/manage-customer/manage-customer.component';
import { ManageItemsComponent } from './component/manage-items/manage-items.component';

export const routes: Routes = [
    {
        path : "items",
        component: ManageItemsComponent
    },
    {
        path : "",
        component: ManageCustomerComponent
    }
];
