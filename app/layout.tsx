// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import Header from './components/Header';
import LoadingHandler from '@/app/components/LoadingHandler'; // Import the client-side component

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Clerk App',
  description: 'Example Clerk App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <main className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center min-h-screen">
              <LoadingHandler>
                <div className="mt-20">{children}</div>
              </LoadingHandler>
            </div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
