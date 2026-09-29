import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="mx-auto max-w-[1600px] px-4 pb-12 pt-24 md:px-8 md:pt-28">
      <h1
        class="overflow-hidden text-[clamp(4rem,20.5vw,22rem)] font-black uppercase leading-[0.8] tracking-[-0.06em] text-neutral-950"
      >
        <span class="block rise">Praveen</span><span class="sr-only"> Joshua</span>
      </h1>

      <div class="mt-8 grid items-end gap-8 md:mt-10 md:grid-cols-12">
        <div class="md:col-span-7 fade" style="animation-delay: 0.35s">
          <p
            class="text-4xl font-medium leading-[1.02] tracking-tight text-neutral-950 md:text-6xl"
          >
            Building digital experiences that matter.
          </p>
          <p class="mt-6 max-w-md text-lg leading-snug text-neutral-600">
            Software engineer, designer and founder of Nuecrea, crafting
            intuitive, performant, and beautiful digital products.
          </p>
        </div>

        <figure
          class="relative z-10 w-3/5 md:col-span-4 md:col-start-9 md:-mt-[6vw] md:w-auto fade"
          style="animation-delay: 0.5s"
        >
          <div class="group aspect-square overflow-hidden bg-[#F1ECE3]">
            <img
              src="mascot.png"
              alt="Illustrated avatar of Praveen Joshua"
              width="501"
              height="501"
              class="h-full w-full object-contain p-[12%] transition-transform duration-700 ease-out group-hover:-rotate-3 group-hover:scale-105"
            />
          </div>
          <figcaption class="mt-3 text-[13px] font-semibold uppercase leading-tight">
            Praveen Joshua<br />
            <span class="text-neutral-500">Founder, Nuecrea</span>
          </figcaption>
        </figure>
      </div>

      <div
        class="mt-12 flex items-center justify-between text-[13px] font-semibold uppercase fade"
        style="animation-delay: 0.65s"
      >
        <a routerLink="/" fragment="about" class="underline underline-offset-4">
          Learn more about me
        </a>
        <a routerLink="/" fragment="work">(Scroll)</a>
      </div>
    </section>
  `,
})
export class HeroComponent {}
