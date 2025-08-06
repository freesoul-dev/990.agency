'use server';

import { z } from 'zod';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters long.' }),
});

export async function submitContactFormResend(prevState: any, formData: FormData) {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please correct the errors below.',
    };
  }

  const { name, email, message } = validatedFields.data;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <noreply@990.agency>', // Replace with your verified domain
      to: ['hello@990.agency'],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>This message was sent from the contact form on your website.</small></p>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Message: ${message}
        
        This message was sent from the contact form on your website.
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return {
        message: 'Sorry, there was an error sending your message. Please try again later.',
        errors: {},
      };
    }

    return {
      message: 'Thank you for your message! We will get back to you soon.',
      errors: {},
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      message: 'Sorry, there was an error sending your message. Please try again later.',
      errors: {},
    };
  }
} 