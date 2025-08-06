# Email Setup for Contact Form

The contact form is now configured to send emails to `hello@990.agency`. You need to set up email credentials to make it work.

## Option 1: Gmail SMTP (Recommended for testing)

1. Create a `.env.local` file in the root directory with the following content:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

2. For Gmail setup:
   - Enable 2-Factor Authentication on your Gmail account
   - Generate an App Password: https://myaccount.google.com/apppasswords
   - Use the App Password as `EMAIL_PASS`

## Option 2: Resend (Recommended for production)

Resend is a modern email API that's easier to set up and more reliable for production.

1. Install Resend:
```bash
npm install resend
```

2. Sign up at https://resend.com and get your API key

3. Create `.env.local`:
```env
RESEND_API_KEY=your-resend-api-key
```

4. Update `src/app/actions.ts` to use Resend instead of nodemailer.

## Option 3: SendGrid

1. Install SendGrid:
```bash
npm install @sendgrid/mail
```

2. Sign up at https://sendgrid.com and get your API key

3. Create `.env.local`:
```env
SENDGRID_API_KEY=your-sendgrid-api-key
```

## Testing

After setting up the email credentials:

1. Restart your development server
2. Fill out the contact form on your website
3. Check if the email is received at `hello@990.agency`

## Security Notes

- Never commit your `.env.local` file to version control
- Use App Passwords instead of your main password for Gmail
- Consider using a dedicated email service like Resend or SendGrid for production
- The `.env.local` file is already in `.gitignore` so it won't be committed 