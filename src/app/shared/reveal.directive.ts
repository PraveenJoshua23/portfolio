// shared/reveal.directive.ts
import { Directive, ElementRef, afterNextRender, inject } from '@angular/core';

/** Fades/slides the element in when it scrolls into view. Server HTML stays fully visible. */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective {
  constructor() {
    const el: HTMLElement = inject(ElementRef).nativeElement;

    afterNextRender(() => {
      el.classList.add('reveal');
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('is-in');
            io.disconnect();
          }
        },
        { rootMargin: '0px 0px -10% 0px' },
      );
      io.observe(el);
    });
  }
}
