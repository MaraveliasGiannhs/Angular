import { Component } from '@angular/core';
import { FormsModule, FormBuilder,ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-test',
  standalone: false,
  
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  constructor(){}

  myForm = new FormGroup({
    firstName: new FormControl(''),
    lastName : new FormControl('')
  })


  Save(){
    console.log(this.myForm.controls.firstName, this.myForm.controls.lastName)
  }
}
