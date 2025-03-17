import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'client';

  http = inject(HttpClient);
  users: any[] = [];

  ngOnInit() {
    this.http.get('https://localhost:5001/api/user').subscribe({
      next: (res: any) => this.users = res,
      error: (err) => console.error(err),
      complete: () => console.log('API call complete')
    });
  }
}
