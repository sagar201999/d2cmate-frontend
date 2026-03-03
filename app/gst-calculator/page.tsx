"use client";

import { useState } from "react";
import Link from "next/link";
import { calculateGST, GSTResponse } from "@/src/services/gst";

export default function GSTCalculator() {
    const [amount, setAmount] = useState<string>("");
    const [rate, setRate] = useState<string>("");
    const [type, setType] = useState<"exclusive" | "inclusive">("exclusive");

    const [result, setResult] = useState<GSTResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleCalculate = async () => {
        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) return;
        if (!rate || isNaN(Number(rate)) || Number(rate) < 0) return;

        setIsLoading(true);
        const data = await calculateGST(Number(amount), Number(rate), type);
        setResult(data);
        setIsLoading(false);
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'sans-serif' }}>
            {/* Header */}
            <header style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', padding: '16px 24px', position: 'sticky', top: 0, zIndex: 10, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Link href="/" style={{ color: '#374151', textDecoration: 'none', fontSize: '20px' }}>
                        ←
                    </Link>
                    <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: 0 }}>
                        GST Calculator
                    </h1>
                </div>
            </header>

            {/* Main Content */}
            <main style={{ maxWidth: '700px', margin: '0 auto', padding: '32px 16px' }}>

                <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>

                    {/* Amount Input */}
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                            Amount (₹)
                        </label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount e.g. 1000"
                            style={{ width: '100%', padding: '12px 16px', fontSize: '16px', border: '1px solid #d1d5db', borderRadius: '10px', outline: 'none', color: '#111827', boxSizing: 'border-box' }}
                        />
                    </div>

                    {/* GST Rate Input */}
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                            GST Rate (%)
                        </label>
                        <input
                            type="number"
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                            placeholder="Enter GST percentage e.g. 18"
                            style={{ width: '100%', padding: '12px 16px', fontSize: '16px', border: '1px solid #d1d5db', borderRadius: '10px', outline: 'none', color: '#111827', boxSizing: 'border-box' }}
                        />
                    </div>

                    {/* Type Selection - Radio Buttons */}
                    <div style={{ marginBottom: '28px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
                            GST Type
                        </label>
                        <div style={{ display: 'flex', gap: '24px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: '500', color: '#111827' }}>
                                <input
                                    type="radio"
                                    name="gstType"
                                    value="exclusive"
                                    checked={type === "exclusive"}
                                    onChange={() => setType("exclusive")}
                                    style={{ width: '18px', height: '18px', accentColor: '#059669' }}
                                />
                                Exclusive (Add GST)
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: '500', color: '#111827' }}>
                                <input
                                    type="radio"
                                    name="gstType"
                                    value="inclusive"
                                    checked={type === "inclusive"}
                                    onChange={() => setType("inclusive")}
                                    style={{ width: '18px', height: '18px', accentColor: '#059669' }}
                                />
                                Inclusive (Remove GST)
                            </label>
                        </div>
                    </div>

                    {/* Calculate Button */}
                    <button
                        onClick={handleCalculate}
                        disabled={!amount || !rate || isLoading}
                        style={{
                            width: '100%', padding: '14px', backgroundColor: '#059669', color: '#fff',
                            border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '700',
                            cursor: !amount || !rate || isLoading ? 'not-allowed' : 'pointer',
                            opacity: !amount || !rate || isLoading ? 0.5 : 1,
                        }}
                    >
                        {isLoading ? "Calculating..." : "Calculate GST"}
                    </button>

                </div>

                {/* Results */}
                {result && result.success && (
                    <div style={{ marginTop: '32px', backgroundColor: '#fff', border: '2px solid #059669', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                        <div style={{ backgroundColor: '#059669', padding: '16px', textAlign: 'center' }}>
                            <h3 style={{ margin: 0, color: '#fff', fontSize: '18px', fontWeight: '700' }}>Calculation Result</h3>
                        </div>
                        <div style={{ padding: '24px' }}>
                            {/* Result Rows */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e5e7eb' }}>
                                <span style={{ fontSize: '15px', fontWeight: '600', color: '#111827' }}>Base Price</span>
                                <span style={{ fontSize: '15px', fontWeight: '700', color: '#111827' }}>₹{result.data.basePrice}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e5e7eb' }}>
                                <span style={{ fontSize: '15px', fontWeight: '600', color: '#111827' }}>Total Tax ({result.data.rate}%)</span>
                                <span style={{ fontSize: '15px', fontWeight: '700', color: '#b45309' }}>₹{result.data.taxAmount}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e5e7eb' }}>
                                <span style={{ fontSize: '15px', fontWeight: '600', color: '#111827' }}>CGST ({result.data.rate / 2}%)</span>
                                <span style={{ fontSize: '15px', fontWeight: '700', color: '#111827' }}>₹{result.data.cgst}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e5e7eb' }}>
                                <span style={{ fontSize: '15px', fontWeight: '600', color: '#111827' }}>SGST ({result.data.rate / 2}%)</span>
                                <span style={{ fontSize: '15px', fontWeight: '700', color: '#111827' }}>₹{result.data.sgst}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0 4px', borderTop: '2px solid #059669', marginTop: '4px' }}>
                                <span style={{ fontSize: '17px', fontWeight: '700', color: '#059669' }}>Total Amount</span>
                                <span style={{ fontSize: '17px', fontWeight: '800', color: '#059669' }}>₹{result.data.totalAmount}</span>
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '12px' }}>
                                <span style={{ fontSize: '13px', fontWeight: '500', color: '#6b7280', backgroundColor: '#f3f4f6', padding: '4px 12px', borderRadius: '999px' }}>
                                    Type: {result.data.type === 'inclusive' ? 'Inclusive (GST included in price)' : 'Exclusive (GST added to price)'}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}
