import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup,FormControl, Validators, FormArray, FormBuilder} from "@angular/forms";
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

    myForm: FormGroup;


  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        ]
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      agree: [false, Validators.requiredTrue],
      hobbies: this.fb.array([])
    });
  }

  get email() {
    return this.myForm.get('email');
  }

  get password() {
    return this.myForm.get('password');
  }

  get hobbies(): FormArray {
    return this.myForm.get('hobbies') as FormArray;
  }

  addHobby() {
    this.hobbies.push(this.fb.control(''));
  }

  removeHobby(index: number) {
    this.hobbies.removeAt(index);
  }

 

  onSubmit() {
    if (this.myForm.valid && this.myForm.value.agree) {
      console.log('Form Data:', this.myForm.value);
      this.myForm.reset();
      this.hobbies.clear();
    }}

}
