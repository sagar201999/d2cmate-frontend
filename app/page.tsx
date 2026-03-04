import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
    return (
        <div className="page-wrapper min-h-screen bg-gray-50 font-sans">
            {/* Header with Logo */}
            <header className="w-full bg-white shadow-sm py-4 px-6 flex items-center justify-between border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <Image
                        src="/logo-1.png"
                        alt="D2CMate Logo"
                        width={120}
                        height={40}
                        className="object-contain"
                        priority
                    />
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-6 py-12 flex flex-col items-center">

                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Merchant Tools Portal</h1>
                    <p className="text-lg text-gray-600">
                        Access essential D2C calculators and search utilities below.
                    </p>
                </div>

                {/* Tools Menu Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">

                    {/* HSN Code Search Card */}
                    <Link href="/hsn-search" className="group">
                        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 p-8 h-full flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">HSN Code Search</h2>
                            <p className="text-gray-500 flex-grow">
                                Search and find HSN codes easily. Look up product categories, descriptions, and their applicable GST rates.
                            </p>
                            <div className="mt-6 text-blue-600 font-medium group-hover:underline">
                                Open Tool &rarr;
                            </div>
                        </div>
                    </Link>

                    {/* GST Calculator Card */}
                    <Link href="/gst-calculator" className="group">
                        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 p-8 h-full flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">GST Rate Calculator</h2>
                            <p className="text-gray-500 flex-grow">
                                Compute tax components. Input a price to instantly calculate inclusive or exclusive GST amounts.
                            </p>
                            <div className="mt-6 text-emerald-600 font-medium group-hover:underline">
                                Open Tool &rarr;
                            </div>
                        </div>
                    </Link>

                    {/* Volumetric Weight Calculator Card */}
                    <Link href="/volumetric-calculator" className="group">
                        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 p-8 h-full flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Volumetric Weight</h2>
                            <p className="text-gray-500 flex-grow">
                                Calculate volumetric weight from package dimensions. Compare with actual weight to find chargeable weight.
                            </p>
                            <div className="mt-6 text-orange-600 font-medium group-hover:underline">
                                Open Tool &rarr;
                            </div>
                        </div>
                    </Link>

                </div>
            </main>
        </div>
    );
}
