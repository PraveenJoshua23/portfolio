// pages/contact/contact.component.ts
import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section class="mx-auto max-w-[1600px] px-4 pb-32 pt-24 md:px-8 md:pb-44 md:pt-28">
      <h1
        class="overflow-hidden text-[clamp(4rem,19vw,20rem)] font-black uppercase leading-[0.8] tracking-[-0.06em] text-neutral-950"
      >
        <span class="block rise">Contact</span>
      </h1>

      <div class="mt-8 grid gap-8 md:mt-10 md:grid-cols-12 fade" style="animation-delay: 0.35s">
        <p
          class="text-4xl font-medium leading-[1.02] tracking-tight text-neutral-950 md:col-span-8 md:text-6xl"
        >
          Client projects go through Nuecrea. For everything else, reach me
          directly.
        </p>
      </div>

      <div class="mt-24 border-t border-neutral-950 pt-3 md:mt-32">
        <span class="flex items-center gap-2 text-[13px] font-semibold uppercase">
          <span class="h-1.5 w-1.5 rounded-full bg-neutral-950"></span>C / 01
        </span>
      </div>

      <ol class="mt-6">
        @for (c of channels; track c.title; let i = $index) {
          <li
            appReveal
            class="grid gap-3 border-t border-neutral-200 py-8 first:border-t-0 md:grid-cols-12 md:items-baseline md:gap-8"
          >
            <span class="text-[13px] font-semibold md:col-span-1">0{{ i + 1 }}</span>
            <h2
              class="text-4xl font-black uppercase leading-none tracking-tighter text-neutral-950 md:col-span-4 md:text-6xl"
            >
              {{ c.title }}
            </h2>
            <p class="text-neutral-600 md:col-span-3">{{ c.description }}</p>
            <div class="md:col-span-4 md:text-right">
              <a
                [href]="c.href"
                target="_blank"
                rel="noopener noreferrer"
                class="text-2xl font-bold uppercase tracking-tight underline decoration-2 underline-offset-8 hover:decoration-[#9333ea] md:text-3xl"
              >
                {{ c.cta }} ↗
              </a>
              @if (c.email) {
                <a
                  [href]="'mailto:' + c.email"
                  class="mt-3 block text-[13px] font-semibold uppercase text-neutral-500 hover:text-neutral-950"
                >
                  {{ c.email }}
                </a>
              }
            </div>
          </li>
        }
      </ol>
    </section>
  `,
})
export class ContactComponent {
  readonly channels: {
    title: string;
    description: string;
    cta: string;
    href: string;
    email?: string;
  }[] = [
    {
      title: 'Projects',
      description:
        'Websites, apps, software, AI automation, branding and marketing, handled by my agency Nuecrea.',
      cta: 'Work with Nuecrea',
      href: 'https://nuecrea.com/#contact',
      email: 'info@nuecrea.com',
    },
    {
      title: 'LinkedIn',
      description: 'Networking, collaborations and quick questions.',
      cta: 'praveenjoshua',
      href: 'https://www.linkedin.com/in/praveenjoshua/',
    },
    {
      title: 'GitHub',
      description: 'Code, experiments and open source.',
      cta: 'PraveenJoshua23',
      href: 'https://github.com/PraveenJoshua23',
    },
  ];
}
