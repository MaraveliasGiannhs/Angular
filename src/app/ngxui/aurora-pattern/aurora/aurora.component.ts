
  import { NgxAuroraComponent } from '@omnedia/ngx-aurora';
  import { Component, inject, ViewEncapsulation } from '@angular/core';
  import { AppComponent } from '../../../app.component';
  import { ThemeService } from '../../../Services/theme.service';
  import { CommonModule } from '@angular/common';

    @Component({
      selector: 'aurora-component',
      standalone: true,
      imports: [NgxAuroraComponent, CommonModule],
      templateUrl: './aurora.component.html',
      styleUrl: './aurora.component.css',
      encapsulation: ViewEncapsulation.None //to apply global styles,

    })

    export class AuroraComponent {
      cyberArmImage: string = "images\\CyberneticArmProsthesis.png";
      humanHandImage: string = "images\\HumanHand.png";

      isDark: boolean | undefined;
      themeService = inject(ThemeService);

    ngOnInit() {
      this.toggleTheme();
    }

    toggleTheme() {
       this.themeService.darkMode$.subscribe((val) => {
        this.isDark = val;
      });
    }

  }
