import { Component, OnInit } from '@angular/core';
import { product } from '../../interfaces/product';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit {

  listproducts: product[] = [

    { id: 1, name: 'Coca-Cola', description:'bebida con azucar', price: 4, stock: 200},
    {id: 2,  name: 'Corona', description:'bebida con alcohol', price: 5, stock: 300},
    
  ]

    
  


  constructor(){}

  ngOnInit(): void {
    
  }
}
