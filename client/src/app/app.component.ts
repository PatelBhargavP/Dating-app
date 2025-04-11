import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { AccountService } from './_services/account.service';
import { IUser } from './models/user.model';
import { HomeComponent } from "./home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NavComponent,
    HomeComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'client';

  accountService = inject(AccountService);

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    let userString = localStorage.getItem('user') || null;
    let user: IUser | null = null;
    if(userString) {
      user = JSON.parse(userString) as IUser;
    }
    this.accountService.currentUser.set(user);
  }
}
