import Link from 'next/link';

export default function TermsAndConditions() {
    return (
        <div className="policy-page">
            <header className="policy-header">
                <div className="policy-header-content">
                    <Link href="/" className="policy-back-link">← Back to Home</Link>
                    <h1 className="policy-title">Terms & Conditions</h1>
                    <p className="policy-updated">Last updated: March 2026</p>
                </div>
            </header>

            <main className="policy-content">
                <section className="policy-section">
                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        By accessing and using D2CMate (&quot;the Service&quot;), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the Service.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>2. Description of Service</h2>
                    <p>
                        D2CMate provides merchant tools including HSN code search, GST rate calculator, and other utilities designed to assist direct-to-consumer businesses. The Service is provided &quot;as is&quot; for informational purposes.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>3. Use of the Service</h2>
                    <ul>
                        <li>You agree to use the Service only for lawful purposes and in compliance with all applicable laws and regulations.</li>
                        <li>You shall not misuse, disrupt, or interfere with the Service or its infrastructure.</li>
                        <li>You are responsible for ensuring the accuracy of any data you input into the Service.</li>
                    </ul>
                </section>

                <section className="policy-section">
                    <h2>4. Accuracy of Information</h2>
                    <p>
                        While we strive to provide accurate HSN codes, GST rates, and calculation results, D2CMate does not guarantee the accuracy, completeness, or timeliness of any information. Users should verify all tax-related information with official government sources before making business decisions.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>5. Intellectual Property</h2>
                    <p>
                        All content, features, and functionality of the Service — including but not limited to text, graphics, logos, and software — are the property of D2CMate and are protected by intellectual property laws.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>6. Limitation of Liability</h2>
                    <p>
                        D2CMate shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use the Service. This includes any errors in GST calculations or HSN code lookups.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>7. Third-Party Services</h2>
                    <p>
                        The Service may display advertisements provided by third-party ad networks (such as Google AdMob). These third-party services have their own terms and privacy policies, which we encourage you to review.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>8. Modifications to Terms</h2>
                    <p>
                        We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting. Your continued use of the Service after any changes constitutes acceptance of the updated terms.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>9. Contact Us</h2>
                    <p>
                        If you have any questions about these Terms and Conditions, please contact us at{' '}
                        <a href="mailto:sagarmagare.dev@gmail.com" className="policy-link">sagarmagare.dev@gmail.com</a>.
                    </p>
                </section>
            </main>
        </div>
    );
}
