import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    FormsModule,
    BsDropdownModule
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  accountService = inject(AccountService);
  
  from: any = {
    userName: 'dave',
    password: 'password'
  };

  login() {
    this.accountService.login(this.from).subscribe({
      next: (res: any) => {
        // console.log(res);
        // this.isLoggedIn = true;
      },
      error: (err) => console.error(err),
      complete: () => console.log('Login complete')
    });
  }

  logout() {
    this.accountService.logout();
  }

}
