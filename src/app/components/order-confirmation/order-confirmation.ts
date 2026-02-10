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
  @Input() public items!: CartItem[];
  @Input() public totalPrice!: number;
  @Output() public startNewOrder = new EventEmitter<void>();

  public handleStartNewOrder() {
    this.startNewOrder.emit();
  }
}
