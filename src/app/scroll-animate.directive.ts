import { Directive, ElementRef, HostBinding, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[scrollAnimate]'
})
export class ScrollAnimateDirective implements AfterViewInit {
  @HostBinding('class.visible') isVisible = false;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        this.isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.1 });

    observer.observe(this.el.nativeElement);
  }
}
