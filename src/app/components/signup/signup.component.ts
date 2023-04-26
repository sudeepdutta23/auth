import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'src/app/services/cookie.service';
import { HttpService } from 'src/app/services/http.service';
import { Errors } from 'src/app/utils/Errors';
import { onValueChanged } from 'src/app/utils/FormValueChange';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  public signupForm!: FormGroup;

  public formErrors: any = Errors;

  public passAndCpassSame: boolean = false;

  public cusMessage: String = "Password and confirm password not match";

  constructor(private fb: FormBuilder, private api: HttpService, private toast: ToastrService, private router: Router, private cookies: CookieService) {
    if(this.cookies.getCookie("token")){
      this.router.navigate(["/profile"])
    }
    this.signupForm = this.fb.group({
      fullName: [null, [Validators.required, Validators.minLength(6),Validators.maxLength(20)]],
      email: [null, 
        [Validators.required,
        Validators.email]],
      password: [null, 
        [Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/g),]],
      cpassword: [null, 
        [Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/g),]],
    }, {
      validators: this.password.bind(this),
    }
    )

    this.signupForm.valueChanges.subscribe((data)=>{
      onValueChanged(this.signupForm, this.formErrors, data)
   })

   onValueChanged(this.signupForm, this.formErrors)
  }

  password = (formGroup: FormGroup) => {
    return (this.passAndCpassSame =
      formGroup.get('password')?.value === formGroup.get('cpassword')?.value
        ? true
        : false);
  };

  signup = () =>{
    console.log("form value", this.signupForm.value.password, "===",this.signupForm.value.password)
    if(this.signupForm.value.password != this.signupForm.value.cpassword){
      this.toast.warning("Password and Confirm password does not match")
    }else{
      this.api.signup({ fullName: this.signupForm.value.fullName, email: this.signupForm.value.email, password: this.signupForm.value.password }).subscribe(({ error, data, message })=>{
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
}
