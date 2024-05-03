import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


//componentes
import { ListProductsComponent } from './components/list-products/list-products.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';


const routes: Routes = [
{path:'', redirectTo:'login', pathMatch:'full'},
{path: 'login', component: LoginComponent },
{path: 'signIn', component: SignInComponent },
{path: 'list', component: ListProductsComponent  },
{path:'add', component: AddEditProductComponent },
{path:'edit/:id', component:AddEditProductComponent},
{path:'delete/:id', component:AddEditProductComponent},
{path:'**', redirectTo:'login', pathMatch:'full'}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
