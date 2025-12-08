
import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

const TermsOfService: React.FC = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 bg-slate-50 pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Terms of Service</h1>
                        <p className="text-sm text-slate-500 mb-8">Last updated: December 2025</p>

                        <div className="prose prose-slate max-w-none">
                            <p className="text-lg text-slate-700 mb-6">
                                By engaging <strong>Broad Options Media (BOMedia)</strong> or submitting artwork for printing, you agree to the terms below.
                            </p>

                            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Our Services</h2>
                            <p className="text-slate-600 mb-6">
                                BOMedia specialises in <strong>large-format printing</strong>, including banners, self-adhesive vinyl (SAV), window graphics, wall branding, and related custom print materials.
                            </p>

                            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Artwork & Design Responsibility</h2>
                            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                                <li>Customers are responsible for providing <strong>correct, print-ready artwork</strong>.</li>
                                <li>All files are reviewed and must be approved <strong>before printing begins</strong>.</li>
                                <li>Once artwork is approved, BOMedia is <strong>not responsible</strong> for spelling errors, layout issues, or incorrect content supplied by the customer.</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Colour Variation Disclaimer</h2>
                            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                                <li>Printed output may vary slightly from on-screen colours due to materials, ink behaviour, and lighting.</li>
                                <li>Exact colour matching is not guaranteed unless previously discussed and agreed in writing.</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Turnaround Time</h2>
                            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                                <li>Production timelines begin <strong>only after artwork approval and payment confirmation</strong>.</li>
                                <li>Turnaround estimates may change based on job size, finishing, or workload.</li>
                                <li>Same-day or urgent jobs must be clearly stated beforehand.</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Payment Terms</h2>
                            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                                <li>Payment (full or agreed percentage) is required <strong>before production starts</strong>.</li>
                                <li>Jobs will not be printed without confirmed payment and approved artwork.</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Refunds & Reprints</h2>
                            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                                <li>All printing jobs are customised. <strong>Refunds are not available once production begins</strong>.</li>
                                <li>If an error is confirmed to be from BOMedia, a reprint may be offered at our discretion.</li>
                                <li>Any approved refund is limited strictly to the printing cost.</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Delivery & Installation</h2>
                            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                                <li>Printing and installation are separate unless explicitly stated.</li>
                                <li>BOMedia is not responsible for damage after delivery or installation by third parties.</li>
                                <li>Delivery timelines within Lagos depend on location and logistics availability.</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Limitation of Liability</h2>
                            <p className="text-slate-600 mb-6">
                                BOMedia's maximum liability is limited to <strong>reprinting the affected job</strong>.
                                We are not liable for indirect losses such as missed promotions, events, or business downtime.
                            </p>

                            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Changes to These Terms</h2>
                            <p className="text-slate-600 mb-6">
                                BOMedia may update these terms periodically. The latest version will always be available on our website.
                            </p>

                            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Contact</h2>
                            <p className="text-slate-600">
                                For questions regarding these Terms, contact:{' '}
                                <a href="mailto:info@bomedia.ng" className="text-primary-700 hover:text-primary-800 font-medium">
                                    info@bomedia.ng
                                </a>
                            </p>
                        </div>

                        <div className="mt-12 pt-8 border-t border-slate-200">
                            <Link
                                href="/"
                                className="inline-flex items-center text-primary-700 hover:text-primary-800 font-medium"
                            >
                                ← Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TermsOfService;
