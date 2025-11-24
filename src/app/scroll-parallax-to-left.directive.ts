import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[scrollParallaxToLeft]'
})
export class ScrollParallaxToLeftDirective {
  constructor(private el: ElementRef) {}

  @HostListener('window:scroll')
  onScroll() {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // progress: 0 (top of viewport) → 1 (bottom)
    const progress = Math.min(Math.max(rect.top / windowHeight, 0), 1);

    this.el.nativeElement.style.setProperty('--move', `${progress * -250}px`);
    this.el.nativeElement.style.setProperty('--fade', `${1 - progress}`);
  }
}
