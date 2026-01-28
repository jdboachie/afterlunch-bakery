import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.html',
  styleUrl: './order-confirmation.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe],
})
export class OrderConfirmation {
  items = input.required<CartItem[]>();
  totalPrice = input.required<number>();
  startNewOrder = output<void>();

  handleStartNewOrder() {
    this.startNewOrder.emit();
  }
}
