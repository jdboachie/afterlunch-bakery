import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Logging {
  public reportError(msg: string): void {
    console.error(`[Error] ${msg}`);
  }
}
