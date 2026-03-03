"use client";

import { useState } from "react";
import Link from "next/link";
import { calculateGST, GSTResponse } from "@/src/services/gst";

export default function GSTCalculator() {
    const [amount, setAmount] = useState<string>("");
    const [rate, setRate] = useState<number>(18); // Default 18%
    const [type, setType] = useState<"exclusive" | "inclusive">("exclusive");

    const [result, setResult] = useState<GSTResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleCalculate = async () => {
        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) return;

        setIsLoading(true);
        const data = await calculateGST(Number(amount), rate, type);
        setResult(data);
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-gray-500 hover:text-gray-900 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                        <h1 className="text-xl font-semibold text-gray-900">
                            GST Calculator
                        </h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow max-w-3xl w-full mx-auto px-4 py-8">

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">

                    {/* Amount Input */}
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Original Amount (₹)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="e.g. 1000"
                                className="w-full pl-10 pr-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder-gray-400"
                            />
                        </div>
                    </div>

                    {/* Type Selection (Inclusive / Exclusive) */}
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-700 mb-2">GST Type</label>
                        <div className="flex bg-gray-100 p-1 rounded-xl">
                            <button
                                onClick={() => setType("exclusive")}
                                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${type === "exclusive"
                                        ? "bg-white text-gray-900 shadow-sm"
                                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                    }`}
                            >
                                Exclusive (Add GST)
                            </button>
                            <button
                                onClick={() => setType("inclusive")}
                                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${type === "inclusive"
                                        ? "bg-white text-gray-900 shadow-sm"
                                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                    }`}
                            >
                                Inclusive (Remove GST)
                            </button>
                        </div>
                    </div>

                    {/* GST Rate Selection */}
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-700 mb-2">GST Rate (%)</label>
                        <div className="flex gap-2 flex-wrap">
                            {[0, 0.25, 3, 5, 12, 18, 28].map((r) => (
                                <button
                                    key={r}
                                    onClick={() => setRate(r)}
                                    className={`px-4 py-2 border rounded-xl text-sm font-medium transition-all ${rate === r
                                            ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                                            : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                                        }`}
                                >
                                    {r}%
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Calculate Button */}
                    <button
                        onClick={handleCalculate}
                        disabled={!amount || isLoading}
                        className="w-full py-4 bg-emerald-600 text-white rounded-xl font-semibold text-lg shadow-sm hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <span className="animate-pulse">Calculating...</span>
                        ) : (
                            "Calculate GST"
                        )}
                    </button>

                </div>

                {/* Results Visuals */}
                {result && result.success && (
                    <div className="mt-8 bg-white border border-emerald-100 rounded-2xl overflow-hidden shadow-sm">
                        <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100">
                            <h3 className="text-emerald-800 font-semibold text-lg text-center">Calculation Summary</h3>
                        </div>
                        <div className="p-6 md:p-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">

                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                    <p className="text-sm text-gray-500 font-medium mb-1">Base Price</p>
                                    <p className="text-2xl font-bold text-gray-900">₹{result.data.basePrice}</p>
                                </div>

                                <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                                    <p className="text-sm text-amber-600 font-medium mb-1">Total Tax ({result.data.rate}%)</p>
                                    <p className="text-2xl font-bold text-amber-700">₹{result.data.taxAmount}</p>
                                    <div className="mt-2 pt-2 border-t border-amber-200 flex justify-between text-xs font-medium text-amber-700/80">
                                        <span>CGST: ₹{result.data.cgst}</span>
                                        <span>SGST: ₹{result.data.sgst}</span>
                                    </div>
                                </div>

                                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                                    <p className="text-sm text-emerald-600 font-medium mb-1">Total Amount</p>
                                    <p className="text-2xl font-bold text-emerald-700">₹{result.data.totalAmount}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}
