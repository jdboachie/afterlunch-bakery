import { Component, inject } from '@angular/core';
import { Logging } from '../../services/logging';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.html',
})
export class NotFound {
  private readonly logger = inject(Logging);

  public ngOnInit() {
    this.logger.reportError('User hit a 404 page');
  }
}
