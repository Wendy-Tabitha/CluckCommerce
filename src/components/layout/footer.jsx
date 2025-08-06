import Link from 'next/link';
import { ChickenIcon } from '@/components/icons/ChickenIcon';

export function Footer() {
  return (
    <footer className="mt-auto border-t">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
        <div className="flex items-center gap-2">
          <ChickenIcon className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg font-bold">
            Cluck Commerce
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          “From Coop to Kitchen — Fresh, Local, and Delivered with Care.”
        </p>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Cluck Commerce. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
