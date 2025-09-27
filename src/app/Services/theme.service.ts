import { ApplicationRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {

  private darkModeSubject = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkModeSubject.asObservable(); //$ means observable
  constructor(private appRef: ApplicationRef) {
    const stored = localStorage.getItem('theme');
    const isDark = stored === 'dark';
    this.darkModeSubject.next(isDark); //initial stored preference
    this.updateHtmlClass(isDark);
  }

  toggleTheme(): void {

    const currentTheme = this.darkModeSubject.getValue(); //get value from init
    const newTheme = !currentTheme; //toggle
    this.darkModeSubject.next(newTheme); //update observable
    localStorage.setItem('theme', newTheme ? 'dark' : 'light'); //store preference
    this.updateHtmlClass(newTheme); //update HTML class
    this.appRef.tick();


  }

  private updateHtmlClass(isDark: boolean): void {
    document.documentElement.classList.toggle('dark', isDark);
  }

  get isDark(): boolean {
    return this.darkModeSubject.getValue();
  }
}
