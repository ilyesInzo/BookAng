import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpFrom: FormGroup;
  error: string;

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {

    this.signUpFrom = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      passWord: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });

  }

  onSubmit() {

    const email = this.signUpFrom.get('email').value;
    const passWord = this.signUpFrom.get('passWord').value;

    this.authService.sighUpUser(email, passWord).then(
      () => { 
        this.router.navigate(['/books']);
      },
      (error) => { this.error = error; }
    )

  }



}
