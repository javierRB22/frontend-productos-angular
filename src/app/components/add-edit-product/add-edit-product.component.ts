import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css'
})
export class AddEditProductComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;


  constructor(private fb: FormBuilder,

    private _productService: ProductService,
    private router: Router,
    private toastr: ToastrService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
      stock: [null, Validators.required],
    })


  }

  ngOnInit(): void {

  }

  addproduct() {
    // console.log(this.form.value.name);
    // console.log(this.form.get('name')?.value);

    const product: product = {

      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      stock: this.form.value.stock

    }
    this.loading = true;
    this._productService.saveProduct(product).subscribe(() => {
      this.loading = false;
      this.toastr.success(`El producto ${product.name} fue registrado con exito`, 'Prodcuto registrado');
      this.router.navigate(['/']);
    })
  }
}







