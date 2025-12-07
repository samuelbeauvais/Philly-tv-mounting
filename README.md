# Philly TV Mounting - Business Website

A professional website for a TV mounting service business in Philadelphia. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Homepage** - Eye-catching hero section with service overview and call-to-action
- **Services Page** - Interactive service selection with real-time pricing calculator
  - Radio button selection for mounting services (only one can be selected)
  - Checkbox selection for add-ons and additional services
  - Live price calculation as services are selected
- **Booking System** - Full-featured appointment scheduling
  - Calendar integration with date picker
  - Time slot selection (9 AM - 9 PM)
  - Complete contact form
  - Integration with selected services from pricing calculator
  - Confirmation page
- **Photo Gallery** - Portfolio showcase with category filtering and lightbox view
- **Contact Page** - Contact form with FAQ section
- **Responsive Design** - Fully mobile-responsive across all pages
- **API Routes** - Backend endpoints for storing bookings and messages
- **Data Storage** - File-based storage system (easily upgradeable to database)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Headless UI, Heroicons
- **Calendar:** React DatePicker
- **Data Storage:** JSON file-based (lib/data/)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd philly-tv-mounting
```

2. Install dependencies (if not already installed):
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
philly-tv-mounting/
├── app/
│   ├── api/              # API routes
│   │   ├── bookings/     # Booking endpoints
│   │   └── contact/      # Contact form endpoints
│   ├── booking/          # Booking page
│   ├── contact/          # Contact page
│   ├── gallery/          # Photo gallery
│   ├── services/         # Services & pricing
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Homepage
│   └── globals.css       # Global styles
├── components/
│   └── Navigation.tsx    # Site navigation
├── lib/
│   ├── storage.ts        # Data storage utilities
│   └── data/             # JSON data files
├── public/
│   └── images/           # Image assets
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── next.config.js        # Next.js configuration
```

## Customization

### Update Business Information

1. **Company Name & Branding:**
   - Edit `app/layout.tsx` for site title and meta description
   - Update `components/Navigation.tsx` for logo/brand name
   - Modify `app/contact/page.tsx` for contact info (phone, email, hours)

2. **Service Pricing:**
   - Edit the `services` array in `app/services/page.tsx`
   - Add, remove, or modify services and prices

3. **Add Your Photos:**
   - Place your installation photos in `/public/images/`
   - Update the `galleryItems` array in `app/gallery/page.tsx`
   - Replace placeholder images with your actual work

4. **Styling/Colors:**
   - Modify `tailwind.config.ts` to change the color scheme
   - Primary blue color can be customized in the theme section

### Adding Email Notifications

The API routes have placeholder comments for email integration. To add email notifications:

1. Install an email service package (e.g., nodemailer, sendgrid)
2. Set up environment variables for email credentials
3. Implement email sending in:
   - `app/api/bookings/route.ts`
   - `app/api/contact/route.ts`

### Upgrading to a Database

The current file-based storage can be upgraded to a database:

1. Install Prisma or your preferred ORM:
```bash
npm install prisma @prisma/client
```

2. Update `lib/storage.ts` to use database queries instead of file operations
3. Create database schema based on the `Booking` and `ContactMessage` interfaces

## Data Management

Booking and contact form submissions are stored in JSON files:
- `/lib/data/bookings.json` - All appointment bookings
- `/lib/data/messages.json` - Contact form submissions

Access the data:
```bash
# View bookings
cat lib/data/bookings.json

# View messages
cat lib/data/messages.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Deploy to Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Traditional VPS (with Node.js)

## SEO Optimization

Consider adding:
- Meta tags for social media (Open Graph, Twitter Cards)
- Structured data (Schema.org) for local business
- Sitemap generation
- Google Analytics integration
- Google Business Profile integration

## Future Enhancements

Potential features to add:
- Admin dashboard for managing bookings
- Email/SMS notifications for appointments
- Online payment integration (Stripe, Square)
- Customer reviews and testimonials
- Service area map
- Before/after photo comparisons
- Blog for SEO content
- Live chat support
- Multi-language support

## Support

For issues or questions about the website code, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React DatePicker](https://reactdatepicker.com/)

## License

This project is created for your business use.
