import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';




@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit {

  listproducts: product[] = []
  loading: boolean = false;

  constructor(private _productService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getListProducts();

  }
  getListProducts() {
    this.loading = true;


    this._productService.getListProducts().subscribe((data: product[]) => {
      this.listproducts = data;
      this.loading = false;

    })

  }

  deleteproduct(id: number) {
    this.loading = true;

    this._productService.deleteProduct(id).subscribe(() => {
      this.getListProducts();
      this.toastr.warning('El producto fue eliminado con exito', 'Producto eliminado');


    })

  }
}
