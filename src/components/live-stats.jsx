'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EggIcon } from '@/components/icons/EggIcon';
import { ChickenIcon } from '@/components/icons/ChickenIcon';

export function LiveStats() {
  const [eggsLaid, setEggsLaid] = useState(0);
  const [chickensSold, setChickensSold] = useState(0);

  useEffect(() => {
    // Initial values set client-side to prevent hydration mismatch
    setEggsLaid(Math.floor(Math.random() * 100) + 50);
    setChickensSold(Math.floor(Math.random() * 20) + 10);

    const eggInterval = setInterval(() => {
      setEggsLaid((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 3500); // every 3.5 seconds

    const chickenInterval = setInterval(() => {
      setChickensSold((prev) => prev + (Math.random() > 0.6 ? 1 : 0));
    }, 8000); // every 8 seconds on average

    return () => {
      clearInterval(eggInterval);
      clearInterval(chickenInterval);
    };
  }, []);

  if (eggsLaid === 0) {
    // Return a loading state or null to avoid showing 0 initially
    return null;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:gap-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Fresh Eggs Laid Today
          </CardTitle>
          <EggIcon className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{eggsLaid.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            Updated in real-time
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Chickens Sold Today
          </CardTitle>
          <ChickenIcon className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{chickensSold.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            Growing happy customers
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
