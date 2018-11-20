import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  MatSelectModule,
  MatFormFieldModule,
  MatOptionModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule } from '@angular/material';

@NgModule({
  declarations: [
    LoginFormComponent,
    NavBarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
  ],
  exports: [
    LoginFormComponent,
    NavBarComponent,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
  ]
})
export class SharedModule { }
