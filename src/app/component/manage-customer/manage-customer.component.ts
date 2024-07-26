import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer, CustomerCreate } from '../../model/models';

@Component({
  selector: 'app-manage-customer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './manage-customer.component.html',
  styleUrl: './manage-customer.component.css'
})
export class ManageCustomerComponent {
  public customer: Customer = {
    customerId: 0,
    name: '',
    city:'',
    contactNumber:''
  };

  public newCustomer: CustomerCreate = {
    name: '',
    city:'',
    contactNumber:''
  };


  constructor(
    private toastr:ToastrService
  ){}


  addCustomer(){
    fetch("http://localhost:8080/customer", {
      method: 'POST',
      body: JSON.stringify(this.newCustomer),
      headers: { "Content-type": "application/json" }
    })
      .then(res => {
        if (!res.ok) {
          this.toastr.error('Error', 'Customer not saved', {
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
          this.toastr.success("Customer added susscessfully!","Success");
          this.customer = data.result;
        }
      })
      .catch(error => {
        this.toastr.warning('Error', 'Data Loading Failed', {
          timeOut: 4000,
        });
      });
  }

  updateCustomer(){
    fetch("http://localhost:8080/customer", {
      method: 'PUT',
      body: JSON.stringify(this.customer),
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
    fetch("http://localhost:8080/customer/by-id?id="+this.customer.customerId, {
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
          this.customer = data.result;
        }
      })
      .catch(error => {
        this.toastr.warning('Error', 'Error retrieving customer', {
          timeOut: 4000,
        });
      });
  }

  deleteCustomer(){
    fetch("http://localhost:8080/customer?id="+this.customer.customerId, {
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
