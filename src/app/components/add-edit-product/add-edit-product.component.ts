import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css'
})
export class AddEditProductComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'agregar';


  constructor(private fb: FormBuilder,

    private _productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
      stock: [null, Validators.required],
    })

    this.id = Number(aRouter.snapshot.paramMap.get('id'));

  }

  ngOnInit(): void {

    if (this.id != 0) {
      // es editar
      this.operacion = 'Editar ';
      this.getproduct(this.id);

    }

  }

  getproduct(id: number) {
    this.loading = true;
    this._productService.getproduct(id).subscribe((data: product) => {
      this.loading = false;
      this.form.setValue({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock
      })
    })

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
    if (this.id !== 0) {
      //editar

      product.id = this.id;
      this._productService.updateProduct(this.id, product).subscribe(() => {
        this.toastr.info(`El producto ${product.name} fue actualizado con exito`, 'Producto actualizado');
        this.loading = false;
        this.router.navigate(['/']);

      })
    } else {
      //agregar
      this._productService.saveProduct(product).subscribe(() => {
        this.toastr.success(`El producto ${product.name} fue registrado con exito`, 'Prodcuto registrado');
        this.loading = false;
        this.router.navigate(['/']);
      })
    }
  }
}







