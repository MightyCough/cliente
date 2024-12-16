import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = new BehaviorSubject<string | null>(null);
  private ApiUrl = "http://127.0.0.1:8000/api/"; // URL to web api
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  login(username: string, password: string) {
    const headers = { 'X-API-KEY': 'f%p&M2PPBZ5MjU56yzLkNa' };
    this.http.post<{token: string}>(this.ApiUrl + 'login/', {username, password}, {headers})
      .subscribe(response => {
        this.token.next(response.token);
        console.log(response.token)
        localStorage.setItem('token', response.token);
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        this.router.navigateByUrl(returnUrl);
      }, error => {
        console.error('Error login', error);
      });
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    window.location.reload();
  }

  getToken() {
    return this.token.value;
  }

  isLoggedIn() {
    return this.token.value !== null;
  }

  loadToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.token.next(token);
    }
  }
}
