const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://d2cmate-backend.onrender.com/api';

export interface CourierRate {
    carrierId: number;
    courierName: string;
    deliveryCharge: number;
    rtoCharge: number;
    chargedWeight: number;
    zone: number;
}

export interface CourierRatesData {
    fromPincode: string;
    toPincode: string;
    paymentType: string;
    weight: number;
    rates: CourierRate[];
}

export interface CourierRatesResponse {
    success: boolean;
    data: CourierRatesData;
    error?: string;
}

export const getCourierRates = async (
    fromPincode: string,
    toPincode: string,
    weight: number,
    paymentType: string = 'prepaid',
    length: number = 10,
    breadth: number = 10,
    height: number = 10,
): Promise<CourierRatesResponse> => {
    try {
        const response = await fetch(`${API_URL}/courier/rates`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fromPincode, toPincode, weight, paymentType, length, breadth, height }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch courier rates:', error);
        return {
            success: false,
            data: { fromPincode: '', toPincode: '', paymentType: '', weight: 0, rates: [] },
            error: 'Failed to connect to the server',
        };
    }
};
