import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../services/error.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  loading: boolean = false;


  constructor(private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
  private _errorService: ErrorService) { }

  ngOnInit(): void {

  }

  login() {
    //validamos que el usuario ingrese datos

    if (this.username == '' || this.password == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return
    }

    //creamos el body

    const user: User = {
      username: this.username,
      password: this.password

    }
    this.loading = true;
    this._userService.login(user).subscribe({

      next: (token) => {
        localStorage.setItem('token', token);
        this.router.navigate(['/list'])
        
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
        this.loading = false;

      }
    })
  }

  msjError(e: HttpErrorResponse) {
    if (e.error.msg) {
      this.toastr.error(e.error.msg, 'Error');
    } else {
      this.toastr.error('Ups ocurrio un error, comuniquese con el administrador', 'Error');
    }
  }

}
