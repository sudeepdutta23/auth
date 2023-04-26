import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'src/app/services/cookie.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
constructor(private cookies: CookieService, private api: HttpService, private toast: ToastrService, private router: Router ){

}
hasToken = () =>{
  const token = this.cookies.getCookie("token");
  if(token) return false
  else return true
}

signout = () =>{
  this.api.signout().subscribe(({ message, error })=>{
    if(!error){
      this.toast.success(message, "success")
      this.cookies.deleteCookie('token')
      this.router.navigate(['/'])
    }
  })
}

}
