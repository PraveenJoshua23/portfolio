// pages/contact/contact.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="pt-24 pb-20 bg-white">
      <!-- Header -->
      <section class="container mx-auto px-6 mb-16">
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Let's Work Together
          </h1>
          <p class="text-xl text-neutral-600 leading-relaxed">
            Ready to bring your ideas to life? Whether it's a new project,
            collaboration, or just a friendly chat about technology, I'd love to
            hear from you.
          </p>
        </div>
      </section>

      <div class="container mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-16">
          <!-- Contact Form -->
          <div class="bg-white">
            <h2 class="text-2xl font-bold text-neutral-900 mb-8">
              Send a Message
            </h2>

            <form
              (ngSubmit)="onSubmit()"
              #contactForm="ngForm"
              class="space-y-6"
            >
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label for="firstName" class="form-label">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    [(ngModel)]="formData.firstName"
                    required
                    class="form-input"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label for="lastName" class="form-label">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    [(ngModel)]="formData.lastName"
                    required
                    class="form-input"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label for="email" class="form-label">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  [(ngModel)]="formData.email"
                  required
                  class="form-input"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label for="company" class="form-label">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  [(ngModel)]="formData.company"
                  class="form-input"
                  placeholder="Your Company"
                />
              </div>

              <div>
                <label for="projectType" class="form-label">Project Type</label>
                <select
                  id="projectType"
                  name="projectType"
                  [(ngModel)]="formData.projectType"
                  class="form-input"
                >
                  <option value="">Select a project type</option>
                  <option value="web-development">Web Development</option>
                  <option value="mobile-app">Mobile Application</option>
                  <option value="ui-ux-design">UI/UX Design</option>
                  <option value="consulting">Consulting</option>
                  <option value="analytics">Analytics & Data</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label for="budget" class="form-label">Project Budget</label>
                <select
                  id="budget"
                  name="budget"
                  [(ngModel)]="formData.budget"
                  class="form-input"
                >
                  <option value="">Select budget range</option>
                  <option value="under-5k">Under $5,000</option>
                  <option value="5k-10k">$5,000 - $10,000</option>
                  <option value="10k-25k">$10,000 - $25,000</option>
                  <option value="25k-50k">$25,000 - $50,000</option>
                  <option value="over-50k">Over $50,000</option>
                  <option value="discuss">Let's discuss</option>
                </select>
              </div>

              <div>
                <label for="message" class="form-label">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  [(ngModel)]="formData.message"
                  required
                  rows="6"
                  class="form-textarea"
                  placeholder="Tell me about your project, goals, and how I can help you..."
                ></textarea>
              </div>

              <div class="flex items-start">
                <input
                  type="checkbox"
                  id="newsletter"
                  name="newsletter"
                  [(ngModel)]="formData.newsletter"
                  class="mt-1 mr-3"
                />
                <label for="newsletter" class="text-sm text-neutral-600">
                  I'd like to receive updates about new blog posts and projects
                </label>
              </div>

              <button
                type="submit"
                [disabled]="!contactForm.form.valid || isSubmitting"
                class="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span *ngIf="!isSubmitting">Send Message</span>
                <span
                  *ngIf="isSubmitting"
                  class="flex items-center justify-center"
                >
                  <div
                    class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
                  ></div>
                  Sending...
                </span>
              </button>
            </form>

            <!-- Success/Error Messages -->
            <div
              *ngIf="showSuccessMessage"
              class="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
            >
              <div class="flex items-center">
                <svg
                  class="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <strong>Message sent successfully!</strong>
              </div>
              <p class="mt-1">
                Thanks for reaching out. I'll get back to you within 24 hours.
              </p>
            </div>

            <div
              *ngIf="showErrorMessage"
              class="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
            >
              <div class="flex items-center">
                <svg
                  class="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <strong>Something went wrong!</strong>
              </div>
              <p class="mt-1">Please try again or send me an email directly.</p>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="space-y-8">
            <div>
              <h2 class="text-2xl font-bold text-neutral-900 mb-6">
                Get in Touch
              </h2>
              <p class="text-neutral-600 mb-8 leading-relaxed">
                I'm always excited to discuss new projects and opportunities.
                Here are the best ways to reach me:
              </p>
            </div>

            <!-- Contact Methods -->
            <div class="space-y-6">
              <div class="flex items-start">
                <div
                  class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0"
                >
                  <svg
                    class="w-6 h-6 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-neutral-900 mb-1">Email</h3>
                  <p class="text-neutral-600 mb-2">
                    Best for detailed project discussions
                  </p>
                  <a
                    href="mailto:hello@praveenjoshua.com"
                    class="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    hello&#64;praveenjoshua.com
                  </a>
                </div>
              </div>

              <div class="flex items-start">
                <div
                  class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0"
                >
                  <svg
                    class="w-6 h-6 text-primary-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-neutral-900 mb-1">LinkedIn</h3>
                  <p class="text-neutral-600 mb-2">
                    Professional networking and quick questions
                  </p>
                  <a
                    href="https://linkedin.com/in/praveenjoshua"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    linkedin.com/in/praveenjoshua
                  </a>
                </div>
              </div>

              <div class="flex items-start">
                <div
                  class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0"
                >
                  <svg
                    class="w-6 h-6 text-primary-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-neutral-900 mb-1">GitHub</h3>
                  <p class="text-neutral-600 mb-2">
                    Code collaborations and open source projects
                  </p>
                  <a
                    href="https://github.com/praveenjoshua"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    github.com/praveenjoshua
                  </a>
                </div>
              </div>
            </div>

            <!-- Response Time -->
            <div class="bg-primary-50 rounded-lg p-6">
              <h3 class="font-semibold text-neutral-900 mb-2">Response Time</h3>
              <p class="text-neutral-600 text-sm leading-relaxed">
                I typically respond to all inquiries within 24 hours during
                business days. For urgent matters, please mention it in your
                message subject line.
              </p>
            </div>

            <!-- Availability -->
            <div class="bg-neutral-50 rounded-lg p-6">
              <h3 class="font-semibold text-neutral-900 mb-2">
                Current Availability
              </h3>
              <div class="flex items-center mb-2">
                <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span class="text-sm font-medium text-green-700"
                  >Available for new projects</span
                >
              </div>
              <p class="text-neutral-600 text-sm">
                I'm currently accepting new clients for Q2 2025. Let's discuss
                your timeline and requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class ContactComponent {
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    message: '',
    newsletter: false,
  };

  isSubmitting = false;
  showSuccessMessage = false;
  showErrorMessage = false;

  onSubmit() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.showSuccessMessage = false;
    this.showErrorMessage = false;

    // Simulate form submission
    setTimeout(() => {
      this.isSubmitting = false;

      // For demo purposes, show success message
      // In a real app, you'd send this to your backend/email service
      this.showSuccessMessage = true;

      // Reset form
      this.formData = {
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        projectType: '',
        budget: '',
        message: '',
        newsletter: false,
      };

      // Hide success message after 5 seconds
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 5000);
    }, 2000);
  }
}
