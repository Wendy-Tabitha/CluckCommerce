'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProductById } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { AddToCartButton } from '@/components/add-to-cart-button';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus } from 'lucide-react';

export default function ProductDetailPage({ params }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  const increment = () => setQuantity((q) => Math.min(q + 1, product.stock));
  const decrement = () => setQuantity((q) => Math.max(1, q - 1));

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
               data-ai-hint={product.type === 'eggs' ? 'carton eggs' : product.type === 'alive-chicken' ? 'live chicken' : 'raw chicken meat'}
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square w-20 overflow-hidden rounded-md border-2 ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <Image src={img} alt={`${product.name} thumbnail ${index + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold font-headline lg:text-4xl">{product.name}</h1>
            <p className="text-2xl font-semibold text-primary">${product.price.toFixed(2)}</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{product.type.replace('-', ' ')}</Badge>
              {product.freshness && <Badge variant="secondary">Freshness: {product.freshness}</Badge>}
              {product.weight && <Badge variant="secondary">Weight: {product.weight} kg</Badge>}
              {product.quantity && <Badge variant="secondary">{product.quantity} pack</Badge>}
            </div>
          </div>
          
          <p className="text-muted-foreground leading-relaxed">{product.longDescription}</p>

          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4">
              <p className="font-medium">Quantity:</p>
              <div className="flex items-center rounded-md border">
                <Button variant="ghost" size="icon" onClick={decrement} className="h-9 w-9">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center font-medium">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={increment} className="h-9 w-9">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <AddToCartButton 
              product={product} 
              quantity={quantity} 
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 sm:w-auto"
            >
              Add {quantity} to Cart
            </AddToCartButton>

            <p className="text-sm text-muted-foreground">
              {product.stock} available in stock.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
