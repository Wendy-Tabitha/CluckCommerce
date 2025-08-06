'use client';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OrderConfirmationPage({
  params,
}) {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="w-fit mx-auto bg-green-100 dark:bg-green-900/50 p-3 rounded-full">
            <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-3xl font-headline mt-4">Thank You for Your Order!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            Your order has been placed successfully. A confirmation has been sent to your email.
          </p>
          <p className="font-semibold text-lg my-4">
            Order ID: <span className="font-mono text-primary">{params.id}</span>
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild>
                <Link href="/products">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild>
                <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
