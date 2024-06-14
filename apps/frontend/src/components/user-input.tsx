'use client';

import { typeboxResolver } from '@hookform/resolvers/typebox';
import { useForm } from 'react-hook-form';
import { Type, Static } from '@sinclair/typebox';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const TFormSchema = Type.Object({ post: Type.String() });

export default function UserInput() {
  const form = useForm<Static<typeof TFormSchema>>({
    resolver: typeboxResolver(TFormSchema),
  });

  function onSubmit(data: Static<typeof TFormSchema>) {
    toast('You submitted the following values:', {
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-2/3 space-y-6'>
        <FormField
          control={form.control}
          name='post'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder='Send the first post!'
                  className='resize-y text-lg'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='text-foreground/85 text-lg w-20'>
          Post
        </Button>
      </form>
    </Form>
  );
}
