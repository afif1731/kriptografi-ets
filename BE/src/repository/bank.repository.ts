import { ICreateTransfer } from 'model';
import prisma from '../config/prisma';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BankRepository = {
    async getTransferList() {
        return await prisma.bankTransfer.findMany({
            select: {
                id: true,
                order_id: true,
                payment_status: true,
                gross_amount: true
            }
        });
    },

    async getTransferDetail(id: string) {
        return await prisma.bankTransfer.findFirst({
            where: { id }
        });
    },

    async createTransfer(data: ICreateTransfer) {
        return await prisma.bankTransfer.create({
            data: {
                order_id: data.order_id,
                gross_amount: data.gross_amount,
                card_number: data.card_number,
                card_month_expire: data.card_month_expire,
                card_year_expire: data.card_year_expire,
                card_cvc: data.card_cvc,
                transfer_msg: data.transfer_msg
            }
        })
    },

    async deleteTransfer(id: string) {
        await prisma.bankTransfer.delete({
            where: { id }
        });
    }
}