import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.html',
  styleUrls: ['./order-confirmation.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe],
})
export class OrderConfirmation {
  @Input() items!: CartItem[];
  @Input() totalPrice!: number;
  @Output() startNewOrder = new EventEmitter<void>();

  handleStartNewOrder() {
    this.startNewOrder.emit();
  }
}
