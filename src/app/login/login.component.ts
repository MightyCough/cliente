import { Component } from '@angular/core';
import { AuthService } from '../../service/auth';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  usuario:string = '';
  clave:string = '';
  errorMessage: string = '';  // Variable para mostrar el mensaje de error
  showPassword: boolean = false; // Variable para alternar la visibilidad de la contraseña

  constructor(private auth:AuthService, private router: Router,private route: ActivatedRoute){}


  ingresar(){
    this.auth.login(this.usuario,this.clave);
  }

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


}
