import { Component } from '@angular/core';
import { AssetType } from './Models/asset-type';
import { CommonModule } from '@angular/common';
import { NgComponentOutlet } from '@angular/common';
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
