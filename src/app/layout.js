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

  return (
    <html lang="en">
      <body className={`body ${poppins.variable} ${dmSans.variable}`} cz-shortcut-listen="false">
        <ToastProvider position="top-center" marginTop="80px" />
        <ClientProviders settings={settings}>{children}</ClientProviders>
      </body>
    </html>
  );
}
