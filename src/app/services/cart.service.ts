import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject } from 'rxjs';
import { Food } from '../shared/models/Food';
import { CartItem } from '../shared/models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Cart = new Cart()
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart)
  constructor() { }
  addToCart(food: Food): void {
    let cartItem = this.cart.items.find(item => item.food.id === food.id)
    if (cartItem) return
    this.cart.items.push(new CartItem(food))
  }
  removeFromCart(foodId: string): void {
    this.cart.items = this.cart.items.filter((item) => item.food.id != foodId)
  }
  changeQuantity(foodId: string, quantity: number) {
    let cartItem = this.cart.items.find(item => item.food.id === foodId)
    if (!cartItem) return
    cartItem.quantity = quantity
    cartItem.price = quantity * cartItem.food.price
  }
  clearCart() {
    this.cart = new Cart()
  }
  getCartObesrvable() {
    return this.cartSubject.asObservable()
    //ako nebude kao as observable mocice da se pristupa njemu kao objektu 
  }
  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items.reduce((a, b) => a + b.price, 0)
    const cartJson = JSON.stringify(this.cart)
    localStorage.setItem("Cart", cartJson)
  }
}
