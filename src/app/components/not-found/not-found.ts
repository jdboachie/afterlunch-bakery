import { Component, OnInit, inject } from '@angular/core';
import { Logging } from '../../services/logging';

@Component({
  selector: 'app-not-found',
  template: ` <div class="flex justify-center items-center min-h-[calc(100dvh-200px)]">
    <p class="text-sm divide-x">
      <span class="px-4">404</span>
      <span class="px-4">Page Not Found</span>
    </p>
  </div>`,
})
export class NotFound {
  private readonly logging = inject(Logging);

  ngOnInit() {
    this.logging.reportError('User hit a 404 page');
  }
}
