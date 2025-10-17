import { ThemeService } from './Services/theme.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink, Event, NavigationEnd } from '@angular/router';
import { IStaticMethods } from 'flyonui/flyonui';

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

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
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          window.HSStaticMethods.autoInit();
        }, 100);
      }
    });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }


}


