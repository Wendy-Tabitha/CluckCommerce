import Image from 'next/image';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AddToCartButton } from '@/components/add-to-cart-button';
import { EggIcon } from './icons/EggIcon';
import { ChickenIcon } from './icons/ChickenIcon';

const productIconMap = {
  eggs: <EggIcon className="h-4 w-4 text-muted-foreground" />,
  'alive-chicken': <ChickenIcon className="h-4 w-4 text-muted-foreground" />,
  'slaughtered-meat': <ChickenIcon className="h-4 w-4 text-muted-foreground" />,
};

export function ProductCard({ product }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} className="block">
          <div className="relative aspect-video w-full">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={product.type === 'eggs' ? 'carton eggs' : product.type === 'alive-chicken' ? 'live chicken' : 'raw chicken meat'}
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg leading-tight">
            <Link href={`/products/${product.id}`}>{product.name}</Link>
            </CardTitle>
            <div className="text-lg font-bold text-primary">${product.price.toFixed(2)}</div>
        </div>
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            {productIconMap[product.type]}
            <span>
                {product.type === 'eggs' && `${product.quantity} pack`}
                {product.type === 'slaughtered-meat' && `${product.weight} kg`}
                {product.type === 'alive-chicken' && 'Live Animal'}
            </span>
        </div>
        <CardDescription className="mt-2 line-clamp-3 text-sm">
          {product.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <AddToCartButton product={product} className="w-full bg-accent text-accent-foreground hover:bg-accent/90" />
      </CardFooter>
    </Card>
  );
}
