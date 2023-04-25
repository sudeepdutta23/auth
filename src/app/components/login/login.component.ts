import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'src/app/services/cookie.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private api: HttpService, private toast: ToastrService, private router: Router, private cookies: CookieService) {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.minLength(7),Validators.maxLength(40)]],
      password: [null, [Validators.required, Validators.minLength(7),Validators.maxLength(15)]]
    })
  }

  login = () =>{
    console.log("form value", this.loginForm.value)
    this.api.login(this.loginForm.value).subscribe(({ error, data, message })=>{
      if(!error){
        this.cookies.setCookie('token', data.token, 1)
        this.toast.success("Logged in successfully", "Success");
        this.router.navigate(['/profile']);
        
      }else{
        this.toast.error(message, "error")
      }
      console.log("error", data);
    })
  }

}
