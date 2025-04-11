import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    FormsModule,
    BsDropdownModule,
    RouterLink,
    RouterLinkActive,
    TitleCasePipe
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  accountService = inject(AccountService);
  router = inject(Router);
  toastr = inject(ToastrService);
  
  from: any = {
    userName: 'dave',
    password: 'password'
  };

  login() {
    this.accountService.login(this.from).subscribe({
      next: (res: any) => {
        // console.log(res);
        // this.isLoggedIn = true;
        this.router.navigateByUrl('/members');
      },
      error: (err) => {
        this.toastr.error(err.error);
         console.error(err);
        },
      complete: () => console.log('Login complete')
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
