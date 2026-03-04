const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://d2cmate-backend.onrender.com/api';

export interface VolumetricData {
    lengthCm: number;
    breadthCm: number;
    heightCm: number;
    actualWeightGrams: number;
    volumetricWeightGrams: number;
    chargeableWeightGrams: number;
    chargedBy: string;
    divisor: number;
    shippingType: string;
}

export interface VolumetricResponse {
    success: boolean;
    data: VolumetricData;
    error?: string;
}

export const calculateVolumetricWeight = async (
    length: number,
    breadth: number,
    height: number,
    actualWeight: number,
    divisor: number
): Promise<VolumetricResponse> => {
    try {
        const response = await fetch(`${API_URL}/volumetric/calculate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ length, breadth, height, actualWeight, divisor }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to calculate volumetric weight:', error);
        return {
            success: false,
            data: {
                lengthCm: 0, breadthCm: 0, heightCm: 0,
                actualWeightGrams: 0, volumetricWeightGrams: 0, chargeableWeightGrams: 0,
                chargedBy: '', divisor: 0, shippingType: '',
            },
            error: 'Failed to connect to the server',
        };
    }
};
