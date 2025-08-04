'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { submitContactForm } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full rounded-none bg-black text-white hover:bg-neutral-800" disabled={pending}>
      {pending ? 'Sending...' : 'Send'}
    </Button>
  );
}

export default function ContactForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useActionState(submitContactForm, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      if (state.errors && Object.keys(state.errors).length > 0) {
        toast({
          title: 'Error',
          description: state.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: state.message,
        });
      }
    }
  }, [state, toast]);

  const inputStyles = "font-headSecondary bg-white border focus-visible:ring-1 focus-visible:ring-black";

  return (
    <form action={dispatch} className="space-y-4">
      <div className="space-y-1 font-headSecondary">
        <Input id="name" name="name" placeholder="Name" required className={inputStyles} />
        {state.errors?.name && <p className="text-sm text-destructive">{state.errors.name.join(', ')}</p>}
      </div>
      <div className="space-y-1 font-headSecondary">
        <Input id="email" name="email" type="email" placeholder="Email" required className={inputStyles} />
        {state.errors?.email && <p className="text-sm text-destructive">{state.errors.email.join(', ')}</p>}
      </div>
      <div className="space-y-1 font-headSecondary">
        <Textarea id="message" name="message" placeholder="What's up?" required className={inputStyles} rows={5} />
        {state.errors?.message && <p className="text-sm text-destructive">{state.errors.message.join(', ')}</p>}
      </div>
      <SubmitButton />
    </form>
  );
}
