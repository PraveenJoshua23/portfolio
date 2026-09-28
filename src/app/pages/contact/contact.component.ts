// pages/contact/contact.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <div class="pt-32 pb-20 bg-white">
      <!-- Header -->
      <section class="container mx-auto px-6 mb-16">
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Get in Touch
          </h1>
          <p class="text-xl text-neutral-600 leading-relaxed">
            Client projects go through Nuecrea. For everything else, from
            collaborations to a friendly chat about technology, reach me
            directly.
          </p>
        </div>
      </section>

      <div class="container mx-auto px-6">
        <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <!-- Projects -> Nuecrea -->
          <div class="bg-neutral-900 text-white rounded-3xl p-8">
            <h2 class="text-2xl font-bold text-white mb-3">Have a project?</h2>
            <p class="text-neutral-300 mb-8 leading-relaxed">
              Websites, apps, software, AI automation, branding and marketing.
              My agency Nuecrea handles all of it.
            </p>
            <div class="flex flex-col gap-3">
              <a
                href="https://nuecrea.com/#contact"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center justify-center px-6 py-3 font-medium text-white hover:text-white bg-primary-600 hover:bg-primary-700 rounded-full transition-colors"
              >
                Work with Nuecrea
              </a>
              <a
                href="mailto:info@nuecrea.com"
                class="text-center text-neutral-300 hover:text-white transition-colors"
              >
                info&#64;nuecrea.com
              </a>
            </div>
          </div>

          <!-- Personal -->
          <div class="bg-neutral-50 border border-neutral-100 rounded-3xl p-8">
            <h2 class="text-2xl font-bold text-neutral-900 mb-3">
              Just want to connect?
            </h2>
            <p class="text-neutral-600 mb-8 leading-relaxed">
              Networking, collaborations and open source.
            </p>
            <div class="space-y-4">
              <a
                href="https://www.linkedin.com/in/praveenjoshua/"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-4 group"
              >
                <span
                  class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0"
                >
                  <svg
                    class="w-6 h-6 text-primary-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                    />
                  </svg>
                </span>
                <span>
                  <span class="block font-semibold text-neutral-900">LinkedIn</span>
                  <span class="text-primary-600 group-hover:text-primary-700"
                    >linkedin.com/in/praveenjoshua</span
                  >
                </span>
              </a>

              <a
                href="https://github.com/PraveenJoshua23"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-4 group"
              >
                <span
                  class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0"
                >
                  <svg
                    class="w-6 h-6 text-primary-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                    />
                  </svg>
                </span>
                <span>
                  <span class="block font-semibold text-neutral-900">GitHub</span>
                  <span class="text-primary-600 group-hover:text-primary-700"
                    >github.com/PraveenJoshua23</span
                  >
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ContactComponent {}
