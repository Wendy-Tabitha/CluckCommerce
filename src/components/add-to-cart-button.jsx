'use client';

import { ShoppingCart } from 'lucide-react';

import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

export function AddToCartButton({
  product,
  quantity = 1,
  showIcon = true,
  className,
  children,
}) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`,
      variant: "default",
    });
  };

  return (
    <Button onClick={handleAddToCart} className={className}>
      {showIcon && <ShoppingCart className="mr-2 h-4 w-4" />}
      {children || 'Add to Cart'}
    </Button>
  );
}
