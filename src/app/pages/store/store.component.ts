// pages/store/store.component.ts
import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  DigitalAsset,
  DirectusService,
} from '../../shared/services/directus.service';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './store.component.html',
  styles: [
    `
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    `,
  ],
})
export class StoreComponent implements OnInit {
  // Using signals for state management
  digitalAssets = signal<DigitalAsset[]>([]);
  featuredAssets = signal<DigitalAsset[]>([]);
  filteredAssets = signal<DigitalAsset[]>([]);
  loading = signal(true);
  selectedCategory = signal('');
  sortBy = signal('newest');

  private directusService = inject(DirectusService);

  ngOnInit() {
    this.loadFeaturedAssets();
    this.loadDigitalAssets();
  }

  loadFeaturedAssets() {
    this.directusService.getFeaturedDigitalAssets(6).subscribe({
      next: (assets) => {
        this.featuredAssets.set(assets);
      },
      error: (error) => {
        console.error('Error loading featured assets:', error);
      },
    });
  }

  loadDigitalAssets() {
    this.loading.set(true);
    this.directusService.getDigitalAssets(50).subscribe({
      next: (assets) => {
        this.digitalAssets.set(assets);
        this.applyFilters();
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading digital assets:', error);
        this.loading.set(false);
        // Fallback to mock data for development
        this.loadMockData();
      },
    });
  }

  filterByCategory(category: string) {
    this.selectedCategory.set(category);
    this.applyFilters();
  }

  onSortChange(event: any) {
    this.sortBy.set(event.target.value);
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.digitalAssets()];

    // Filter by category
    if (this.selectedCategory()) {
      filtered = filtered.filter(
        (asset) => asset.category === this.selectedCategory()
      );
    }

    // Sort
    switch (this.sortBy()) {
      case 'newest':
        filtered.sort(
          (a, b) =>
            new Date(b.date_created).getTime() -
            new Date(a.date_created).getTime()
        );
        break;
      case 'oldest':
        filtered.sort(
          (a, b) =>
            new Date(a.date_created).getTime() -
            new Date(b.date_created).getTime()
        );
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    this.filteredAssets.set(filtered);
  }

  getCategoryDisplayName(category: string): string {
    const categoryMap: { [key: string]: string } = {
      templates: 'Templates',
      'ui-kits': 'UI Kits',
      icons: 'Icons',
      courses: 'Courses',
    };
    return categoryMap[category] || category;
  }

  private loadMockData() {
    // Mock data for development/testing
    this.digitalAssets.set([
      {
        id: '1',
        title: 'Angular Dashboard Template',
        slug: 'angular-dashboard-template',
        description:
          'Modern, responsive dashboard template built with Angular and Tailwind CSS',
        price: 49,
        featured_image: '',
        download_url: '',
        file_type: 'ZIP',
        file_size: '2.5 MB',
        category: 'templates',
        tags: ['Angular', 'Dashboard', 'Template'],
        featured: true,
        date_created: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Premium Icon Pack',
        slug: 'premium-icon-pack',
        description:
          '200+ high-quality SVG icons for web and mobile applications',
        price: 19,
        featured_image: '',
        download_url: '',
        file_type: 'SVG',
        file_size: '1.2 MB',
        category: 'icons',
        tags: ['Icons', 'SVG', 'UI'],
        featured: false,
        date_created: new Date(Date.now() - 86400000).toISOString(),
      },
    ]);
    this.applyFilters();
    this.loading.set(false);
  }
}
