import Link from 'next/link';

export default function PrivacyPolicy() {
    return (
        <div className="policy-page">
            <header className="policy-header">
                <div className="policy-header-content">
                    <Link href="/" className="policy-back-link">← Back to Home</Link>
                    <h1 className="policy-title">Privacy Policy</h1>
                    <p className="policy-updated">Last updated: March 2026</p>
                </div>
            </header>

            <main className="policy-content">
                <section className="policy-section">
                    <h2>1. Information We Collect</h2>
                    <p>We may collect the following types of information when you use D2CMate:</p>
                    <ul>
                        <li><strong>Usage Data:</strong> Information about how you interact with the Service, including pages visited, features used, and time spent on the app.</li>
                        <li><strong>Device Information:</strong> Device type, operating system, and unique device identifiers for analytics and ad personalization.</li>
                        <li><strong>Contact Information:</strong> Name, email, and phone number only if you voluntarily submit them through the Contact Us form.</li>
                    </ul>
                </section>

                <section className="policy-section">
                    <h2>2. How We Use Your Information</h2>
                    <ul>
                        <li>To provide and maintain the Service, including HSN code search and GST calculator tools.</li>
                        <li>To improve and optimize the user experience.</li>
                        <li>To display relevant advertisements through Google AdMob.</li>
                        <li>To respond to your inquiries submitted through the contact form.</li>
                    </ul>
                </section>

                <section className="policy-section">
                    <h2>3. Advertising</h2>
                    <p>
                        D2CMate uses Google AdMob to display advertisements. AdMob may use cookies, device identifiers, and other technologies to serve personalized ads based on your interests. You can opt out of personalized advertising through your device settings.
                    </p>
                    <p>
                        For more information on how Google uses data, visit{' '}
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="policy-link">Google&apos;s Privacy Policy</a>.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>4. Data Storage & Security</h2>
                    <p>
                        We do not store any personal data on our servers unless you submit information through the Contact Us form. We implement reasonable security measures to protect the information we collect.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>5. Third-Party Services</h2>
                    <p>Our Service may use the following third-party services that collect information:</p>
                    <ul>
                        <li><strong>Google AdMob</strong> — For serving advertisements</li>
                        <li><strong>Google Analytics</strong> — For usage analytics (if applicable)</li>
                    </ul>
                    <p>Each third-party service has its own privacy policy governing their use of your data.</p>
                </section>

                <section className="policy-section">
                    <h2>6. Children&apos;s Privacy</h2>
                    <p>
                        D2CMate is not intended for use by children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us so we can take appropriate action.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>7. Your Rights</h2>
                    <ul>
                        <li>You can request deletion of any personal information submitted through the contact form.</li>
                        <li>You can opt out of personalized ads through your device&apos;s ad settings.</li>
                        <li>You can stop using the Service at any time.</li>
                    </ul>
                </section>

                <section className="policy-section">
                    <h2>8. Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>9. Contact Us</h2>
                    <p>
                        If you have questions or concerns about this Privacy Policy, please contact us at{' '}
                        <a href="mailto:sagarmagare.dev@gmail.com" className="policy-link">sagarmagare.dev@gmail.com</a>.
                    </p>
                </section>
            </main>
        </div>
    );
}
