'use client';
import { useState, useMemo } from 'react';
import { getAllProducts } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const allProducts = getAllProducts();

export default function ProductsPage() {
  const [filters, setFilters] = useState({
    type: 'all',
    freshness: 'all',
    maxWeight: 5,
  });

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const typeMatch =
        filters.type === 'all' || product.type === filters.type;
      const freshnessMatch =
        filters.freshness === 'all' || product.freshness === filters.freshness;
      const weightMatch =
        product.type !== 'slaughtered-meat' ||
        !product.weight ||
        product.weight <= filters.maxWeight;
      return typeMatch && freshnessMatch && weightMatch;
    });
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  
  const resetFilters = () => {
    setFilters({
      type: 'all',
      freshness: 'all',
      maxWeight: 5,
    });
  };

  const FiltersComponent = () => (
     <aside className="flex flex-col gap-6">
            <div>
              <Label htmlFor="type-filter">Product Type</Label>
              <Select
                value={filters.type}
                onValueChange={(value) => handleFilterChange('type', value)}
              >
                <SelectTrigger id="type-filter">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="eggs">Eggs</SelectItem>
                  <SelectItem value="slaughtered-meat">Slaughtered Meat</SelectItem>
                  <SelectItem value="alive-chicken">Alive Chicken</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {filters.type === 'eggs' || filters.type === 'all' ? (
                <div>
                <Label htmlFor="freshness-filter">Egg Freshness</Label>
                <Select
                    value={filters.freshness}
                    onValueChange={(value) => handleFilterChange('freshness', value)}
                    disabled={filters.type !== 'eggs' && filters.type !== 'all'}
                >
                    <SelectTrigger id="freshness-filter">
                    <SelectValue placeholder="Filter by freshness" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="all">Any Freshness</SelectItem>
                    <SelectItem value="today">Laid Today</SelectItem>
                    <SelectItem value="yesterday">Laid Yesterday</SelectItem>
                    <SelectItem value="2-days-ago">2+ Days Ago</SelectItem>
                    </SelectContent>
                </Select>
                </div>
            ) : null}

            {filters.type === 'slaughtered-meat' || filters.type === 'all' ? (
                <div className="space-y-4">
                <div className="flex justify-between">
                    <Label htmlFor="weight-filter">Max Weight (kg)</Label>
                    <span className="text-sm text-muted-foreground">{filters.maxWeight.toFixed(1)} kg</span>
                </div>
                <Slider
                    id="weight-filter"
                    min={0.5}
                    max={5}
                    step={0.1}
                    value={[filters.maxWeight]}
                    onValueChange={([value]) => handleFilterChange('maxWeight', value)}
                    disabled={filters.type !== 'slaughtered-meat' && filters.type !== 'all'}
                />
                </div>
            ) : null}
            <Button variant="outline" onClick={resetFilters}>Reset Filters</Button>
          </aside>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold font-headline">Our Products</h1>
        <p className="text-muted-foreground">
          Browse our selection of farm-fresh goods.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="hidden md:block md:col-span-1">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <FiltersComponent />
        </div>
        
        <div className="md:hidden mb-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filters</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Products</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <FiltersComponent />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <main className="md:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center bg-card p-8 rounded-lg">
              <h3 className="text-xl font-semibold">No Products Found</h3>
              <p className="text-muted-foreground mt-2">
                Try adjusting your filters to find what you're looking for.
              </p>
              <Button onClick={resetFilters} className="mt-4">Clear Filters</Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
