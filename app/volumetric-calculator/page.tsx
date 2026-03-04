"use client";

import { useState } from "react";
import Link from "next/link";
import { calculateVolumetricWeight, VolumetricResponse } from "@/src/services/volumetric";

const SHIPPING_TYPES = [
    { value: 5000, label: "Domestic Air/Express", color: "#2563eb" },
    { value: 4000, label: "International Couriers", color: "#7c3aed" },
    { value: 6000, label: "Surface/Ground Shipping", color: "#059669" },
];

export default function VolumetricCalculator() {
    const [length, setLength] = useState<string>("");
    const [breadth, setBreadth] = useState<string>("");
    const [height, setHeight] = useState<string>("");
    const [actualWeight, setActualWeight] = useState<string>("");
    const [divisor, setDivisor] = useState<number>(5000);

    const [result, setResult] = useState<VolumetricResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleCalculate = async () => {
        if (!length || !breadth || !height || !actualWeight) return;
        if ([length, breadth, height, actualWeight].some(v => isNaN(Number(v)) || Number(v) <= 0)) return;

        setIsLoading(true);
        const data = await calculateVolumetricWeight(
            Number(length), Number(breadth), Number(height), Number(actualWeight), divisor
        );
        setResult(data);
        setIsLoading(false);
    };

    const isValid = length && breadth && height && actualWeight &&
        ![length, breadth, height, actualWeight].some(v => isNaN(Number(v)) || Number(v) <= 0);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'sans-serif' }}>
            {/* Header */}
            <header style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', padding: '16px 24px', position: 'sticky', top: 0, zIndex: 10, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Link href="/" style={{ color: '#374151', textDecoration: 'none', fontSize: '20px' }}>
                        ←
                    </Link>
                    <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: 0 }}>
                        Volumetric Weight Calculator
                    </h1>
                </div>
            </header>

            {/* Main Content */}
            <main style={{ maxWidth: '700px', margin: '0 auto', padding: '32px 16px' }}>

                <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>

                    {/* Dimensions */}
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
                            Package Dimensions (cm)
                        </label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Length</label>
                                <input
                                    type="number"
                                    value={length}
                                    onChange={(e) => setLength(e.target.value)}
                                    placeholder="cm"
                                    style={{ width: '100%', padding: '12px', fontSize: '16px', border: '1px solid #d1d5db', borderRadius: '10px', outline: 'none', color: '#111827', boxSizing: 'border-box' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Breadth</label>
                                <input
                                    type="number"
                                    value={breadth}
                                    onChange={(e) => setBreadth(e.target.value)}
                                    placeholder="cm"
                                    style={{ width: '100%', padding: '12px', fontSize: '16px', border: '1px solid #d1d5db', borderRadius: '10px', outline: 'none', color: '#111827', boxSizing: 'border-box' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Height</label>
                                <input
                                    type="number"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    placeholder="cm"
                                    style={{ width: '100%', padding: '12px', fontSize: '16px', border: '1px solid #d1d5db', borderRadius: '10px', outline: 'none', color: '#111827', boxSizing: 'border-box' }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actual Weight */}
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                            Actual Weight (grams)
                        </label>
                        <input
                            type="number"
                            value={actualWeight}
                            onChange={(e) => setActualWeight(e.target.value)}
                            placeholder="Enter weight in grams e.g. 500"
                            style={{ width: '100%', padding: '12px 16px', fontSize: '16px', border: '1px solid #d1d5db', borderRadius: '10px', outline: 'none', color: '#111827', boxSizing: 'border-box' }}
                        />
                    </div>

                    {/* Shipping Type */}
                    <div style={{ marginBottom: '28px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
                            Shipping Type
                        </label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {SHIPPING_TYPES.map((type) => (
                                <label key={type.value} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '15px', fontWeight: '500', color: '#111827', padding: '10px 14px', borderRadius: '10px', border: `1px solid ${divisor === type.value ? type.color : '#e5e7eb'}`, backgroundColor: divisor === type.value ? `${type.color}08` : '#fff', transition: 'all 0.2s' }}>
                                    <input
                                        type="radio"
                                        name="shippingType"
                                        value={type.value}
                                        checked={divisor === type.value}
                                        onChange={() => setDivisor(type.value)}
                                        style={{ width: '18px', height: '18px', accentColor: type.color }}
                                    />
                                    <span>{type.label}</span>
                                    <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#9ca3af', fontWeight: '400' }}>÷ {type.value}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Calculate Button */}
                    <button
                        onClick={handleCalculate}
                        disabled={!isValid || isLoading}
                        style={{
                            width: '100%', padding: '14px', backgroundColor: '#2563eb', color: '#fff',
                            border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '700',
                            cursor: !isValid || isLoading ? 'not-allowed' : 'pointer',
                            opacity: !isValid || isLoading ? 0.5 : 1,
                        }}
                    >
                        {isLoading ? "Calculating..." : "Calculate Volumetric Weight"}
                    </button>

                </div>

                {/* Results */}
                {result && result.success && (
                    <div style={{ marginTop: '32px', backgroundColor: '#fff', border: '2px solid #2563eb', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                        <div style={{ backgroundColor: '#2563eb', padding: '16px', textAlign: 'center' }}>
                            <h3 style={{ margin: 0, color: '#fff', fontSize: '18px', fontWeight: '700' }}>Calculation Result</h3>
                        </div>
                        <div style={{ padding: '24px' }}>
                            {/* Dimensions */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e5e7eb' }}>
                                <span style={{ fontSize: '15px', fontWeight: '600', color: '#111827' }}>Dimensions</span>
                                <span style={{ fontSize: '15px', fontWeight: '700', color: '#111827' }}>{result.data.lengthCm} × {result.data.breadthCm} × {result.data.heightCm} cm</span>
                            </div>
                            {/* Shipping Type */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e5e7eb' }}>
                                <span style={{ fontSize: '15px', fontWeight: '600', color: '#111827' }}>Shipping Type</span>
                                <span style={{ fontSize: '15px', fontWeight: '500', color: '#6b7280' }}>{result.data.shippingType}</span>
                            </div>
                            {/* Actual Weight */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e5e7eb' }}>
                                <span style={{ fontSize: '15px', fontWeight: '600', color: '#111827' }}>Actual Weight</span>
                                <span style={{ fontSize: '15px', fontWeight: '700', color: '#111827' }}>{result.data.actualWeightGrams} g</span>
                            </div>
                            {/* Volumetric Weight */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e5e7eb' }}>
                                <span style={{ fontSize: '15px', fontWeight: '600', color: '#111827' }}>Volumetric Weight</span>
                                <span style={{ fontSize: '15px', fontWeight: '700', color: '#b45309' }}>{result.data.volumetricWeightGrams} g</span>
                            </div>
                            {/* Chargeable Weight */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0 4px', borderTop: '2px solid #2563eb', marginTop: '4px' }}>
                                <span style={{ fontSize: '17px', fontWeight: '700', color: '#2563eb' }}>Chargeable Weight</span>
                                <span style={{ fontSize: '17px', fontWeight: '800', color: '#2563eb' }}>{result.data.chargeableWeightGrams} g</span>
                            </div>
                            {/* Charged By */}
                            <div style={{ textAlign: 'center', marginTop: '12px' }}>
                                <span style={{ fontSize: '13px', fontWeight: '500', color: '#6b7280', backgroundColor: '#f3f4f6', padding: '4px 12px', borderRadius: '999px' }}>
                                    Charged by: {result.data.chargedBy}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}
