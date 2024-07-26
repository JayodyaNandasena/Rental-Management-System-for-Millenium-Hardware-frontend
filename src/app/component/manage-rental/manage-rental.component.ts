import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../../model/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-rental',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-rental.component.html',
  styleUrl: './manage-rental.component.css'
})
export class ManageRentalComponent implements OnInit{

  public mobileList = null;
  public itemIdList = null;

  public itemList = Array<CartItem>;

  public cartItem:CartItem = {
    itemId:0,
    quantity:0,
    totalItemCost:0
  }

  public newRental = {
    customerMobile: "",
    rentalDate:"",
    dueDate:"",
    totalCost:"",
    items: this.itemList
  }

  constructor(
    private toastr:ToastrService
  ){}

  ngOnInit(): void {
    this.loadCustomerMobiles();
    this.loadItemNames();
  }

  loadCustomerMobiles() {
    fetch("http://localhost:8080/customer/all-mobiles")
      .then(res => res.json())
      .then(data => {
        if(data.status == "Success")
        this.mobileList = data.result;
      });
  }

  loadItemNames() {
    fetch("http://localhost:8080/item/all-ids")
      .then(res => res.json())
      .then(data => {
        if(data.status == "Success")
        this.itemIdList = data.result;
      });
  }

  addRental() {
    this.newRental.items = this.itemList;
    fetch("http://localhost:8080/rental", {
      method: 'POST',
      body: JSON.stringify(this.newRental),
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
          this.toastr.success("Rental added susscessfully!","Success");
        }
      })
      .catch(error => {
        this.toastr.warning('Error', 'Data Loading Failed', {
          timeOut: 4000,
        });
      });
  }

  addToCart(){
    // this.itemList.push(this.cartItem);
  }

}
