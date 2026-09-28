// components/header/header.component.ts
import { Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

const timeFmt = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kolkata',
  hour: '2-digit',
  minute: '2-digit',
});

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header
      class="fixed inset-x-0 top-0 z-50 bg-white/85 backdrop-blur-md text-[13px] font-semibold uppercase tracking-tight text-neutral-950"
    >
      <nav
        class="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 md:px-8"
      >
        <a routerLink="/" (click)="menuOpen.set(false)" class="flex items-center gap-2">
          <img src="mascot.png" alt="" width="28" height="28" class="h-7 w-7" />
          <span>Praveen Joshua</span>
        </a>

        <span class="hidden tabular-nums md:block" aria-label="Local time in Chennai">
          CHN / IND — {{ time() }}
        </span>

        <ul class="hidden items-center gap-6 md:flex">
          @for (link of links; track link.label; let last = $last) {
            <li class="flex items-center gap-6">
              @if (link.external) {
                <a [href]="link.href" target="_blank" rel="noopener" class="hover:underline underline-offset-4">
                  {{ link.label }} ↗
                </a>
              } @else {
                <a [routerLink]="link.href" [fragment]="link.fragment" class="hover:underline underline-offset-4">
                  {{ link.label }}
                </a>
              }
              @if (!last) {
                <span aria-hidden="true" class="h-1 w-1 rounded-full bg-neutral-950"></span>
              }
            </li>
          }
        </ul>

        <button
          type="button"
          class="uppercase md:hidden"
          (click)="menuOpen.set(!menuOpen())"
          [attr.aria-expanded]="menuOpen()"
          aria-controls="mobile-menu"
        >
          {{ menuOpen() ? 'Close' : 'Menu' }}
        </button>
      </nav>

      @if (menuOpen()) {
        <div
          id="mobile-menu"
          class="flex h-[calc(100dvh-4rem)] flex-col justify-between bg-white px-4 pb-8 md:hidden"
        >
          <ul class="space-y-1 pt-6">
            @for (link of links; track link.label) {
              <li>
                @if (link.external) {
                  <a [href]="link.href" target="_blank" rel="noopener" class="block text-6xl font-black leading-none tracking-tighter">
                    {{ link.label }} ↗
                  </a>
                } @else {
                  <a
                    [routerLink]="link.href"
                    [fragment]="link.fragment"
                    (click)="menuOpen.set(false)"
                    class="block text-6xl font-black leading-none tracking-tighter"
                  >
                    {{ link.label }}
                  </a>
                }
              </li>
            }
          </ul>
          <span class="tabular-nums">CHN / IND — {{ time() }}</span>
        </div>
      }
    </header>
  `,
})
export class HeaderComponent {
  readonly links = [
    { label: 'Work', href: '/', fragment: 'work' },
    { label: 'About', href: '/', fragment: 'about' },
    { label: 'Nuecrea', href: 'https://nuecrea.com', external: true },
    { label: 'Contact', href: '/contact' },
  ];

  menuOpen = signal(false);
  // Empty on the server so prerendered HTML never shows a stale build-time clock.
  time = signal('');

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const tick = () => this.time.set(timeFmt.format(new Date()));
      tick();
      const id = setInterval(tick, 15_000);
      destroyRef.onDestroy(() => clearInterval(id));
    });
  }
}
