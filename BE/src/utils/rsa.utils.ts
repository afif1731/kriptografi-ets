const RSA_KEY = {
    N: process.env.RSA_N as string,
    E: process.env.RSA_E as string,
    D: process.env.RSA_D as string
}

const nKey = BigInt(RSA_KEY.N);
const eKey = BigInt(RSA_KEY.E.slice(0, -1));
const dKey = BigInt(RSA_KEY.D);

function modularExponentiation(base: bigint, exponent: bigint, modulus: bigint) {
    let result = BigInt(1);
    base = base % modulus;
    while (exponent > 0) {
        if (exponent % 2n === 1n) {
            result = (result * base) % modulus;
        }
        exponent = exponent / 2n;
        base = (base * base) % modulus;
    }
    return result;
}

function stringToBigInt(str: string) {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(str);
    let result = BigInt(0);
    for (let i = 0; i < bytes.length; i++) {
        result = (result << 8n) + BigInt(bytes[i]);
    }
    return result;
}

function bigIntToString(bigInt: bigint) {
    let bytes = [];
    while (bigInt > 0n) {
        bytes.unshift(Number(bigInt & 0xFFn));
        bigInt >>= 8n;
    }
    const decoder = new TextDecoder();
    return decoder.decode(new Uint8Array(bytes));
}

export const doRsa = {
    encrypt(plaintext: string): string {
        const textInBigInt = stringToBigInt(plaintext);
        const result = modularExponentiation(textInBigInt, eKey, nKey);
        return result.toString(16);
    },

    decrypt(chiperText: string) {
        const chiperInBigInt = BigInt('0x'+chiperText);
        const result = modularExponentiation(chiperInBigInt, dKey, nKey);
        return bigIntToString(result);
    }
}