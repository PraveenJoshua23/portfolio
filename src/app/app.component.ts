// app.component.ts
import { Component, DestroyRef, afterNextRender, inject } from '@angular/core';
import { Router, RouterOutlet, Scroll } from '@angular/router';
import { filter } from 'rxjs';
import Lenis from 'lenis';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="min-h-screen bg-white flex flex-col">
      <app-header></app-header>
      <main class="flex-1">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  constructor() {
    const router = inject(Router);
    const destroyRef = inject(DestroyRef);

    // Browser only: Lenis touches window, and SSR/prerender must not start a rAF loop.
    afterNextRender(() => {
      // Deep link (/#about): jump natively *before* Lenis starts, so Lenis reads the real
      // scroll position. (The first navigation's Scroll event fired before this ran.)
      if (location.hash) {
        document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
      }

      const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const lenis = reduceMotion ? null : new Lenis({ autoRaf: true, anchors: true });

      const scrollTo = (anchor: string | null) => {
        const target = anchor ? document.getElementById(anchor) : null;
        if (lenis) {
          lenis.scrollTo(target ?? 0, { immediate: !target });
        } else if (target) {
          target.scrollIntoView();
        } else {
          window.scrollTo(0, 0);
        }
      };

      // Router emits Scroll after each later navigation: jump to top, or glide to #fragment.
      const sub = router.events
        .pipe(filter((e): e is Scroll => e instanceof Scroll))
        .subscribe((e) => scrollTo(e.anchor));

      destroyRef.onDestroy(() => {
        sub.unsubscribe();
        lenis?.destroy();
      });
    });
  }
}
