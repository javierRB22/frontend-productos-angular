import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../services/error.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {

  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;


  constructor(private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
  private _errorService: ErrorService) { }

  ngOnInit(): void {

  }

  addUser() {

    // validamos que el usuario ingrese valores

    if (this.username == '' || this.password == '' || this.confirmPassword == '') {

      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    //validamos que las password sean iguales

    if (this.password != this.confirmPassword) {
      this.toastr.error('Las password son distintas', 'Error');
      return;
    }

    //creamos el objeto

    const User: User = {

      username: this.username,
      password: this.password
    }
    this.loading = true;
    this._userService.signIn(User).subscribe({

      next: (v) => {
        this.loading = false;
        this.toastr.success(`El usuario ${this.username} fue registrado con exito`, 'Usuario registrado');
        this.router.navigate(['/login']);

      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorService.msjError(e);
      }
    })
  }
 
}
