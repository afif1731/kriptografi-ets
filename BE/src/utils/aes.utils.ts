import { AES, enc } from 'crypto-js';
const AES_KEY = process.env.AES_KEY || 'your-secret-key'

export const doAES = {
    decrypt(encryptedText: string): string {
        const bytes = AES.decrypt(encryptedText, AES_KEY);
        const plaintext = bytes.toString(enc.Utf8);
        return plaintext;
    },

    encrypt(plaintext: string): string {
        const encryptedText = AES.encrypt(plaintext, AES_KEY).toString();
        return encryptedText;
    }
}