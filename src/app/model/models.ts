export interface CustomerCreate{
    name: string,
    city:string,
    contactNumber:string
}

export interface Customer{
    customerId: number,
    name: string,
    city:string,
    contactNumber:string
}

export interface Item{
    itemId: number,
    name:string,
    rentalPerDay: number,
    finePerDay:number,
    availability:string
}

export interface ItemCreate{
    name:string,
    rentalPerDay: number,
    finePerDay:number,
    availability:string
}

export interface CartItem{
    itemId:number,
    quantity:number,
    totalItemCost:number
}