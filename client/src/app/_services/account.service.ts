import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { IUser } from '../models/user.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  http = inject(HttpClient);
  currentUser: WritableSignal<IUser | null> = signal<IUser | null>(null);

  baseUrl = 'https://localhost:5001/api/account';

  constructor() { }

  login(from: any) {
    return this.http.post<IUser>(`${this.baseUrl}/login`, from).pipe(
      tap((user: IUser) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
      })
    );
  }


  register(from: any) {
    return this.http.post<IUser>(`${this.baseUrl}/register`, from).pipe(
      tap((user: IUser) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

}
