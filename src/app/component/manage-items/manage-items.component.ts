import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Item, ItemCreate } from '../../model/models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-items',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './manage-items.component.html',
  styleUrl: './manage-items.component.css'
})
export class ManageItemsComponent {
  public item: Item = {
    itemId: 0,
    name: '',
    rentalPerDay:0,
    finePerDay:0,
    availability:''
  };

  public newItem: ItemCreate = {
    name: '',
    rentalPerDay:0,
    finePerDay:0,
    availability:''
  };


  constructor(
    private toastr:ToastrService
  ){}


  addCustomer(){
    fetch("http://localhost:8080/item", {
      method: 'POST',
      body: JSON.stringify(this.newItem),
      headers: { "Content-type": "application/json" }
    })
      .then(res => {
        if (!res.ok) {
          this.toastr.error('Error', 'Item not saved', {
            timeOut: 1000,
          });
        }
        return res.json();
      })
      .then(data => {
        if (data.status == 'Failed') {
          this.toastr.error('Error', data.errorMessage, {
            timeOut: 2000,
          });
        } else {
          this.toastr.success("Item added susscessfully!","Success");
          this.item = data.result;
        }
      })
      .catch(error => {
        this.toastr.warning('Error', 'Data Loading Failed', {
          timeOut: 4000,
        });
      });
  }

  updateCustomer(){
    fetch("http://localhost:8080/item", {
      method: 'PUT',
      body: JSON.stringify(this.item),
      headers: { "Content-type": "application/json" }
    })
      .then(res => {
        if (!res.ok) {
          this.toastr.error('Error', 'Error updating customer', {
            timeOut: 1000,
          });
        }
        return res.json();
      })
      .then(data => {
        if (data.status == 'Failed') {
          this.toastr.error('Error', data.errorMessage, {
            timeOut: 2000,
          });
        } else {
          this.toastr.success("Customer updated susscessfully!","Success");
        }
      })
      .catch(error => {
        this.toastr.warning('Error', 'Error updating customer', {
          timeOut: 4000,
        });
      });
  }

  searchCustomer(){
    fetch("http://localhost:8080/item/by-id?id="+this.item.itemId, {
      method: 'GET',
      headers: { "Content-type": "application/json" }
    })
      .then(res => {
        if (!res.ok) {
          this.toastr.error('Error', 'Error retrieving customer', {
            timeOut: 1000,
          });
        }
        return res.json();
      })
      .then(data => {
        if (data.status == 'Failed') {
          this.toastr.error('Error', data.errorMessage, {
            timeOut: 2000,
          });
        } else {
          this.item = data.result;
        }
      })
      .catch(error => {
        this.toastr.warning('Error', 'Error retrieving customer', {
          timeOut: 4000,
        });
      });
  }

  deleteCustomer(){
    fetch("http://localhost:8080/item?id="+this.item.itemId, {
      method: 'DELETE',
      headers: { "Content-type": "application/json" }
    })
      .then(res => {
        if (!res.ok) {
          this.toastr.error('Error', 'Error retrieving customer', {
            timeOut: 1000,
          });
        }
        return res.json();
      })
      .then(data => {
        if (data.status == 'Failed') {
          this.toastr.error('Error', data.errorMessage, {
            timeOut: 2000,
          });
        } else {
          this.toastr.success('Success', "Customer deleted successfully", {
            timeOut: 2000,
          });
        }
      })
      .catch(error => {
        this.toastr.warning('Error', 'Error retrieving customer', {
          timeOut: 4000,
        });
      });
  }

}
