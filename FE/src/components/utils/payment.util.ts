const TRANSFER_KEY = process.env.NEXT_PUBLIC_TRANSFER_KEY || 'hamburger';

export function signatureKeyGenerator(cardNumber: string, cardMonth: string, cardYear: string, cardCvc: string, grossAmount: string, order_id: string) {
    return `${cardNumber}${cardMonth}${cardYear}${cardCvc}${grossAmount}${order_id}${TRANSFER_KEY}`;
}