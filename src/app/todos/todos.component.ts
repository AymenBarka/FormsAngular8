import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder) { }
  formulaire = [];
  title='';
  firstName='';
  lastName='';
  email='';
  password='';
  confirmPassword='';

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
  });
  this.getInformation();
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {

      this.submitted = true;
      
      if (this.title && this.firstName && this.lastName && this.email && this.password  && this.confirmPassword) {
        this.formulaire.push({ title: this.title ,first: this.firstName, last: this.lastName, email: this.email, password:this.password,confirm: this.confirmPassword,});
        localStorage.setItem('formulaire', JSON.stringify(this.formulaire));
      }
      if (this.registerForm.invalid) {
         return;
     }
  }

  getInformation() {
    if (localStorage.getItem('formulaire') === null) {
      this.formulaire = [];
    } else {
      this.formulaire = JSON.parse(localStorage.getItem('formulaire'));
    }
  }
  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }

}
