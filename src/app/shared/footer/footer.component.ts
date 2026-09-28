// components/footer/footer.component.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="overflow-hidden bg-neutral-950 text-white">
      <div class="mx-auto max-w-[1600px] px-4 pt-16 md:px-8">
        <div
          class="grid gap-10 text-[13px] font-semibold uppercase md:grid-cols-12"
        >
          <p class="max-w-xs normal-case text-base font-normal text-neutral-400 md:col-span-5">
            Software engineer, designer and founder of Nuecrea. Building the
            future, one line of code at a time.
          </p>

          <nav class="space-y-2 md:col-span-2 md:col-start-7" aria-label="Site">
            <span class="block text-neutral-500">Site</span>
            <a routerLink="/" class="block hover:underline">Home</a>
            <a routerLink="/" fragment="work" class="block hover:underline">Work</a>
            <a routerLink="/contact" class="block hover:underline">Contact</a>
          </nav>

          <nav class="space-y-2 md:col-span-2" aria-label="Nuecrea">
            <span class="block text-neutral-500">Nuecrea</span>
            <a href="https://nuecrea.com/studio" target="_blank" rel="noopener" class="block hover:underline">Studio ↗</a>
            <a href="https://nuecrea.com/media" target="_blank" rel="noopener" class="block hover:underline">Media ↗</a>
            <a href="https://nuecrea.com/realty" target="_blank" rel="noopener" class="block hover:underline">Realty ↗</a>
          </nav>

          <nav class="space-y-2 md:col-span-2" aria-label="Social">
            <span class="block text-neutral-500">Social</span>
            <a href="https://github.com/PraveenJoshua23" target="_blank" rel="noopener noreferrer" class="block hover:underline">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/praveenjoshua/" target="_blank" rel="noopener noreferrer" class="block hover:underline">LinkedIn ↗</a>
          </nav>
        </div>

        <div
          class="mt-16 flex justify-between border-t border-neutral-800 pt-3 text-[13px] font-semibold uppercase text-neutral-500"
        >
          <span>© {{ currentYear }} Praveen Joshua</span>
          <span>Chennai, India</span>
        </div>

        <p
          aria-hidden="true"
          class="-mb-[0.14em] mt-4 select-none text-[clamp(4rem,23vw,25rem)] font-black uppercase leading-[0.8] tracking-[-0.06em] text-white"
        >
          Joshua
        </p>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
