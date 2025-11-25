import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-50">
      <!-- Abstract Background Elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary-100/40 blur-3xl animate-float-slow"></div>
        <div class="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-secondary-100/30 blur-3xl animate-float-slower"></div>
      </div>

      <!-- Main Content -->
      <div class="relative z-10 container mx-auto px-6">
        <div class="max-w-4xl mx-auto text-center">
          <!-- Intro Tag -->
          <div class="inline-block mb-6 opacity-0 animate-fade-in-up" style="animation-delay: 0.1s;">
            <span class="px-4 py-2 rounded-full bg-white border border-neutral-200 text-neutral-600 text-sm font-medium shadow-sm">
              👋 Hello, I'm Praveen Joshua
            </span>
          </div>

          <!-- Main Heading -->
          <h1 class="text-5xl md:text-7xl font-bold text-neutral-900 tracking-tight mb-8 opacity-0 animate-fade-in-up" style="animation-delay: 0.2s;">
            Building digital <br class="hidden md:block" />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 animate-gradient bg-300%">
              experiences
            </span>
            that matter.
          </h1>

          <!-- Subheading -->
          <p class="text-xl md:text-2xl text-neutral-600 font-light mb-12 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-up" style="animation-delay: 0.3s;">
            Software Engineer & Designer crafting intuitive, performant, and beautiful web solutions.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 animate-fade-in-up" style="animation-delay: 0.4s;">
            <button (click)="scrollToProjects()" 
              class="group relative px-8 py-4 bg-neutral-900 text-white rounded-full font-medium overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5">
              <span class="relative z-10">View My Work</span>
              <div class="absolute inset-0 bg-neutral-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </button>
            
            <button (click)="scrollToContact()" 
              class="group px-8 py-4 bg-white text-neutral-900 border border-neutral-200 rounded-full font-medium transition-all hover:border-neutral-400 hover:shadow-md">
              Let's Connect
            </button>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 animate-fade-in" style="animation-delay: 1s;">
        <div class="w-[1px] h-16 bg-gradient-to-b from-neutral-300 to-transparent"></div>
      </div>
    </section>
  `,
  styles: [`
    @keyframes float-slow {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(20px, 20px); }
    }
    @keyframes float-slower {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(-30px, -20px); }
    }
    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .animate-float-slow {
      animation: float-slow 8s ease-in-out infinite;
    }
    .animate-float-slower {
      animation: float-slower 12s ease-in-out infinite;
    }
    .animate-fade-in-up {
      animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .animate-fade-in {
      animation: fade-in 1s ease-out forwards;
    }
  `]
})
export class HeroComponent {
  scrollToProjects() {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToContact() {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }
}
