import { processEncoding, type EncodingResult } from '$lib/charset';
import type { Actions } from '@sveltejs/kit';


export const actions: Actions = {
    default: async ({ request }): Promise<EncodingResult> => {
        const formData = await request.formData();
        const inputData = formData.get('inputData') as string;

        if (!inputData) {
            return {
                originalData: '',
                detectedEncoding: 'unknown',
                decodedData: '',
            };
        }

        return await processEncoding(inputData);
    }
};
