// components/header/header.component.ts
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <header
      class="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl rounded-full bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg shadow-neutral-200/10 transition-all duration-300"
    >
      <nav class="px-6 py-3">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <a
            routerLink="/"
            class="text-xl font-bold text-neutral-900 hover:text-primary-600 transition-colors flex items-center gap-2"
          >
            <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white text-sm">PJ</div>
            <span class="hidden sm:block">Praveen Joshua</span>
          </a>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-1">
            <a
              routerLink="/"
              routerLinkActive="bg-white shadow-sm text-primary-600"
              [routerLinkActiveOptions]="{ exact: true }"
              class="px-4 py-2 rounded-full text-sm font-medium text-neutral-600 hover:text-primary-600 hover:bg-white/50 transition-all"
            >
              Home
            </a>
            <a
              routerLink="/about"
              routerLinkActive="bg-white shadow-sm text-primary-600"
              class="px-4 py-2 rounded-full text-sm font-medium text-neutral-600 hover:text-primary-600 hover:bg-white/50 transition-all"
            >
              About
            </a>
            <a
              routerLink="/projects"
              routerLinkActive="bg-white shadow-sm text-primary-600"
              class="px-4 py-2 rounded-full text-sm font-medium text-neutral-600 hover:text-primary-600 hover:bg-white/50 transition-all"
            >
              Projects
            </a>
            <a
              routerLink="/blog"
              routerLinkActive="bg-white shadow-sm text-primary-600"
              class="px-4 py-2 rounded-full text-sm font-medium text-neutral-600 hover:text-primary-600 hover:bg-white/50 transition-all"
            >
              Blog
            </a>
            <a
              routerLink="/store"
              routerLinkActive="bg-white shadow-sm text-primary-600"
              class="px-4 py-2 rounded-full text-sm font-medium text-neutral-600 hover:text-primary-600 hover:bg-white/50 transition-all"
            >
              Store
            </a>
          </div>

          <!-- CTA & Mobile Toggle -->
          <div class="flex items-center gap-4">
            <a
              routerLink="/contact"
              class="hidden md:inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 rounded-full transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Let's Talk
            </a>

            <!-- Mobile Menu Button -->
            <button
              (click)="toggleMobileMenu()"
              class="md:hidden p-2 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <svg
                class="w-6 h-6 text-neutral-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  [attr.d]="
                    mobileMenuOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16M4 18h16'
                  "
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Navigation Overlay -->
        <div
          *ngIf="mobileMenuOpen"
          class="absolute top-full left-0 right-0 mt-4 p-4 bg-white/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl md:hidden animate-fade-in-up origin-top"
        >
          <div class="flex flex-col space-y-2">
            <a
              routerLink="/"
              routerLinkActive="bg-primary-50 text-primary-600"
              [routerLinkActiveOptions]="{ exact: true }"
              (click)="closeMobileMenu()"
              class="px-4 py-3 rounded-xl text-neutral-700 hover:bg-neutral-50 transition-colors font-medium"
            >
              Home
            </a>
            <a
              routerLink="/about"
              routerLinkActive="bg-primary-50 text-primary-600"
              (click)="closeMobileMenu()"
              class="px-4 py-3 rounded-xl text-neutral-700 hover:bg-neutral-50 transition-colors font-medium"
            >
              About
            </a>
            <a
              routerLink="/projects"
              routerLinkActive="bg-primary-50 text-primary-600"
              (click)="closeMobileMenu()"
              class="px-4 py-3 rounded-xl text-neutral-700 hover:bg-neutral-50 transition-colors font-medium"
            >
              Projects
            </a>
            <a
              routerLink="/blog"
              routerLinkActive="bg-primary-50 text-primary-600"
              (click)="closeMobileMenu()"
              class="px-4 py-3 rounded-xl text-neutral-700 hover:bg-neutral-50 transition-colors font-medium"
            >
              Blog
            </a>
            <a
              routerLink="/store"
              routerLinkActive="bg-primary-50 text-primary-600"
              (click)="closeMobileMenu()"
              class="px-4 py-3 rounded-xl text-neutral-700 hover:bg-neutral-50 transition-colors font-medium"
            >
              Store
            </a>
            <a
              routerLink="/contact"
              (click)="closeMobileMenu()"
              class="px-4 py-3 rounded-xl bg-neutral-900 text-white text-center font-medium mt-2"
            >
              Let's Talk
            </a>
          </div>
        </div>
      </nav>
    </header>
  `,
  styles: [],
})
export class HeaderComponent {
  mobileMenuOpen = false;

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }
}
