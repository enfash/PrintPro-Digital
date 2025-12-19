
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-slate-50 text-center py-20 px-4">
        <div>
          <h1 className="text-6xl md:text-8xl font-black text-primary-600 tracking-tighter">404</h1>
          <h2 className="mt-2 text-2xl md:text-4xl font-bold text-slate-800">Page Not Found</h2>
          <p className="mt-4 text-slate-600 max-w-md mx-auto">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          <div className="mt-8">
            <Button asChild>
              <Link href="/">
                ← Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
