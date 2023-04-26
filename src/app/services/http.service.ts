import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from './cookie.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient, private toast: ToastrService, private cookies: CookieService, private router: Router) { }

  handleError = (errorResponse: HttpErrorResponse) => {
    console.log(errorResponse);
    if(errorResponse.status == 403){
      this.cookies.deleteCookie("token");
      this.router.navigate(['/']);
    }
    this.toast.error(errorResponse.error.message, 'error');
    return throwError('Something Goes Wrong');
  };


  login = (data: any) => this.httpClient.post<any>(`${environment.baseURI}signin`, data, { withCredentials: true }).pipe(catchError(this.handleError))

  signup = (data: any) => this.httpClient.post<any>(`${environment.baseURI}signup`, data).pipe(catchError(this.handleError))

  getUser = () => this.httpClient.get<any>(`${environment.baseURI}getUser`, { headers: { Authorization: `Bearer ${this.cookies.getCookie('token')}` } }).pipe(catchError(this.handleError))

  signout = () => this.httpClient.get<any>(`${environment.baseURI}signout`).pipe(catchError(this.handleError))
}
