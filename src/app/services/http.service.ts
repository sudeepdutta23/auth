import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient, private toast: ToastrService, private cookies: CookieService) { }

  handleError = (errorResponse: HttpErrorResponse) => {
    console.log("===========",errorResponse);
    
    this.toast.error(errorResponse.error.message, 'error');
    return throwError('Something Goes Wrong');
  };


  login = (data: any) => this.httpClient.post<any>(`${environment.baseURI}signin`, data).pipe(catchError(this.handleError))

  signup = (data: any) => this.httpClient.post<any>(`${environment.baseURI}signup`, data).pipe(catchError(this.handleError))

  getUser = () => this.httpClient.get<any>(`${environment.baseURI}getUser`, { headers: { Authorization: `Bearer ${this.cookies.getCookie('token')}` } }).pipe(catchError(this.handleError))
}
