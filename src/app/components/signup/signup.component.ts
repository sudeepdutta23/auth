import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'src/app/services/cookie.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  public signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private api: HttpService, private toast: ToastrService, private router: Router, private cookies: CookieService) {
    this.signupForm = this.fb.group({
      fullName: [null, [Validators.required, Validators.minLength(7),Validators.maxLength(30)]],
      email: [null, [Validators.required, Validators.minLength(7),Validators.maxLength(40)]],
      password: [null, [Validators.required, Validators.minLength(7),Validators.maxLength(15)]],
      cpassword: [null, [Validators.required, Validators.minLength(7),Validators.maxLength(15)]],
    })
  }

  signup = () =>{
    console.log("form value", this.signupForm.value.password, "===",this.signupForm.value.password)
    if(this.signupForm.value.password != this.signupForm.value.cpassword){
      this.toast.warning("Password and Confirm password does not match")
    }else{
      // this.api.signup({ fullName: this.signupForm.value.fullName, email: this.signupForm.value.email, password: this.signupForm.value.password }).subscribe(({ error, data, message })=>{
      //   if(!error){
      //     this.cookies.setCookie('token', data.token, 1)
      //     this.toast.success("Logged in successfully", "Success");
      //     this.router.navigate(['/profile']);
          
      //   }else{
      //     this.toast.error(message, "error")
      //   }
      //   console.log("error", data);
      // })
    }
  }
}
