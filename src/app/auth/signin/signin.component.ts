import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  errorMSG: string;
  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {

    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      passWord: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });

  }

  onSubmit() {

    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('passWord').value;

    this.authService.signInUser(email, password).then(
      () => { this.router.navigate(['/books']) },
      (error) => { this.errorMSG = error; });

  }

}
