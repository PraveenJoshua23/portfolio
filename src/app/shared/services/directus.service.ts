// services/directus.service.ts
import { Injectable } from '@angular/core';
import { createDirectus, rest, readItems, readItem } from '@directus/sdk';
import { Observable, from } from 'rxjs';
import { environment } from '../../environments/environments';

export interface BlogPost {
  id: string;
  title: string;
  status: 'published' | 'draft' | 'archived';
  slug: string;
  content: string;
  excerpt: string;
  featured_image?: string;
  date_created: string;
  date_updated: string;
  created_by: string;
  reading_time?: number;
  tags: Tag[];
}

export interface Tag {
  label: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  long_description: string;
  featured_image?: string;
  gallery?: string[];
  technologies: string[];
  project_url?: string;
  github_url?: string;
  status: 'completed' | 'in_progress' | 'concept';
  featured: boolean;
  date_created: string;
  date_updated: string;
}

export interface DigitalAsset {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  featured_image?: string;
  download_url?: string;
  file_type: string;
  file_size?: string;
  category: string;
  tags?: string[];
  featured: boolean;
  date_created: string;
}

@Injectable({
  providedIn: 'root',
})
export class DirectusService {
  private client;
  baseUrl: string;

  constructor() {
    this.baseUrl = environment.baseUrl;
    // Replace with your Directus instance URL
    this.client = createDirectus(
      'https://directus-production-d7f4.up.railway.app'
    ).with(rest());
  }

  // Blog Methods
  getBlogPosts(limit: number = 10, offset: number = 0): Observable<BlogPost[]> {
    //@ts-ignore
    return from(
      this.client.request(
        readItems('blog_posts', {
          filter: {
            status: { _eq: 'published' },
          },
          sort: ['-date_created'],
          limit,
          offset,
          fields: [
            'title',
            'slug',
            'excerpt',
            'status',
            'content',
            'featured_image',
            'date_created',
            'created_by',
            'tags',
          ],
        })
      )
    );
  }

  getFeaturedBlogPosts(limit: number = 3): Observable<BlogPost[]> {
    //@ts-ignore
    return from(
      this.client.request(
        readItems('blog_posts', {
          filter: {
            status: { _eq: 'published' },
          },
          sort: ['-date_created'],
          limit,
          fields: [
            'title',
            'slug',
            'excerpt',
            'status',
            'content',
            'featured_image',
            'date_created',
            'created_by',
            'tags',
          ],
        })
      )
    );
  }

  getBlogPost(slug: string): Observable<BlogPost> {
    //@ts-ignore
    return from(
      this.client
        .request(
          readItems('blog_posts', {
            filter: {
              slug: { _eq: slug },
              status: { _eq: 'published' },
            },
            limit: 1,
          })
        )
        .then((posts) => posts[0])
    );
  }

  getImageUrl(fileId: string, params?: any): string {
    const baseImageUrl = `${this.baseUrl}/assets/${fileId}`;

    if (params) {
      const searchParams = new URLSearchParams(params);
      return `${baseImageUrl}?${searchParams.toString()}`;
    }
    console.log(baseImageUrl);
    return baseImageUrl;
  }

  // Project Methods
  getProjects(limit: number = 10, offset: number = 0): Observable<Project[]> {
    //@ts-ignore
    return from(
      this.client.request(
        readItems('projects', {
          sort: ['-date_created'],
          limit,
          offset,
          fields: [
            'id',
            'title',
            'slug',
            'description',
            'featured_image',
            'technologies',
            'project_url',
            'github_url',
            'status',
            'featured',
            'date_created',
          ],
        })
      )
    );
  }

  getFeaturedProjects(limit: number = 6): Observable<Project[]> {
    //@ts-ignore
    return from(
      this.client.request(
        readItems('projects', {
          filter: {
            featured: { _eq: true },
          },
          sort: ['-date_created'],
          limit,
          fields: [
            'id',
            'title',
            'slug',
            'description',
            'featured_image',
            'technologies',
            'project_url',
            'github_url',
            'status',
            'date_created',
          ],
        })
      )
    );
  }

  getProject(slug: string): Observable<Project> {
    //@ts-ignore
    return from(
      this.client
        .request(
          readItems('projects', {
            filter: {
              slug: { _eq: slug },
            },
            limit: 1,
          })
        )
        .then((projects) => projects[0])
    );
  }

  // Digital Assets Methods
  getDigitalAssets(
    limit: number = 10,
    offset: number = 0
  ): Observable<DigitalAsset[]> {
    //@ts-ignore
    return from(
      this.client.request(
        readItems('digital_assets', {
          sort: ['-date_created'],
          limit,
          offset,
          fields: [
            'id',
            'title',
            'slug',
            'description',
            'price',
            'featured_image',
            'file_type',
            'file_size',
            'category',
            'tags',
            'featured',
            'date_created',
          ],
        })
      )
    );
  }

  getFeaturedDigitalAssets(limit: number = 6): Observable<DigitalAsset[]> {
    //@ts-ignore
    return from(
      this.client.request(
        readItems('digital_assets', {
          filter: {
            featured: { _eq: true },
          },
          sort: ['-date_created'],
          limit,
          fields: [
            'id',
            'title',
            'slug',
            'description',
            'price',
            'featured_image',
            'file_type',
            'category',
            'tags',
            'date_created',
          ],
        })
      )
    );
  }

  getDigitalAsset(slug: string): Observable<DigitalAsset> {
    //@ts-ignore
    return from(
      this.client
        .request(
          readItems('digital_assets', {
            filter: {
              slug: { _eq: slug },
            },
            limit: 1,
          })
        )
        .then((assets) => assets[0])
    );
  }

  getDigitalAssetsByCategory(
    category: string,
    limit: number = 10
  ): Observable<DigitalAsset[]> {
    //@ts-ignore
    return from(
      this.client.request(
        readItems('digital_assets', {
          filter: {
            category: { _eq: category },
          },
          sort: ['-date_created'],
          limit,
          fields: [
            'id',
            'title',
            'slug',
            'description',
            'price',
            'featured_image',
            'file_type',
            'category',
            'tags',
            'date_created',
          ],
        })
      )
    );
  }
}
