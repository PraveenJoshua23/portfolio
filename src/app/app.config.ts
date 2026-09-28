import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Scrolling itself is done by Lenis in AppComponent; this only makes the router emit Scroll events.
    provideRouter(
      routes,
      withInMemoryScrolling(),
      withRouterConfig({ onSameUrlNavigation: 'reload' }),
    ),
    provideClientHydration(),
  ],
};
