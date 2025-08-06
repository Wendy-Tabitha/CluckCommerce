import Image from 'next/image';
import Link from 'next/link';

import { getFeaturedProducts } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { LiveStats } from '@/components/live-stats';

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="flex flex-col gap-12 md:gap-16 lg:gap-20">
      <section className="relative h-[50vh] min-h-[300px] w-full">
        <Image
          src="https://placehold.co/1600x800.png"
          alt="A vibrant chicken farm"
          fill
          className="object-cover"
          priority
          data-ai-hint="chicken farm"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 text-center text-primary-foreground p-4">
          <h1 className="text-4xl font-headline font-bold tracking-tight md:text-5xl lg:text-6xl">
            Cluck Commerce
          </h1>
          <p className="max-w-2xl text-lg md:text-xl font-medium">
            “From Coop to Kitchen — Fresh, Local, and Delivered with Care.”
          </p>
          <Button asChild size="lg" className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/products">Shop All Products</Link>
          </Button>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-headline font-bold">
              Today's Farm Report
            </h2>
            <p className="text-muted-foreground">
              See what's happening on the farm right now.
            </p>
          </div>
          <LiveStats />
        </section>

        <section className="mt-16 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-headline font-bold">
              Featured Products
            </h2>
            <p className="text-muted-foreground">
              Our best-sellers, fresh from the farm.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
