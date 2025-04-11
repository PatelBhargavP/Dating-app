import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  http = inject(HttpClient);
  
  registerMode = false;
  users: any[] = [];

  ngOnInit() {
    this.getUsers();
  } 

  toggleRegister() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

  getUsers() {
    this.http.get<any[]>('https://localhost:5001/api/users').subscribe({
      next: (users: any[]) => this.users = users,
      error: (err) => console.error(err),
      complete: () => console.log('Get users complete')
    });
  }
}
