import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-content">
                <div className="footer-main">
                    <div className="footer-brand">
                        <span className="footer-logo">D2CMate</span>
                        <p className="footer-tagline">Your D2C business companion</p>
                    </div>
                    <div className="footer-links">
                        <Link href="/terms-and-conditions" className="footer-link">
                            Terms & Conditions
                        </Link>
                        <span className="footer-divider">•</span>
                        <Link href="/privacy-policy" className="footer-link">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © {new Date().getFullYear()} D2CMate. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
