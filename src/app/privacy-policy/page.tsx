
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="container py-12 md:py-24 lg:py-32">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <div className="space-y-4">
          <p>
            This is a placeholder for your Privacy Policy. You should replace this with your own policy.
          </p>
          <p>
            A privacy policy is a statement or a legal document that discloses some or all of the ways a party
            gathers, uses, discloses, and manages a customer or client's data. It fulfills a legal requirement to
            protect a customer or client's privacy.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
