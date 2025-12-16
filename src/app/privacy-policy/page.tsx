
import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 bg-slate-50 pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
                        <p className="text-sm text-slate-500 mb-8">Last updated: July 2024</p>

                        <div className="prose prose-slate max-w-none">
                            <p className="text-lg text-slate-700 mb-6">
                                At <strong>Broad Options Media (BOMedia)</strong>, we respect your privacy and are committed to protecting any personal information you share with us.
                            </p>

                            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Information We Collect</h2>
                            <p className="text-slate-600 mb-4">When you contact BOMedia or request a print job, we may collect:</p>
                            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                                <li>Name and business name</li>
                                <li>Phone number and email address</li>
                                <li>Design files and printing details</li>
                                <li>Delivery or pickup information</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">How We Use Your Information</h2>
                            <p className="text-slate-600 mb-4">We use your information strictly to:</p>
                            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                                <li>Respond to enquiries and provide quotations</li>
                                <li>Process and produce print jobs</li>
                                <li>Communicate artwork approval and job updates</li>
                                <li>Arrange delivery or pickup</li>
                            </ul>
                            <p className="text-slate-700 font-medium mb-6">
                                BOMedia does <strong>not sell or share</strong> customer data for advertising or marketing purposes.
                            </p>

                            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Communication Channels</h2>
                            <p className="text-slate-600 mb-4">We communicate mainly via:</p>
                            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                                <li>WhatsApp</li>
                                <li>Email</li>
                                <li>Phone calls (when necessary)</li>
                            </ul>
                            <p className="text-slate-600 mb-6">
                                Any information shared through these channels is used only for job execution and support.
                            </p>

                            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Data Storage and Security</h2>
                            <p className="text-slate-600 mb-6">
                                We take reasonable steps to protect your files and personal information.
                                Design files may be stored temporarily for job execution or repeat orders.
                            </p>

                            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Your Rights</h2>
                            <p className="text-slate-600 mb-4">You may request to:</p>
                            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                                <li>Access your information</li>
                                <li>Correct inaccurate details</li>
                                <li>Have your data deleted after job completion</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Contact</h2>
                            <p className="text-slate-600">
                                For privacy-related enquiries, contact us at:{' '}
                                <a href="mailto:info@bomedia.com.ng" className="text-primary-700 hover:text-primary-800 font-medium">
                                    info@bomedia.com.ng
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

export default PrivacyPolicy;
