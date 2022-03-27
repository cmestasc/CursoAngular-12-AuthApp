import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    email: ['test4@test.com', [Validators.required, Validators.email]],
    name: ['Test 4', [Validators.required]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  })

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  registro() {
    const {name, email, password} = this.miFormulario.value;

    this.authService.registro(name, email, password)
    .subscribe(ok=>{
      if(ok===true){
        this.router.navigateByUrl('/dashboard');
      } else{
        Swal.fire('Error', ok, 'error')
      }
    });
  }
}
