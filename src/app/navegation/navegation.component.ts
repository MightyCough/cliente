import { Component } from '@angular/core';
import { AuthService } from '../../service/auth';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-navegation',
  templateUrl: './navegation.component.html',
  styleUrl: './navegation.component.css'
})
export class NavegationComponent {
  isDropdownOpen: boolean = false;
  showNavbar: boolean = true; // Define showNavbar aquí para controlar su visibilidad

  constructor(private authService: AuthService, private router: Router) {
    // Escuchar los cambios en la ruta
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Muestra u oculta el navbar según la ruta
        this.showNavbar = event.url !== '/login';
      }
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  navHome() {
    this.router.navigate(['/home']);
  }

}
