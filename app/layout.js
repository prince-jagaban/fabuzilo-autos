// src/app/layout.js

import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
});

export const metadata = {
  title: 'FABUZILO AUTOS',
  description: 'Luxury Cars, EVs, and SUVs for Sale',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-gradient-to-br from-white to-gray-100 text-gray-800`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
