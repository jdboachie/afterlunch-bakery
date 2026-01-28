import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideNgIconsConfig } from '@ng-icons/core';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes),
    provideNgIconsConfig({
      size: '1.5em',
      strokeWidth: '2',
      color: 'currentColor',
    }),
  ],
};
