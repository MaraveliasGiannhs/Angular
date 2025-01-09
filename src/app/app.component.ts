import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

 @Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor( public router: Router){}

  title = 'app';
}
