import { Component } from '@angular/core';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
constructor(private cookies: CookieService){

}
hasToken = () =>{
  const token = this.cookies.getCookie("token");
  if(token) return false
  else return true
}
}
