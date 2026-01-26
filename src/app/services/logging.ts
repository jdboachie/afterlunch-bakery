import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Logging {
  reportError(msg: string): void {
    console.error(`[Error] ${msg}`);
  }
}
