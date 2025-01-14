import * as iconv from 'iconv-lite';


export interface EncodingResult {
    originalData: string;
    detectedEncoding: string;
    decodedData: string;
}

/**
 * Обработва входните данни, като ги декодира в UTF-8.
 * @param rawData - Входни данни като текст.
 * @returns {EncodingResult} - Резултат с оригиналния текст, предполагаемата кодировка и декодирания текст.
 */
export async function processEncoding(rawData: string): Promise<EncodingResult> {
    const bufferData = Buffer.from(rawData, 'binary');

    // Пробваме с различни кодировки, ако разпознаване не е налично.
    const encodings = ['utf-8', 'windows-1251', 'iso-8859-1'];

    let detectedEncoding = 'utf-8';
    let decodedData = rawData;

    for (const encoding of encodings) {
        try {
            decodedData = iconv.decode(bufferData, encoding);
            detectedEncoding = encoding;
            break;
        } catch {
            // Ако не успее, преминаваме към следващата кодировка
            continue;
        }
    }

    return {
        originalData: rawData,
        detectedEncoding,
        decodedData,
    };
}
