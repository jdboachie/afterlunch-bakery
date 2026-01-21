import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderNavigation } from './components/header-navigation/header-navigation';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderNavigation],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('afterlunch-bakery');

  cart: Cart | undefined = undefined;
}
