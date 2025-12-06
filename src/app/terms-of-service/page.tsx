
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <main className="container py-12 md:py-24 lg:py-32">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <div className="space-y-4">
          <p>
            This is a placeholder for your Terms of Service. You should replace this with your own terms.
          </p>
          <p>
            Terms of service (also known as terms of use and terms and conditions, commonly abbreviated as ToS or
            T&C, T's and C's or Ts and Cs) are the legal agreements between a service provider and a person who
            wants to use that service. The person must agree to abide by the terms of service in order to use
            the offered service.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
