import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonComponent } from './components/person/person.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './components/auth/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent,  pathMatch: 'full'},
  { path: 'person', component: PersonComponent,  canActivate: [AuthGuard], pathMatch: 'full'},
  { path: 'login', component: LoginComponent,  pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
