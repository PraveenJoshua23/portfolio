# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website built with Angular 18, featuring SSR (Server-Side Rendering), Tailwind CSS, and content management via Directus CMS. The site showcases projects, blog posts, and digital assets with modern UI/UX design patterns.

## Development Commands

### Development Server
```bash
npm start                    # Start dev server at http://localhost:4200
ng serve                     # Alternative start command
```

### Build
```bash
npm run build                # Production build (outputs to dist/)
ng build                     # Production build with SSR
ng build --watch --configuration development  # Development build with watch mode
```

### Testing
```bash
npm test                     # Run unit tests via Karma
ng test                      # Run tests with Angular CLI
```

### SSR Server
```bash
npm run serve:ssr:praveen-joshua-portfolio  # Run SSR server
```

### Firebase Deployment
```bash
firebase deploy              # Deploy to Firebase Hosting
```

Note: CI/CD is configured via GitHub Actions. Pushes to `main` branch automatically trigger builds and deployments to Firebase Hosting.

## Architecture

### Framework & Key Technologies
- **Angular 18** with standalone components architecture
- **TypeScript 5.5** with strict mode enabled
- **Tailwind CSS** for styling with custom design system
- **Angular SSR** (@angular/ssr) for server-side rendering
- **Directus CMS** as headless CMS for content management
- **Firebase Hosting** for deployment
- **RxJS** for reactive programming

### Application Structure

```
src/app/
├── pages/              # Feature pages (standalone components)
│   ├── home/          # Landing page with hero, projects, skills sections
│   ├── blog/          # Blog listing and individual post pages
│   ├── store/         # Digital assets store
│   └── contact/       # Contact form
├── shared/            # Shared modules and services
│   ├── header/        # Main navigation component
│   ├── footer/        # Footer component
│   └── services/      # Application services (DirectusService)
└── environments/      # Environment configurations
```

### Content Management (Directus)

The application uses Directus as a headless CMS. The `DirectusService` (src/app/shared/services/directus.service.ts) provides methods to interact with three main content collections:

1. **Blog Posts** (`blog_posts`)
   - Interface: `BlogPost` with fields for title, slug, content, excerpt, featured_image, tags, etc.
   - Methods: `getBlogPosts()`, `getFeaturedBlogPosts()`, `getBlogPost(slug)`

2. **Projects** (`projects`)
   - Interface: `Project` with fields for title, slug, description, technologies, URLs, status, etc.
   - Methods: `getProjects()`, `getFeaturedProjects()`, `getProject(slug)`

3. **Digital Assets** (`digital_assets`)
   - Interface: `DigitalAsset` with fields for title, price, category, file information, etc.
   - Methods: `getDigitalAssets()`, `getFeaturedDigitalAssets()`, `getDigitalAsset(slug)`

**Directus Instance:** `https://directus-production-d7f4.up.railway.app`

All Directus API calls use the `@directus/sdk` with the REST client. Image URLs are generated via `getImageUrl(fileId, params)`.

### Routing

The app uses lazy-loaded standalone components via the Angular Router (src/app/app.routes.ts):
- `/` → HomeComponent
- `/blog` → BlogComponent
- `/blog/:slug` → BlogPostComponent
- `/store` → StoreComponent
- `/contact` → ContactComponent

**Note:** Routes for About and Projects pages are commented out but planned for future implementation.

### Component Architecture

All components use the **standalone component** pattern (no NgModules). Components follow these patterns:

1. **Template-first approach**: Most components use inline templates rather than separate HTML files
2. **Component composition**: Pages compose shared components (header, footer) and feature-specific components
3. **Reactive data flow**: Components use RxJS observables for async data fetching from Directus

### Styling System

The project uses **Tailwind CSS** with extensive customization:

- **Custom Color Palette** (defined in tailwind.config.js):
  - `primary`: Purple shades for primary actions and highlights
  - `secondary`: Pink shades for accents
  - `neutral`: Gray shades for text and backgrounds

- **Custom Animations**:
  - `fade-in`, `slide-up`, `float`, `gradient` defined in tailwind.config.js
  - Used extensively for hover states and page transitions

- **Typography**: Custom font families (Raleway for sans, JetBrains Mono for code)
- **Plugin**: `@tailwindcss/typography` for rich text formatting

**Style Convention**: Use utility-first Tailwind classes directly in templates. Component-specific styles go in the inline `styles` array (SCSS).

### Server-Side Rendering (SSR)

The app is configured for SSR with prerendering enabled:
- Entry point: `server.ts`
- Browser entry: `src/main.ts`
- Server entry: `src/main.server.ts`
- Prerendering: Enabled in angular.json (`prerender: true`)

**Important:** When adding new features, ensure they're SSR-compatible (avoid direct DOM manipulation, use Angular's platform checks).

### Firebase Configuration

Firebase Hosting is configured to serve the SSR-built application:
- Public directory: `dist/praveen-joshua-portfolio/browser`
- Rewrites: All routes redirect to `/index.html` for SPA routing
- Cache headers: Aggressive caching for static assets (images, JS, CSS)

### TypeScript Configuration

The project uses **strict TypeScript mode**:
- `strict: true`
- `noImplicitReturns: true`
- `noFallthroughCasesInSwitch: true`
- `strictTemplates: true` (Angular-specific)

When writing code, ensure full type safety and avoid `@ts-ignore` comments unless absolutely necessary (e.g., Directus SDK type issues).

## Development Patterns

### Data Fetching
Components fetch data in `ngOnInit()` using DirectusService methods. Always handle both success and error cases:

```typescript
this.directusService.getBlogPosts().subscribe({
  next: (posts) => { /* handle success */ },
  error: (error) => {
    console.error('Error:', error);
    // Consider fallback or mock data for development
  }
});
```

### Image Loading
Use the `DirectusService.getImageUrl(fileId, params)` method to generate image URLs. Components implement loading states for images (see `imageLoaded` pattern in HomeComponent).

### Lazy Loading
All route-level components are lazy-loaded. Maintain this pattern for optimal performance.

## Planned Features (Currently Commented Out)

The following routes are commented out in app.routes.ts but may be implemented:
- `/about` → AboutComponent
- `/projects` → ProjectsComponent
- `/projects/:slug` → ProjectDetailComponent
- `/store/:slug` → AssetDetailComponent

## CI/CD Pipeline

GitHub Actions workflows (in .github/workflows/):
1. **firebase-hosting-merge.yml**: Deploys to production on push to `main`
2. **firebase-hosting-pull-request.yml**: Creates preview deployments for PRs

Build command in workflow: `npm ci && npm run build`

## Important Notes

- **Git Branch**: Main branch is `main` (not master)
- **Node Version**: Use Node 18+ (per package.json dependencies)
- **Environment**: The environment config is in src/app/environments/environments.ts (not in a separate environment folder structure)
- **Asset Directory**: Public assets go in the `public/` folder (not `src/assets/`)
- **Directus API**: All content is fetched from the Railway-hosted Directus instance - no local CMS setup required
