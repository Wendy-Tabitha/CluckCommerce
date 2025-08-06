'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';

export default function CartPage() {
  const {
    cartItems,
    cartTotal,
    updateQuantity,
    removeFromCart,
    cartCount,
  } = useCart();

  if (cartCount === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground" />
        <h1 className="mt-4 text-3xl font-bold font-headline">Your Cart is Empty</h1>
        <p className="mt-2 text-muted-foreground">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Button asChild className="mt-6">
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold font-headline mb-6 text-center">Your Shopping Cart</h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-3">
          {cartItems.map((item) => (
            <CartItemRow key={item.product.id} item={item} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
          ))}
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal ({cartCount} items)</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-sm text-muted-foreground">Calculated at checkout</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild size="lg" className="w-full">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}


function CartItemRow({ item, updateQuantity, removeFromCart }) {
  return (
    <Card className="flex items-center p-3">
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
          <Image
            src={item.product.images[0]}
            alt={item.product.name}
            fill
            className="object-cover"
             data-ai-hint={item.product.type === 'eggs' ? 'carton eggs' : item.product.type === 'alive-chicken' ? 'live chicken' : 'raw chicken meat'}
          />
        </div>
        <div className="ml-3 flex-1 min-w-0">
          <Link href={`/products/${item.product.id}`} className="font-medium hover:underline text-sm">
            {item.product.name}
          </Link>
          <p className="text-xs text-muted-foreground">${item.product.price.toFixed(2)}</p>
        </div>
        <div className="flex items-center gap-2">
            <div className="flex items-center rounded-md border">
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                    <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                    <Plus className="h-3 w-3" />
                </Button>
            </div>
            <p className="w-16 text-right font-medium text-sm">${(item.product.price * item.quantity).toFixed(2)}</p>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFromCart(item.product.id)}>
                <Trash2 className="h-3 w-3 text-destructive" />
            </Button>
        </div>
    </Card>
  )
}
