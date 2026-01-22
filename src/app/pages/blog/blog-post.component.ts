import { Component, OnInit, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  DirectusService,
  BlogPost,
} from '../../shared/services/directus.service';

interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-white">
      @if (loading()) {
      <div class="pt-24 pb-20">
        <div class="container mx-auto px-6 text-center py-20">
          <div
            class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"
          ></div>
          <p class="text-neutral-600">Loading post...</p>
        </div>
      </div>
      } @else if (error()) {
      <div class="pt-24 pb-20">
        <div class="container mx-auto px-6 text-center py-20">
          <div class="text-6xl mb-4">❌</div>
          <h1 class="text-2xl font-bold text-neutral-900 mb-4">
            Post Not Found
          </h1>
          <p class="text-neutral-600 mb-8">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <a
            routerLink="/blog"
            class="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Back to Blog
          </a>
        </div>
      </div>
      } @else if (post()) {
      <!-- Hero Section with Featured Image -->
      <section class="relative pt-16 pb-8">
        @if (post()?.featured_image) {
        <div class="absolute inset-0 z-0">
          <img
            [src]="getImageUrl(post()?.featured_image || '')"
            [alt]="post()?.title"
            class="w-full h-full object-cover "
          />
          <div
            class="absolute inset-0  backdrop-blur-md bg-gradient-to-t from-black/60 via-black/20 to-transparent"
          ></div>
        </div>
        } @else {
        <div
          class="absolute inset-0 z-0 bg-gradient-to-br from-primary-600 to-primary-800"
        ></div>
        }

        <div class="relative z-10 container mx-auto px-6 pt-16 pb-8">
          <!-- Breadcrumb -->
          <nav class="mb-8">
            <ol class="flex items-center space-x-2 text-sm">
              <li>
                <a
                  routerLink="/"
                  class="text-white/80 hover:text-white transition-colors"
                  >Home</a
                >
              </li>
              <li class="text-white/60">/</li>
              <li>
                <a
                  routerLink="/blog"
                  class="text-white/80 hover:text-white transition-colors"
                  >Blog</a
                >
              </li>
              <li class="text-white/60">/</li>
              <li class="text-white font-medium">{{ post()!.title }}</li>
            </ol>
          </nav>

          <!-- Post Meta -->
          <div class="max-w-4xl mx-auto text-center">
            <div
              class="flex items-center justify-center space-x-4 text-white/80 mb-6"
            >
              <time [dateTime]="post()!.date_created">
                {{ formatDate(post()!.date_created) }}
              </time>
              @if (post()!.reading_time) {
              <span>•</span>
              <span>{{ post()!.reading_time }} min read</span>
              }
              <span>•</span>
              <span>{{ post()!.created_by }}</span>
            </div>

            <h1
              class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              {{ post()!.title }}
            </h1>

            @if (post()!.excerpt) {
            <p class="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              {{ post()!.excerpt }}
            </p>
            }
          </div>
        </div>
      </section>

      <!-- Main Content -->
      <article class="py-12">
        <div class="container mx-auto px-6">
          <div class="max-w-4xl mx-auto">
            <div class="lg:flex lg:gap-12">
              <!-- Table of Contents (Desktop) -->
              @if (tableOfContents().length > 0) {
              <aside class="hidden lg:block lg:w-64 shrink-0">
                <div class="sticky top-8">
                  <h3 class="text-lg font-bold text-neutral-900 mb-4">
                    Table of Contents
                  </h3>
                  <nav class="space-y-2">
                    @for (item of tableOfContents(); track item.id) {
                    <a
                      [href]="'#' + item.id"
                      [class]="
                        'block text-sm text-neutral-600 hover:text-primary-600 transition-colors py-1 ' +
                        (item.level === 2
                          ? 'pl-0'
                          : item.level === 3
                          ? 'pl-4'
                          : 'pl-8')
                      "
                      (click)="scrollToSection($event, item.id)"
                    >
                      {{ item.text }}
                    </a>
                    }
                  </nav>
                </div>
              </aside>
              }

              <!-- Main Article Content -->
              <div class="flex-1 min-w-0">
                <!-- Tags -->
                @if (post()!.tags && post()!.tags!.length > 0) {
                <div class="flex flex-wrap gap-2 mb-8">
                  @for (tag of post()!.tags; track tag) {
                  <span
                    class="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                  >
                    {{ tag.label }}
                  </span>
                  }
                </div>
                }

                <!-- Table of Contents (Mobile) -->
                @if (tableOfContents().length > 0) {
                <div class="lg:hidden mb-8 p-6 bg-neutral-50 rounded-xl">
                  <h3 class="text-lg font-bold text-neutral-900 mb-4">
                    Table of Contents
                  </h3>
                  <nav class="space-y-2">
                    @for (item of tableOfContents(); track item.id) {
                    <a
                      [href]="'#' + item.id"
                      [class]="
                        'block text-sm text-neutral-600 hover:text-primary-600 transition-colors py-1 ' +
                        (item.level === 2
                          ? 'pl-0'
                          : item.level === 3
                          ? 'pl-4'
                          : 'pl-8')
                      "
                      (click)="scrollToSection($event, item.id)"
                    >
                      {{ item.text }}
                    </a>
                    }
                  </nav>
                </div>
                }

                <!-- Article Content -->
                <div
                  class="prose prose-lg prose-neutral max-w-none prose-headings:scroll-mt-24"
                  [innerHTML]="sanitizedContent()"
                ></div>

                <!-- Social Sharing -->
                <div class="mt-12 pt-8 border-t border-neutral-200">
                  <h3 class="text-lg font-bold text-neutral-900 mb-4">
                    Share this post
                  </h3>
                  <div class="flex items-center space-x-4">
                    <button
                      (click)="shareOnTwitter()"
                      class="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    >
                      <svg
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                        />
                      </svg>
                      <span>Twitter</span>
                    </button>

                    <button
                      (click)="shareOnLinkedIn()"
                      class="flex items-center space-x-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors"
                    >
                      <svg
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                        />
                      </svg>
                      <span>LinkedIn</span>
                    </button>

                    <button
                      (click)="copyLink()"
                      class="flex items-center space-x-2 px-4 py-2 bg-neutral-600 hover:bg-neutral-700 text-white rounded-lg transition-colors"
                    >
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
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <span>{{ linkCopied() ? 'Copied!' : 'Copy Link' }}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <!-- Related Posts -->
      @if (relatedPosts().length > 0) {
      <section class="py-24 bg-neutral-50">
        <div class="container mx-auto px-6">
          <div class="max-w-6xl mx-auto">
            <h2 class="text-3xl font-bold text-neutral-900 mb-12 text-center tracking-tight">
              Related Posts
            </h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              @for (relatedPost of relatedPosts(); track relatedPost.slug) {
              <article
                class="group cursor-pointer flex flex-col h-full"
              >
                <div
                  class="relative overflow-hidden rounded-2xl bg-white aspect-video mb-6 border border-neutral-200 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1"
                >
                  @if (relatedPost.featured_image) {
                  <img
                    [src]="getImageUrl(relatedPost.featured_image)"
                    [alt]="relatedPost.title"
                    class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                  } @else {
                  <div class="w-full h-full flex items-center justify-center bg-neutral-50">
                    <span class="text-4xl">📝</span>
                  </div>
                  }
                  <div class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                </div>
                
                <div class="space-y-3 flex-1 flex flex-col">
                  <div class="flex items-center text-sm text-neutral-500 font-medium space-x-2">
                    <time [dateTime]="relatedPost.date_created">
                      {{ formatDate(relatedPost.date_created) }}
                    </time>
                    @if (relatedPost.reading_time) {
                    <span>•</span>
                    <span>{{ relatedPost.reading_time }} min read</span>
                    }
                  </div>
                  
                  <h3 class="text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                    <a [routerLink]="['/blog', relatedPost.slug]">{{ relatedPost.title }}</a>
                  </h3>
                  
                  <p class="text-neutral-600 leading-relaxed line-clamp-3 mb-4 flex-1">
                    {{ relatedPost.excerpt }}
                  </p>
                  
                  <a
                    [routerLink]="['/blog', relatedPost.slug]"
                    class="inline-flex items-center gap-2 text-neutral-900 font-medium hover:text-primary-600 transition-colors group/link mt-auto"
                  >
                    Read more
                    <svg
                      class="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform"
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
              </article>
              }
            </div>
          </div>
        </div>
      </section>
      }

      <!-- Newsletter Signup (Dark Theme) -->
      <section class="py-32 relative overflow-hidden bg-neutral-900">
        <!-- Background Effects -->
        <div class="absolute inset-0">
            <div class="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div class="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-[100px] animate-pulse"></div>
                <div class="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary-600/20 rounded-full blur-[100px] animate-pulse" style="animation-delay: 2s"></div>
            </div>
            <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-20"></div>
        </div>

        <div class="container mx-auto px-6 relative z-10 text-center">
          <h3 class="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">Stay in the Loop</h3>
          <p class="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Get notified when I publish new articles about development, design, and technology insights.
          </p>
          
          <form class="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              class="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent backdrop-blur-sm transition-all"
            />
            <button
              type="submit"
              class="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary-600/30"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
      }
    </div>
  `,
  styles: [
    `
      .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .prose h2,
      .prose h3,
      .prose h4,
      .prose h5,
      .prose h6 {
        scroll-margin-top: 6rem;
      }
    `,
  ],
})
export class BlogPostComponent implements OnInit {
  post = signal<BlogPost | null>(null);
  relatedPosts = signal<BlogPost[]>([]);
  loading = signal(true);
  error = signal(false);
  linkCopied = signal(false);
  tableOfContents = signal<TableOfContentsItem[]>([]);

  sanitizedContent = computed(() => {
    const content = this.post()?.content;
    if (!content) return '';
    return this.sanitizer.bypassSecurityTrustHtml(content);
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private directusService: DirectusService,
    private sanitizer: DomSanitizer
  ) {
    // Effect to generate table of contents when content changes
    effect(() => {
      const post = this.post();
      if (post?.content) {
        this.generateTableOfContents(post.content);
      }
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const slug = params['slug'];
      if (slug) {
        this.loadPost(slug);
      }
    });
  }

  loadPost(slug: string) {
    this.loading.set(true);
    this.error.set(false);

    this.directusService.getBlogPost(slug).subscribe({
      next: (post) => {
        if (post) {
          this.post.set(post);
          this.loadRelatedPosts(post);
        } else {
          this.error.set(true);
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading blog post:', error);
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  loadRelatedPosts(currentPost: BlogPost) {
    // Load posts with similar tags or recent posts
    this.directusService.getBlogPosts(6, 0).subscribe({
      next: (posts) => {
        // Filter out current post and limit to 3
        const related = posts
          .filter((p) => p.id !== currentPost.id)
          .slice(0, 3);
        this.relatedPosts.set(related);
      },
      error: (error) => {
        console.error('Error loading related posts:', error);
      },
    });
  }

  generateTableOfContents(content: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headings = doc.querySelectorAll('h2, h3, h4, h5, h6');

    const toc: TableOfContentsItem[] = [];

    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      const text = heading.textContent?.trim() || '';
      const id = this.generateId(text, index);

      // Add ID to heading for linking
      heading.id = id;

      toc.push({
        id,
        text,
        level,
      });
    });

    this.tableOfContents.set(toc);
  }

  generateId(text: string, index: number): string {
    return (
      text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim() + `-${index}`
    );
  }

  scrollToSection(event: Event, id: string) {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      // Update URL hash
      window.history.replaceState(null, '', `#${id}`);
    }
  }

  shareOnTwitter() {
    const post = this.post();
    if (!post) return;

    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this article: "${post.title}"`);
    const twitterUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;

    window.open(twitterUrl, '_blank', 'width=600,height=400');
  }

  shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;

    window.open(linkedInUrl, '_blank', 'width=600,height=400');
  }

  async copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      this.linkCopied.set(true);

      // Reset after 2 seconds
      setTimeout(() => {
        this.linkCopied.set(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);

      this.linkCopied.set(true);
      setTimeout(() => {
        this.linkCopied.set(false);
      }, 2000);
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  getImageUrl(fileId: string, params?: any): string {
    return this.directusService.getImageUrl(fileId, params);
  }
}
