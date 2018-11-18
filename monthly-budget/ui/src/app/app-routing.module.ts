import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './shared/components/login-form/login-form.component';
import { SharedModule } from './shared/shared.module';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  // { path: '', component: }
  // { path: '**', redirectTo: }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    // SharedModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
