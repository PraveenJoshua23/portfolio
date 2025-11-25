// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  //   {
  //     path: 'about',
  //     loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
  //   },
  //   {
  //     path: 'projects',
  //     loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent)
  //   },
  //   {
  //     path: 'projects/:slug',
  //     loadComponent: () => import('./pages/project-detail/project-detail.component').then(m => m.ProjectDetailComponent)
  //   },
  {
    path: 'blog',
    loadComponent: () =>
      import('./pages/blog/blog.component').then((m) => m.BlogComponent),
  },
  {
    path: 'blog/:slug',
    loadComponent: () =>
      import('./pages/blog/blog-post.component').then(
        (m) => m.BlogPostComponent
      ),
  },
  {
    path: 'store',
    loadComponent: () =>
      import('./pages/store/store.component').then((m) => m.StoreComponent),
  },
  //   {
  //     path: 'store/:slug',
  //     loadComponent: () =>
  //       import('./pages/asset-detail/asset-detail.component').then(
  //         (m) => m.AssetDetailComponent
  //       ),
  //   },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then(
        (m) => m.ContactComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
