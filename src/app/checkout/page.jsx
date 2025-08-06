'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect } from 'react';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon, CreditCard, Truck } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  scheduling: z.enum(['delivery', 'pickup']),
  address: z.string().optional(),
  pickupDate: z.date({ required_error: 'A pickup date is required.' }),
  deliveryDate: z.date({ required_error: 'A delivery date is required.' }),
  paymentMethod: z.enum(['card', 'mpesa'], {
    required_error: 'You need to select a payment method.',
  }),
});

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      scheduling: 'delivery',
      address: '',
      paymentMethod: 'card',
    },
  });

  // Handle empty cart redirect
  useEffect(() => {
    if (cartItems.length === 0 && typeof window !== 'undefined') {
      router.replace('/products');
    }
  }, [cartItems.length, router]);

  const onSubmit = (data) => {
    console.log('Order placed:', data, cartItems);
    
    // Simulate payment processing
    toast({
        title: "Processing payment...",
        description: "Your order is being finalized."
    });

    setTimeout(() => {
        const orderId = Math.random().toString(36).substr(2, 9);
        // In a real app, you would save the order to a database
        // and redirect to a proper order confirmation page.
        // For this demo, we'll just show a success message and clear the cart.
        clearCart();
        toast({
            title: "Order Placed Successfully!",
            description: `Your order #${orderId} has been confirmed.`,
            variant: "default",
        });
        router.push(`/order-confirmation/${orderId}`);
    }, 2000);
  };

  const schedulingType = form.watch('scheduling');

  // Don't render if cart is empty
  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold font-headline mb-6 text-center">Checkout</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <FormField name="name" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} value={field.value || ''} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="email" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} value={field.value || ''} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="phone" control={form.control} render={({ field }) => (
                  <FormItem className="sm:col-span-2"><FormLabel>Phone Number</FormLabel><FormControl><Input type="tel" {...field} value={field.value || ''} /></FormControl><FormMessage /></FormItem>
                )} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Scheduling</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={schedulingType} onValueChange={(value) => form.setValue('scheduling', value)} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="delivery">Delivery</TabsTrigger>
                    <TabsTrigger value="pickup">Pickup</TabsTrigger>
                  </TabsList>
                  <TabsContent value="delivery" className="mt-3">
                    <FormField name="address" control={form.control} render={({ field }) => (
                      <FormItem className="mb-3"><FormLabel>Delivery Address</FormLabel><FormControl><Input {...field} value={field.value || ''} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField name="deliveryDate" control={form.control} render={({ field }) => (
                      <FormItem className="flex flex-col"><FormLabel>Delivery Date</FormLabel>
                        <Popover><PopoverTrigger asChild><FormControl><Button variant="outline" className={cn('w-[240px] pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></FormControl></PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))} /></PopoverContent>
                        </Popover><FormMessage />
                      </FormItem>
                    )} />
                  </TabsContent>
                  <TabsContent value="pickup" className="mt-3">
                    <p className="text-sm text-muted-foreground mb-3">Pickup Address: 123 Farm Road, Clucksville, CK 54321</p>
                    <FormField name="pickupDate" control={form.control} render={({ field }) => (
                      <FormItem className="flex flex-col"><FormLabel>Pickup Date</FormLabel>
                        <Popover><PopoverTrigger asChild><FormControl><Button variant="outline" className={cn('w-[240px] pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></FormControl></PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))} /></PopoverContent>
                        </Popover><FormMessage />
                      </FormItem>
                    )} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField name="paymentMethod" control={form.control} render={({ field }) => (
                  <FormItem className="space-y-3"><FormLabel>Select Payment Method</FormLabel>
                    <FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl><RadioGroupItem value="card" /></FormControl><FormLabel className="font-normal flex items-center gap-2"><CreditCard className="h-5 w-5"/> Credit Card</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl><RadioGroupItem value="mpesa" /></FormControl><FormLabel className="font-normal flex items-center gap-2"><Truck className="h-5 w-5"/> M-PESA (Pay on Delivery)</FormLabel>
                      </FormItem>
                    </RadioGroup></FormControl><FormMessage />
                  </FormItem>
                )} />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {cartItems.map(item => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.product.name} x {item.quantity}</span>
                    <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-lg pt-3 border-t">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
            <Button type="submit" size="lg" className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
              {form.formState.isSubmitting ? 'Placing Order...' : `Place Order ($${cartTotal.toFixed(2)})`}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
