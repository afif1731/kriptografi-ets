export interface ICreateTransfer {
    order_id: string;
    gross_amount: string;
    card_number: string;
    card_month_expire: string;
    card_year_expire: string;
    card_cvc: string;
    signature_key: string;
    transfer_msg: string;
}