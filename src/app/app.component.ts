import { ThemeService } from './Services/theme.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';


 @Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor( public router: Router, private themeService: ThemeService){}

  title = 'app';
  savedTheme: string | null | undefined;

  @Output() auroraTheme = new EventEmitter<string>(); //emit back the index once updated


  ngOnInit() {

  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }


}


