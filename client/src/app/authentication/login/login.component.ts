import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/CommonService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  clicked = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
  }

  onClickSignUp(){
    this.router.navigate(['/auth/registration']);
  }

  onReset(): void {
    this.clicked = false;
    this.loginForm.reset();
  }


  loginForm = this.fb.group(
    {
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(24)
        ]
      ]
    },

  );



  onSubmit(): boolean {
    debugger

    this.clicked = true;
    this.loginForm.markAllAsTouched();


    this.clicked = true;
    if (this.loginForm.invalid) {
        return true;
    }
    const payload = this.loginForm.value;

    this.commonService.sendRequest(payload,'/gdi/login').subscribe(
      (response) => {
        console.log('Response from server:', response);

        if(!response.errMsg){
          this.router.navigate(['/employee/list']);
        }else{
          Swal.fire(`${response.errMsg}`);
          return;
        }

      },
      (error) => {
        console.error('Error:', error);
      }
    );
    return true;

  }


}
