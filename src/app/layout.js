import { getSettings } from '@/utils/lib/settings';
import ClientProviders from './ClientProviders';
import { DM_Sans, Poppins } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../public/scss/main.css';
import ToastProvider from '@/components/ToastProvider';
import 'rc-slider/assets/index.css';
import 'remixicon/fonts/remixicon.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--body-font-family',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--title-font-family',
});

export default async function RootLayout({ children }) {
  const settings = await getSettings();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Home Zone Real Estate",
    "image": "https://www.homzzone.com/images/header-logo2.svg",
    "@id": "https://www.homzzone.com/#organization",
    "url": "https://www.homzzone.com",
    "telephone": "+91-9855515783",
    "email": "support@homezone.com",
    "priceRange": "₹₹ - ₹₹₹₹",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Patiala",
      "addressRegion": "Punjab",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 30.3753,
      "longitude": 76.4528
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:30",
        "closes": "19:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/homezone",
      "https://www.instagram.com/homezone"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={`body ${poppins.variable} ${dmSans.variable}`} cz-shortcut-listen="false">
        <ToastProvider position="top-center" marginTop="80px" />
        <ClientProviders settings={settings}>{children}</ClientProviders>
      </body>
    </html>
  );
}
