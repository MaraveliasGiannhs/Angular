import { Component } from '@angular/core';
import { NgxCrypticTextComponent } from '@omnedia/ngx-cryptic-text';


@Component({
  selector: 'app-cryptic-text',
  standalone: true,

  templateUrl: './cryptic-text.component.html',
  styleUrl: './cryptic-text.component.css',
  imports: [NgxCrypticTextComponent]
})

export class CrypticTextComponent {

}
