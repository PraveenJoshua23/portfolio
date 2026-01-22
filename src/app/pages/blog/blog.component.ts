// pages/blog/blog.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  DirectusService,
  BlogPost,
} from '../../shared/services/directus.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="bg-white">
      <!-- Header -->
      <section class="py-32 container mx-auto px-6">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 tracking-tight">
            Blog & Insights
          </h1>
          <p class="text-xl text-neutral-600 font-light leading-relaxed">
            Thoughts on technology, design, development, and the intersection of
            creativity and code. Sharing knowledge and experiences from my
            journey in software engineering.
          </p>
        </div>
      </section>

      <!-- Featured Posts -->
      <section *ngIf="featuredPosts.length > 0" class="container mx-auto px-6 mb-32">
        <h2 class="text-2xl font-bold text-neutral-900 mb-10 tracking-tight">Featured Posts</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            *ngFor="let post of featuredPosts"
            class="group cursor-pointer flex flex-col h-full"
          >
            <!-- Image Container -->
            <div class="relative overflow-hidden rounded-2xl bg-neutral-100 aspect-video mb-6 border border-neutral-200 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1">
              <img
                *ngIf="post.featured_image; else placeholderImage"
                [src]="getImageUrl(post.featured_image)"
                [alt]="post.title"
                class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              <ng-template #placeholderImage>
                <div class="w-full h-full flex items-center justify-center bg-neutral-50">
                  <span class="text-4xl">📝</span>
                </div>
              </ng-template>
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </div>

            <!-- Content -->
            <div class="space-y-3 flex-1 flex flex-col">
              <div class="flex items-center text-sm text-neutral-500 font-medium space-x-2">
                 <time [dateTime]="post.date_created">{{ formatDate(post.date_created) }}</time>
                 <span *ngIf="post.reading_time">•</span>
                 <span *ngIf="post.reading_time">{{ post.reading_time }} min read</span>
              </div>
              
              <h3 class="text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                <a [routerLink]="['/blog', post.slug]">
                  {{ post.title }}
                </a>
              </h3>
              
              <p class="text-neutral-600 leading-relaxed line-clamp-3 mb-4 flex-1">
                {{ post.excerpt }}
              </p>

              <div class="flex flex-wrap gap-2 mt-auto">
                <span
                  *ngFor="let tag of post.tags?.slice(0, 2)"
                  class="px-3 py-1 bg-white border border-neutral-200 text-neutral-600 rounded-full text-xs font-medium tracking-wide"
                >
                  {{ tag.label }}
                </span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- All Posts -->
      <section class="container mx-auto px-6 mb-32">
        <div class="flex items-center justify-between mb-12">
          <h2 class="text-2xl font-bold text-neutral-900 tracking-tight">All Posts</h2>
          <div class="relative">
            <select
              (change)="onCategoryFilter($event)"
              class="appearance-none bg-white border border-neutral-200 text-neutral-700 py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent cursor-pointer"
            >
              <option value="">All Categories</option>
              <option value="development">Development</option>
              <option value="design">Design</option>
              <option value="analytics">Analytics</option>
              <option value="career">Career</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-500">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        <div *ngIf="loading" class="text-center py-20">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>

        <div *ngIf="!loading && blogPosts.length === 0" class="text-center py-20">
          <div class="text-6xl mb-4">📝</div>
          <h3 class="text-xl font-bold text-neutral-900 mb-2">No posts yet</h3>
          <p class="text-neutral-600">Stay tuned for upcoming content!</p>
        </div>

        <div *ngIf="!loading && blogPosts.length > 0" class="space-y-12">
          <article
            *ngFor="let post of blogPosts"
            class="group bg-white rounded-2xl border border-neutral-100 hover:border-neutral-200 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div class="md:flex gap-8 items-start">
              <div class="md:w-1/3 mb-6 md:mb-0">
                <div class="relative overflow-hidden rounded-xl bg-neutral-100 aspect-video">
                  <img
                    *ngIf="post.featured_image; else placeholderImage"
                    [src]="getImageUrl(post.featured_image)"
                    [alt]="post.title"
                    class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <ng-template #placeholderImage>
                    <div class="w-full h-full flex items-center justify-center bg-neutral-50">
                      <span class="text-4xl">📝</span>
                    </div>
                  </ng-template>
                </div>
              </div>
              
              <div class="md:w-2/3">
                <div class="flex items-center text-sm text-neutral-500 font-medium mb-3 space-x-3">
                  <time [dateTime]="post.date_created">{{ formatDate(post.date_created) }}</time>
                  <span *ngIf="post.reading_time" class="w-1 h-1 bg-neutral-300 rounded-full"></span>
                  <span *ngIf="post.reading_time">{{ post.reading_time }} min read</span>
                </div>

                <h3 class="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                  <a [routerLink]="['/blog', post.slug]">{{ post.title }}</a>
                </h3>
                
                <p class="text-neutral-600 leading-relaxed mb-6 line-clamp-2">
                  {{ post.excerpt }}
                </p>

                <div class="flex items-center justify-between">
                  <div class="flex flex-wrap gap-2">
                    <span
                      *ngFor="let tag of post.tags?.slice(0, 3)"
                      class="px-3 py-1 bg-neutral-50 border border-neutral-100 text-neutral-600 rounded-full text-xs font-medium tracking-wide"
                    >
                      {{ tag.label }}
                    </span>
                  </div>
                  
                  <a
                    [routerLink]="['/blog', post.slug]"
                    class="inline-flex items-center gap-2 text-neutral-900 font-medium hover:text-primary-600 transition-colors group/link"
                  >
                    Read Article
                    <svg class="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div *ngIf="!loading && blogPosts.length > 0 && hasMore" class="text-center mt-16">
          <button
            (click)="loadMore()"
            [disabled]="loadingMore"
            class="px-8 py-3 bg-white border border-neutral-200 text-neutral-900 rounded-full font-medium hover:bg-neutral-50 hover:border-neutral-300 transition-all disabled:opacity-50"
          >
            <span *ngIf="!loadingMore">Load More Posts</span>
            <span *ngIf="loadingMore">Loading...</span>
          </button>
        </div>
      </section>

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
    `,
  ],
})
export class BlogComponent implements OnInit {
  blogPosts: BlogPost[] = [];
  featuredPosts: BlogPost[] = [];
  loading = true;
  loadingMore = false;
  hasMore = true;
  currentPage = 0;
  pageSize = 6;

  constructor(private directusService: DirectusService) {}

  ngOnInit() {
    this.loadFeaturedPosts();
    this.loadBlogPosts();
  }

  loadFeaturedPosts() {
    this.directusService.getFeaturedBlogPosts(3).subscribe({
      next: (posts) => {
        this.featuredPosts = posts;
      },
      error: (error) => {
        console.error('Error loading featured posts:', error);
      },
    });
  }

  loadBlogPosts() {
    this.loading = true;
    this.directusService
      .getBlogPosts(this.pageSize, this.currentPage * this.pageSize)
      .subscribe({
        next: (posts) => {
          this.blogPosts = posts;
          this.hasMore = posts.length === this.pageSize;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading blog posts:', error);
          this.loading = false;
          // Fallback to mock data for development
          this.loadMockData();
        },
      });
  }

  loadMore() {
    if (this.loadingMore || !this.hasMore) return;

    this.loadingMore = true;
    this.currentPage++;

    this.directusService
      .getBlogPosts(this.pageSize, this.currentPage * this.pageSize)
      .subscribe({
        next: (posts) => {
          console.log('Loaded posts:', posts);
          this.blogPosts = [...this.blogPosts, ...posts];
          this.hasMore = posts.length === this.pageSize;
          this.loadingMore = false;
        },
        error: (error) => {
          console.error('Error loading more posts:', error);
          this.loadingMore = false;
          this.currentPage--;
        },
      });
  }

  onCategoryFilter(event: any) {
    const category = event.target.value;
    // Implement category filtering logic here
    console.log('Filter by category:', category);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  private loadMockData() {
    // Mock data for development/testing
    this.blogPosts = [
      {
        id: '1',
        title: 'Building Scalable Angular Applications',
        status: 'published',
        slug: 'building-scalable-angular-applications',
        content: '',
        excerpt:
          'Learn best practices for structuring and scaling Angular applications for enterprise-level projects.',
        featured_image: '',
        date_created: new Date().toISOString(),
        date_updated: new Date().toISOString(),
        created_by: 'Praveen Joshua',
        tags: [
          { label: 'Angular' },
          { label: 'TypeScript' },
          { label: 'Architecture' },
        ],
        reading_time: 8,
      },
      {
        id: '2',
        title: 'The Future of Web Development',
        status: 'published',
        slug: 'future-of-web-development',
        content: '',
        excerpt:
          'Exploring emerging trends and technologies that are shaping the future of web development.',
        featured_image: '',
        date_created: new Date(Date.now() - 86400000).toISOString(),
        date_updated: new Date(Date.now() - 86400000).toISOString(),
        created_by: 'Praveen Joshua',
        tags: [
          { label: 'Web Development' },
          { label: 'Trends' },
          { label: 'Technology' },
        ],
        reading_time: 6,
      },
    ];
    this.loading = false;
  }

  getImageUrl(fileId: string, params?: any): string {
    return this.directusService.getImageUrl(fileId, params);
  }
}
