import { Component, OnInit } from '@angular/core';
import { CookieService } from 'src/app/services/cookie.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  public profileData: any;
constructor(private cookies: CookieService, private api: HttpService){
  console.log("Sudeep Cookies", cookies.getCookie('token'))
}

ngOnInit(){
  this.getUserss()
}

getUserss = () =>{
  this.api.getUser().subscribe(({ error, data, message })=>{
    if(!error){
      this.profileData = data.user;
    }
  })
}
}
