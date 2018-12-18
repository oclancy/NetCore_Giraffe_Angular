import { Directive } from '@angular/core';
import { HostListener } from '@angular/core';
import { AuthService } from 'mycore';


@Directive({
  selector: '[appLogout]'
})
export class LogoutDirective {

    constructor(private authService: AuthService) {
        console.info("Created directive");
    }

  @HostListener('click', ['$event.target'])
  onClick(btn) {
      this.authService.logout();
  }

  
}
