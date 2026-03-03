const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://d2cmate-backend.onrender.com/api';

export interface GSTCalculationData {
    basePrice: number;
    taxAmount: number;
    totalAmount: number;
    cgst: number;
    sgst: number;
    rate: number;
    type: string;
}

export interface GSTResponse {
    success: boolean;
    data: GSTCalculationData;
    error?: string;
}

export const calculateGST = async (amount: number, rate: number, type: 'inclusive' | 'exclusive'): Promise<GSTResponse> => {
    try {
        const response = await fetch(`${API_URL}/gst/calculate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount, rate, type }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to calculate GST:', error);
        return {
            success: false,
            data: { basePrice: 0, taxAmount: 0, totalAmount: 0, cgst: 0, sgst: 0, rate: 0, type: '' },
            error: 'Failed to connect to the server'
        };
    }
};
