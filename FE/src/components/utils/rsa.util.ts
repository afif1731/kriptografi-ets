const RSA_KEY = {
    N: process.env.NEXT_PUBLIC_RSA_N as string,
    E: process.env.NEXT_PUBLIC_RSA_E as string,  // Value misalnya '65537n'
    D: process.env.NEXT_PUBLIC_RSA_D as string
}

const nKey = BigInt(RSA_KEY.N);
const eKey = BigInt(RSA_KEY.E.slice(0, -1));  // Menghilangkan 'n'
const dKey = BigInt(RSA_KEY.D);

function modularExponentiation(base: bigint, exponent: bigint, modulus: bigint) {
    let result = BigInt(1);
    base = base % modulus;
    while (exponent > 0) {
        if (exponent % BigInt(2) === BigInt(1)) {
            result = (result * base) % modulus;
        }
        exponent = exponent / BigInt(2);
        base = (base * base) % modulus;
    }
    return result;
}

function stringToBigInt(str: string) {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(str);
    let result = BigInt(0);
    for (let i = 0; i < bytes.length; i++) {
        result = (result << BigInt(8)) + BigInt(bytes[i]);
    }
    return result;
}

function bigIntToString(bigInt: bigint) {
    let bytes = [];
    while (bigInt > BigInt(0)) {
        bytes.unshift(Number(bigInt & BigInt(0xFF)));
        bigInt >>= BigInt(8);
    }
    const decoder = new TextDecoder();
    return decoder.decode(new Uint8Array(bytes));
}

export const doRsa = {
    encrypt(plaintext: string): string {
        const textInBigInt = stringToBigInt(plaintext);
        const result = modularExponentiation(textInBigInt, eKey, nKey);
        return result.toString(16); // Mengembalikan dalam hex
    },

    decrypt(cipherText: string): string {
        const chiperInBigInt = BigInt('0x'+ cipherText);
        const result = modularExponentiation(chiperInBigInt, dKey, nKey);
        return bigIntToString(result);
    }
}
