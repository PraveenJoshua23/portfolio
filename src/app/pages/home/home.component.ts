// pages/home/home.component.ts
import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { HeroComponent } from './hero.component';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgTemplateOutlet, HeroComponent, RevealDirective],
  template: `
    <app-hero></app-hero>

    <div class="mx-auto max-w-[1600px] px-4 md:px-8">
      <!-- W / 01 — Work -->
      <section id="work" class="pt-16 md:pt-24">
        <ng-container
          *ngTemplateOutlet="head; context: { $implicit: 'W / 01', title: 'Work', count: '0' + projects.length }"
        ></ng-container>

        <div class="grid gap-x-8 gap-y-16 md:grid-cols-2">
          @for (p of projects; track p.title; let i = $index) {
            <article appReveal>
              <div class="aspect-[4/3] overflow-hidden bg-neutral-100">
                <img
                  [src]="p.image"
                  [alt]="p.title"
                  loading="lazy"
                  class="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                />
              </div>
              <div class="mt-4 flex items-baseline justify-between gap-4">
                <h3 class="text-lg font-bold uppercase leading-tight tracking-tight">
                  {{ p.title }}
                </h3>
                <span class="flex shrink-0 items-center gap-2 text-[13px] font-semibold">
                  <span class="h-1.5 w-1.5 rounded-full bg-neutral-950"></span>P / 0{{ i + 1 }}
                </span>
              </div>
              <p class="mt-2 max-w-md text-neutral-600">{{ p.description }}</p>
              <p class="mt-3 text-[13px] font-semibold uppercase text-neutral-400">
                {{ p.tags.join(' · ') }}
              </p>
            </article>
          }
        </div>
      </section>

      <!-- W / 02 — About -->
      <section id="about" class="pt-32 md:pt-44">
        <ng-container
          *ngTemplateOutlet="head; context: { $implicit: 'W / 02', title: 'About' }"
        ></ng-container>

        <div class="grid gap-12 md:grid-cols-12" appReveal>
          <div class="md:col-span-7">
            <p class="text-3xl font-medium leading-[1.1] tracking-tight text-neutral-950 md:text-5xl">
              With over 7 years of experience bridging design and development, I
              create meaningful digital experiences that solve real problems.
            </p>
            <p class="mt-8 max-w-xl text-lg text-neutral-600">
              Today I run Nuecrea, a multi-division agency building websites,
              apps, software and AI automation, alongside branding and
              marketing. Before that, I built payment solutions at Surfboard
              Payments.
            </p>
          </div>

          <dl class="text-[13px] font-semibold uppercase md:col-span-4 md:col-start-9">
            @for (fact of facts; track fact[0]) {
              <div class="flex justify-between gap-4 border-t border-neutral-200 py-4">
                <dt class="text-neutral-400">{{ fact[0] }}</dt>
                <dd class="text-right">{{ fact[1] }}</dd>
              </div>
            }
            <div class="border-t border-neutral-200 pt-6">
              <a href="https://nuecrea.com" target="_blank" rel="noopener" class="underline underline-offset-4">
                Visit Nuecrea ↗
              </a>
            </div>
          </dl>
        </div>
      </section>

      <!-- W / 03 — Capabilities -->
      <section class="pt-32 md:pt-44">
        <ng-container
          *ngTemplateOutlet="head; context: { $implicit: 'W / 03', title: 'Capabilities', count: '0' + capabilities.length }"
        ></ng-container>

        <ol>
          @for (c of capabilities; track c.title; let i = $index) {
            <li
              appReveal
              class="grid gap-3 border-t border-neutral-200 py-8 md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <span class="text-[13px] font-semibold md:col-span-1">0{{ i + 1 }}</span>
              <h3 class="text-4xl font-black uppercase leading-none tracking-tighter md:col-span-4 md:text-6xl">
                {{ c.title }}
              </h3>
              <p class="text-neutral-600 md:col-span-4">{{ c.description }}</p>
              <p class="text-[13px] font-semibold uppercase md:col-span-3 md:text-right">
                {{ c.tags.join(' · ') }}
              </p>
            </li>
          }
        </ol>
      </section>

      <!-- W / 04 — Contact -->
      <section id="contact" class="pb-32 pt-32 md:pb-44 md:pt-44">
        <ng-container
          *ngTemplateOutlet="head; context: { $implicit: 'W / 04', title: 'Contact' }"
        ></ng-container>

        <div appReveal>
          <p
            class="text-[clamp(3rem,10vw,10rem)] font-black uppercase leading-[0.85] tracking-[-0.05em] text-neutral-950"
          >
            Have a project<br />in mind?
          </p>
          <div class="mt-12 grid gap-8 md:grid-cols-12">
            <p class="max-w-md text-lg text-neutral-600 md:col-span-5">
              Client work runs through Nuecrea, my agency for software, design
              and marketing. For anything else, say hi on LinkedIn.
            </p>
            <div class="flex flex-col gap-3 text-2xl font-bold uppercase tracking-tight md:col-span-6 md:col-start-7 md:text-4xl">
              <a href="https://nuecrea.com/#contact" target="_blank" rel="noopener" class="underline decoration-2 underline-offset-8 hover:decoration-[#9333ea]">
                Work with Nuecrea ↗
              </a>
              <a
                href="https://www.linkedin.com/in/praveenjoshua/"
                target="_blank"
                rel="noopener noreferrer"
                class="underline decoration-2 underline-offset-8 hover:decoration-[#9333ea]"
              >
                Connect on LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Section heading: hairline, "• W / 0n" label, big title, optional count -->
    <ng-template #head let-label let-title="title" let-count="count">
      <div class="mb-10 border-t border-neutral-950 pt-3 md:mb-14">
        <span class="flex items-center gap-2 text-[13px] font-semibold uppercase">
          <span class="h-1.5 w-1.5 rounded-full bg-neutral-950"></span>{{ label }}
        </span>
        <div class="mt-2 flex items-end justify-between">
          <h2 class="text-5xl font-black uppercase leading-none tracking-tighter text-neutral-950 md:text-8xl">
            {{ title }}
          </h2>
          @if (count) {
            <span class="text-5xl font-black leading-none tracking-tighter md:text-8xl">{{ count }}</span>
          }
        </div>
      </div>
    </ng-template>
  `,
})
export class HomeComponent {
  readonly projects = [
    {
      title: 'Manuscript — A Writers IDE',
      description:
        'The first IDE for fiction architecture, treating stories as dynamic databases with an integrated Story Bible for world-building and continuity.',
      tags: ['Angular', 'NestJS', 'Gemini AI'],
      image: 'assets/work-1.png',
    },
    {
      title: 'Developer Playground',
      description:
        'API testing playground for Surfboard payments developers to explore and test payment APIs in a safe demo environment.',
      tags: ['Angular', 'Firebase', 'Gemini'],
      image: 'assets/work-2.png',
    },
    {
      title: 'Tenant Management System',
      description:
        'Streamlined property management solution for efficient tenant relationship handling.',
      tags: ['CRM', 'Real Estate'],
      image: 'assets/work-3.png',
    },
  ];

  readonly facts = [
    ['Experience', '7+ years'],
    ['Founder', 'Nuecrea'],
    ['Previously', 'Surfboard Payments'],
    ['Based in', 'Chennai, India'],
  ];

  readonly capabilities = [
    {
      title: 'Development',
      description:
        'Building scalable, performant applications with modern architectures and best practices.',
      tags: ['Angular', 'TypeScript', 'Node.js', 'Tailwind'],
    },
    {
      title: 'Design',
      description:
        'Crafting intuitive interfaces and seamless user experiences that delight and engage.',
      tags: ['UI/UX', 'Figma', 'Prototyping', 'Systems'],
    },
    {
      title: 'Analytics',
      description:
        'Transforming complex data into actionable insights to drive informed business decisions.',
      tags: ['Data Viz', 'Metrics', 'Strategy', 'Growth'],
    },
  ];
}
