import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'src/app/services/cookie.service';
import { HttpService } from 'src/app/services/http.service';
import { Errors } from 'src/app/utils/Errors';
import { onValueChanged } from 'src/app/utils/FormValueChange';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm!: FormGroup;

  public formErrors: any = Errors;
  constructor(private fb: FormBuilder, private api: HttpService, private toast: ToastrService, private router: Router, private cookies: CookieService) {
    if(this.cookies.getCookie("token")){
      this.router.navigate(["/profile"])
    }
    this.loginForm = this.fb.group({
      email: [null, 
        [Validators.required,
        Validators.email,
        // Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ]],
      password: [null, 
        [Validators.required,
        Validators.minLength(7),
        Validators.maxLength(20),
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/g)]]
    })

    this.loginForm.valueChanges.subscribe((data)=>{
       onValueChanged(this.loginForm, this.formErrors, data)
    })

    onValueChanged(this.loginForm, this.formErrors)
  }

  login = () =>{
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
