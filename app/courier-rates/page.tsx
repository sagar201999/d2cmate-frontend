"use client";

import { useState } from "react";
import Link from "next/link";
import { getCourierRates, CourierRatesResponse } from "@/src/services/courier";

export default function CourierRateCalculator() {
    const [fromPincode, setFromPincode] = useState<string>("");
    const [toPincode, setToPincode] = useState<string>("");
    const [weight, setWeight] = useState<string>("");
    const [paymentType, setPaymentType] = useState<string>("prepaid");
    const [length, setLength] = useState<string>("");
    const [breadth, setBreadth] = useState<string>("");
    const [height, setHeight] = useState<string>("");
    const [showDimensions, setShowDimensions] = useState(false);

    const [result, setResult] = useState<CourierRatesResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleCalculate = async () => {
        if (!fromPincode || !toPincode || !weight) return;
        if (!/^\d{6}$/.test(fromPincode) || !/^\d{6}$/.test(toPincode)) return;

        setIsLoading(true);
        const data = await getCourierRates(
            fromPincode, toPincode, Number(weight), paymentType,
            Number(length) || 10, Number(breadth) || 10, Number(height) || 10
        );
        setResult(data);
        setIsLoading(false);
    };

    const isValid = fromPincode && toPincode && weight &&
        /^\d{6}$/.test(fromPincode) && /^\d{6}$/.test(toPincode) &&
        !isNaN(Number(weight)) && Number(weight) > 0;

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'sans-serif' }}>
            {/* Header */}
            <header style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', padding: '16px 24px', position: 'sticky', top: 0, zIndex: 10, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Link href="/" style={{ color: '#374151', textDecoration: 'none', fontSize: '20px' }}>
                        ←
                    </Link>
                    <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: 0 }}>
                        Courier Rate Calculator
                    </h1>
                </div>
            </header>

            {/* Main Content */}
            <main style={{ maxWidth: '700px', margin: '0 auto', padding: '32px 16px' }}>

                {/* Disclaimer */}
                <div style={{ backgroundColor: '#FEF3C7', border: '1px solid #F59E0B', borderRadius: '10px', padding: '12px 16px', marginBottom: '24px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ fontSize: '18px' }}>⚠️</span>
                    <p style={{ fontSize: '13px', color: '#92400E', margin: 0, lineHeight: '1.5' }}>
                        <strong>Note:</strong> These are approximate courier charges for reference only. Actual rates may vary based on your courier partner agreement, volume discounts, and additional surcharges.
                    </p>
                </div>

                <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>

                    {/* Pincodes */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                                From Pincode
                            </label>
                            <input
                                type="text"
                                maxLength={6}
                                value={fromPincode}
                                onChange={(e) => setFromPincode(e.target.value.replace(/\D/g, ''))}
                                placeholder="e.g. 400703"
                                style={{ width: '100%', padding: '12px 16px', fontSize: '16px', border: '1px solid #d1d5db', borderRadius: '10px', outline: 'none', color: '#111827', boxSizing: 'border-box' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                                To Pincode
                            </label>
                            <input
                                type="text"
                                maxLength={6}
                                value={toPincode}
                                onChange={(e) => setToPincode(e.target.value.replace(/\D/g, ''))}
                                placeholder="e.g. 400706"
                                style={{ width: '100%', padding: '12px 16px', fontSize: '16px', border: '1px solid #d1d5db', borderRadius: '10px', outline: 'none', color: '#111827', boxSizing: 'border-box' }}
                            />
                        </div>
                    </div>

                    {/* Weight */}
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                            Weight (kg)
                        </label>
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="e.g. 0.5"
                            step="0.1"
                            style={{ width: '100%', padding: '12px 16px', fontSize: '16px', border: '1px solid #d1d5db', borderRadius: '10px', outline: 'none', color: '#111827', boxSizing: 'border-box' }}
                        />
                    </div>

                    {/* Payment Type */}
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
                            Payment Type
                        </label>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            {['prepaid', 'cod'].map((type) => (
                                <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: '500', color: '#111827', padding: '10px 20px', borderRadius: '10px', border: `1px solid ${paymentType === type ? '#7c3aed' : '#e5e7eb'}`, backgroundColor: paymentType === type ? '#7c3aed08' : '#fff', flex: 1, justifyContent: 'center' }}>
                                    <input
                                        type="radio"
                                        name="paymentType"
                                        value={type}
                                        checked={paymentType === type}
                                        onChange={() => setPaymentType(type)}
                                        style={{ width: '16px', height: '16px', accentColor: '#7c3aed' }}
                                    />
                                    {type === 'prepaid' ? 'Prepaid' : 'COD'}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Optional Dimensions Toggle */}
                    <div style={{ marginBottom: '24px' }}>
                        <button
                            onClick={() => setShowDimensions(!showDimensions)}
                            style={{ background: 'none', border: 'none', color: '#7c3aed', fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: 0 }}
                        >
                            {showDimensions ? '− Hide' : '+ Add'} Package Dimensions (optional)
                        </button>
                        {showDimensions && (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginTop: '12px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Length (cm)</label>
                                    <input type="number" value={length} onChange={(e) => setLength(e.target.value)} placeholder="10"
                                        style={{ width: '100%', padding: '10px', fontSize: '15px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none', color: '#111827', boxSizing: 'border-box' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Breadth (cm)</label>
                                    <input type="number" value={breadth} onChange={(e) => setBreadth(e.target.value)} placeholder="10"
                                        style={{ width: '100%', padding: '10px', fontSize: '15px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none', color: '#111827', boxSizing: 'border-box' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Height (cm)</label>
                                    <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="10"
                                        style={{ width: '100%', padding: '10px', fontSize: '15px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none', color: '#111827', boxSizing: 'border-box' }} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Calculate Button */}
                    <button
                        onClick={handleCalculate}
                        disabled={!isValid || isLoading}
                        style={{
                            width: '100%', padding: '14px', backgroundColor: '#7c3aed', color: '#fff',
                            border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '700',
                            cursor: !isValid || isLoading ? 'not-allowed' : 'pointer',
                            opacity: !isValid || isLoading ? 0.5 : 1,
                        }}
                    >
                        {isLoading ? "Fetching Rates..." : "Get Courier Rates"}
                    </button>
                </div>

                {/* Results */}
                {result && result.success && result.data.rates.length > 0 && (
                    <div style={{ marginTop: '32px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#111827' }}>
                                Available Couriers
                            </h3>
                            <span style={{ fontSize: '13px', color: '#6b7280' }}>
                                {result.data.fromPincode} → {result.data.toPincode} | {result.data.weight} kg | {result.data.paymentType}
                            </span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {result.data.rates.map((rate, index) => (
                                <div key={rate.carrierId} style={{
                                    backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb',
                                    padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                                }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                            {index === 0 && <span style={{ fontSize: '11px', fontWeight: '700', color: '#fff', backgroundColor: '#059669', padding: '2px 8px', borderRadius: '4px' }}>CHEAPEST</span>}
                                            <span style={{ fontSize: '15px', fontWeight: '600', color: '#111827' }}>{rate.courierName}</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#6b7280' }}>
                                            <span>Charged: {rate.chargedWeight} kg</span>
                                            <span>RTO: ₹{rate.rtoCharge}</span>
                                            <span>Zone: {rate.zone}</span>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '20px', fontWeight: '800', color: '#111827' }}>₹{rate.deliveryCharge}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {result && result.success && result.data.rates.length === 0 && (
                    <div style={{ marginTop: '32px', textAlign: 'center', padding: '40px 20px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                        <p style={{ color: '#6b7280', fontSize: '15px' }}>No courier rates available for this route.</p>
                    </div>
                )}

                {result && !result.success && (
                    <div style={{ marginTop: '32px', textAlign: 'center', padding: '20px', backgroundColor: '#FEF2F2', borderRadius: '12px', border: '1px solid #FCA5A5' }}>
                        <p style={{ color: '#991B1B', fontSize: '14px', margin: 0 }}>{result.error}</p>
                    </div>
                )}
            </main>
        </div>
    );
}
