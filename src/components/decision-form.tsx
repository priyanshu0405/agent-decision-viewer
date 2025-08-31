'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { DecisionRequest } from '@/types/decision';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader } from '@/components/icons';
import { useDebouncedCallback } from '@/hooks/use-debounced-callback';

const formSchema = z.object({
  amount: z.coerce.number().positive({ message: 'Amount must be positive.' }),
  payee: z.string().min(2, { message: 'Payee must be at least 2 characters.' }),
  customerId: z.string().min(3, { message: 'Customer ID must be at least 3 characters.' }),
});

type DecisionFormProps = {
  onSubmit: (data: DecisionRequest) => void;
  isSubmitting: boolean;
};

export function DecisionForm({ onSubmit, isSubmitting }: DecisionFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 100,
      payee: 'Acme Corp',
      customerId: `CUST${Math.floor(1000 + Math.random() * 9000)}`,
    },
  });

  const debouncedSubmit = useDebouncedCallback(onSubmit, 500);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(debouncedSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g. 123.45" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="payee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payee</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Amazon" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer ID</FormLabel>
              <FormControl>
                <Input placeholder="e.g. CUST12345" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={isSubmitting}>
          {isSubmitting ? <Loader /> : 'Get Decision'}
        </Button>
      </form>
    </Form>
  );
}
