// pages/home/home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeroComponent } from './hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, HeroComponent],
  template: `
    <!-- Hero Section -->
    <app-hero></app-hero>

    <!-- About Preview Section -->
    <section class="py-32 bg-white overflow-hidden">
      <div class="container mx-auto px-6">
        <div class="flex flex-col lg:flex-row items-center gap-16">
          <!-- Text Content -->
          <div class="lg:w-1/2">
            <h2 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-8 tracking-tight">
              Crafting Digital Excellence
            </h2>
            <div class="space-y-6 text-lg text-neutral-600 font-light leading-relaxed mb-10">
              <p>
                With over 7 years of experience bridging design and development, I
                create meaningful digital experiences that solve real problems.
              </p>
              <p>
                My approach combines technical expertise with a keen eye for design,
                ensuring that every product I build is not only functional but also
                intuitive and beautiful. Currently building innovative payment solutions 
                at Surfboard Payments.
              </p>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-3 gap-8 mb-10 border-y border-neutral-100 py-8">
              <div>
                <div class="text-3xl font-bold text-primary-600 mb-1">7+</div>
                <div class="text-sm text-neutral-500 font-medium uppercase tracking-wider">Years Exp</div>
              </div>
              <div>
                <div class="text-3xl font-bold text-primary-600 mb-1">50+</div>
                <div class="text-sm text-neutral-500 font-medium uppercase tracking-wider">Projects</div>
              </div>
              <div>
                <div class="text-3xl font-bold text-primary-600 mb-1">100%</div>
                <div class="text-sm text-neutral-500 font-medium uppercase tracking-wider">Commitment</div>
              </div>
            </div>

            <a
              routerLink="/about"
              class="inline-flex items-center gap-2 text-neutral-900 font-medium hover:text-primary-600 transition-colors group"
            >
              Learn more about me
              <svg
                class="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            </a>
          </div>

          <!-- Visual Content -->
          <div class="lg:w-1/2 relative">
            <div class="absolute inset-0 bg-gradient-to-br from-primary-100/50 to-secondary-100/50 rounded-3xl transform rotate-3 scale-105"></div>
            <div class="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-100 bg-white">
              <img src="assets/about-visual.png" alt="Workspace" class="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700">
            </div>
            
            <!-- Floating Badge -->
            <div class="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-neutral-100 animate-float-slow">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <div class="text-sm font-bold text-neutral-900">Open for Work</div>
                  <div class="text-xs text-neutral-500">Available for new projects</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects Section -->
    <section id="projects" class="py-32 bg-neutral-50">
      <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-end mb-16">
          <div class="max-w-2xl">
            <h2 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 tracking-tight">
              Selected Work
            </h2>
            <p class="text-xl text-neutral-600 font-light leading-relaxed">
              A curated collection of projects where design meets engineering.
            </p>
          </div>
          <a
            routerLink="/projects"
            class="hidden md:flex items-center gap-2 text-neutral-900 font-medium hover:text-primary-600 transition-colors group"
          >
            View all projects
            <svg
              class="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </a>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <!-- Business Management System -->
          <div class="group cursor-pointer">
            <div class="relative overflow-hidden rounded-2xl bg-white aspect-[4/3] mb-6 border border-neutral-200 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1">
              <div class="absolute inset-0 bg-neutral-100 animate-pulse" *ngIf="!imageLoaded['business']"></div>
              <img 
                src="assets/business-dashboard.png" 
                alt="Business Management System"
                class="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                (load)="imageLoaded['business'] = true"
                [class.opacity-0]="!imageLoaded['business']"
                [class.opacity-100]="imageLoaded['business']"
              >
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </div>
            <div class="space-y-3">
              <div class="flex flex-wrap gap-2">
                <span class="px-3 py-1 bg-white border border-neutral-200 text-neutral-600 rounded-full text-xs font-medium tracking-wide">ANGULAR</span>
                <span class="px-3 py-1 bg-white border border-neutral-200 text-neutral-600 rounded-full text-xs font-medium tracking-wide">DASHBOARD</span>
              </div>
              <h3 class="text-2xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                Business Management System
              </h3>
              <p class="text-neutral-600 leading-relaxed">
                Comprehensive analytics dashboard for enterprise operations featuring real-time data visualization.
              </p>
            </div>
          </div>

          <!-- Language Learning App -->
          <div class="group cursor-pointer">
            <div class="relative overflow-hidden rounded-2xl bg-white aspect-[4/3] mb-6 border border-neutral-200 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1">
              <div class="absolute inset-0 bg-neutral-100 animate-pulse" *ngIf="!imageLoaded['language']"></div>
              <img 
                src="assets/language-app.png" 
                alt="Language Learning App"
                class="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                (load)="imageLoaded['language'] = true"
                [class.opacity-0]="!imageLoaded['language']"
                [class.opacity-100]="imageLoaded['language']"
              >
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </div>
            <div class="space-y-3">
              <div class="flex flex-wrap gap-2">
                <span class="px-3 py-1 bg-white border border-neutral-200 text-neutral-600 rounded-full text-xs font-medium tracking-wide">PWA</span>
                <span class="px-3 py-1 bg-white border border-neutral-200 text-neutral-600 rounded-full text-xs font-medium tracking-wide">GAMIFICATION</span>
              </div>
              <h3 class="text-2xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                Language Learning App
              </h3>
              <p class="text-neutral-600 leading-relaxed">
                Interactive platform making language acquisition fun through gamified learning paths.
              </p>
            </div>
          </div>

          <!-- Tenant Management System -->
          <div class="group cursor-pointer">
            <div class="relative overflow-hidden rounded-2xl bg-white aspect-[4/3] mb-6 border border-neutral-200 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1">
              <div class="absolute inset-0 bg-neutral-100 animate-pulse" *ngIf="!imageLoaded['realestate']"></div>
              <img 
                src="assets/real-estate-crm.png" 
                alt="Tenant Management System"
                class="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                (load)="imageLoaded['realestate'] = true"
                [class.opacity-0]="!imageLoaded['realestate']"
                [class.opacity-100]="imageLoaded['realestate']"
              >
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </div>
            <div class="space-y-3">
              <div class="flex flex-wrap gap-2">
                <span class="px-3 py-1 bg-white border border-neutral-200 text-neutral-600 rounded-full text-xs font-medium tracking-wide">CRM</span>
                <span class="px-3 py-1 bg-white border border-neutral-200 text-neutral-600 rounded-full text-xs font-medium tracking-wide">REAL ESTATE</span>
              </div>
              <h3 class="text-2xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                Tenant Management System
              </h3>
              <p class="text-neutral-600 leading-relaxed">
                Streamlined property management solution for efficient tenant relationship handling.
              </p>
            </div>
          </div>
        </div>

        <div class="text-center md:hidden">
          <a
            routerLink="/projects"
            class="inline-flex items-center gap-2 text-neutral-900 font-medium hover:text-primary-600 transition-colors"
          >
            View all projects
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="py-32 bg-white relative overflow-hidden">
      <!-- Decorative background elements -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div class="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary-50/50 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary-50/50 rounded-full blur-3xl"></div>
      </div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="text-center mb-20">
          <h2 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 tracking-tight">
            Expertise & Skills
          </h2>
          <p class="text-xl text-neutral-600 max-w-2xl mx-auto font-light leading-relaxed">
            A multidisciplinary approach to building digital products, combining technical depth with creative vision.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Development -->
          <div class="group p-8 rounded-3xl bg-neutral-50 border border-neutral-100 hover:bg-white hover:shadow-xl hover:shadow-primary-100/50 transition-all duration-500 hover:-translate-y-1">
            <div class="w-20 h-20 mb-8 mx-auto relative">
              <div class="absolute inset-0 bg-primary-100 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
              <div class="absolute inset-0 bg-white rounded-2xl shadow-sm flex items-center justify-center overflow-hidden border border-neutral-100">
                <img src="assets/icon-development.png" alt="Development" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700">
              </div>
            </div>
            <h3 class="text-2xl font-bold text-neutral-900 mb-4 text-center">Development</h3>
            <p class="text-neutral-600 mb-8 text-center leading-relaxed">
              Building scalable, performant applications with modern architectures and best practices.
            </p>
            <div class="flex flex-wrap gap-2 justify-center">
              <span class="px-3 py-1 bg-white border border-neutral-200 text-neutral-600 rounded-full text-sm font-medium">Angular</span>
              <span class="px-3 py-1 bg-white border border-neutral-200 text-neutral-600 rounded-full text-sm font-medium">TypeScript</span>
              <span class="px-3 py-1 bg-white border border-neutral-200 text-neutral-600 rounded-full text-sm font-medium">Node.js</span>
              <span class="px-3 py-1 bg-white border border-neutral-200 text-neutral-600 rounded-full text-sm font-medium">Tailwind</span>
            </div>
          </div>

          <!-- Design -->
          <div class="group p-8 rounded-3xl bg-neutral-50 border border-neutral-100 hover:bg-white hover:shadow-xl hover:shadow-secondary-100/50 transition-all duration-500 hover:-translate-y-1">
            <div class="w-20 h-20 mb-8 mx-auto relative">
              <div class="absolute inset-0 bg-secondary-100 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
              <div class="absolute inset-0 bg-white rounded-2xl shadow-sm flex items-center justify-center overflow-hidden border border-neutral-100">
                <img src="assets/icon-design.png" alt="Design" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700">
              </div>
            </div>
            <h3 class="text-2xl font-bold text-neutral-900 mb-4 text-center">Design</h3>
            <p class="text-neutral-600 mb-8 text-center leading-relaxed">
              Crafting intuitive interfaces and seamless user experiences that delight and engage.
            </p>
            <div class="flex flex-wrap gap-2 justify-center">
              <span class="px-3 py-1 bg-white border border-neutral-200 text-neutral-600 rounded-full text-sm font-medium">UI/UX</span>
              <span class="px-3 py-1 bg-white border border-neutral-200 text-neutral-600 rounded-full text-sm font-medium">Figma</span>
              <span class="px-3 py-1 bg-white border border-neutral-200 text-neutral-600 rounded-full text-sm font-medium">Prototyping</span>
              <span class="px-3 py-1 bg-white border border-neutral-200 text-neutral-600 rounded-full text-sm font-medium">Systems</span>
            </div>
          </div>

          <!-- Analytics -->
          <div class="group p-8 rounded-3xl bg-neutral-50 border border-neutral-100 hover:bg-white hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-500 hover:-translate-y-1">
            <div class="w-20 h-20 mb-8 mx-auto relative">
              <div class="absolute inset-0 bg-blue-100 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
              <div class="absolute inset-0 bg-white rounded-2xl shadow-sm flex items-center justify-center overflow-hidden border border-neutral-100">
                <img src="assets/icon-analytics.png" alt="Analytics" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700">
              </div>
            </div>
            <h3 class="text-2xl font-bold text-neutral-900 mb-4 text-center">Analytics</h3>
            <p class="text-neutral-600 mb-8 text-center leading-relaxed">
              Transforming complex data into actionable insights to drive informed business decisions.
            </p>
            <div class="flex flex-wrap gap-2 justify-center">
              <span class="px-3 py-1 bg-white border border-neutral-200 text-neutral-600 rounded-full text-sm font-medium">Data Viz</span>
              <span class="px-3 py-1 bg-white border border-neutral-200 text-neutral-600 rounded-full text-sm font-medium">Metrics</span>
              <span class="px-3 py-1 bg-white border border-neutral-200 text-neutral-600 rounded-full text-sm font-medium">Strategy</span>
              <span class="px-3 py-1 bg-white border border-neutral-200 text-neutral-600 rounded-full text-sm font-medium">Growth</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-32 relative overflow-hidden">
      <!-- Abstract Background -->
      <div class="absolute inset-0 bg-neutral-900">
        <div class="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900"></div>
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div class="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-[100px] animate-pulse"></div>
          <div class="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary-600/20 rounded-full blur-[100px] animate-pulse" style="animation-delay: 2s"></div>
        </div>
        <!-- Grid Pattern Overlay -->
        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-20"></div>
      </div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
            Let's Build Something <br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">Amazing Together</span>
          </h2>
          <p class="text-xl text-neutral-300 mb-12 leading-relaxed max-w-2xl mx-auto font-light">
            Whether you have a specific project in mind or just want to explore what's possible, I'm always open to discussing new opportunities.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              routerLink="/contact"
              class="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-600/30"
            >
              Start a Project
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </a>
            <a
              href="mailto:hello@example.com"
              class="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white border border-white/20 hover:bg-white/10 rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              hello&#64;example.com
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class HomeComponent {
  imageLoaded: { [key: string]: boolean } = {};
}
