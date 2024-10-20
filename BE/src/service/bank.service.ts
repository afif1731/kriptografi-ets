import { doRsa } from '../utils/rsa.utils';
import { ICreateTransfer } from '../model';
import { CustomError } from '../middleware';
import { StatusCodes } from 'http-status-codes';
import { BankRepository } from '../repository';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BankService = {
    async createTransfer(data: ICreateTransfer) {
        try {
            const card_number = doRsa.decrypt(data.card_number);
            const card_month_expire = doRsa.decrypt(data.card_month_expire);
            const card_year_expire = doRsa.decrypt(data.card_year_expire);
            const card_cvc = doRsa.decrypt(data.card_cvc);

            const content = `${card_number}${card_month_expire}${card_year_expire}${card_cvc}${data.gross_amount}${data.order_id}${process.env.TRANSFER_KEY || ''}`;
            const encryptContent = doRsa.encrypt(content);

            if(encryptContent !== data.signature_key) throw new CustomError(StatusCodes.BAD_REQUEST, 'invalid signature key');

            await BankRepository.createTransfer(data);
        } catch(error: any) {
            throw error;
        }
    },

    async getTransferList() {
        try {
            const result = await BankRepository.getTransferList();

            return result;
        } catch(error: any) {
            throw error;
        }
    },

    async getTransferDetail(id: string) {
        try {
            const result = await BankRepository.getTransferDetail(id);

            if(!result) throw new CustomError(StatusCodes.NOT_FOUND, 'transfer not found');

            return result;
        } catch(error: any) {
            throw error;
        }
    },

    async deleteTransfer(id: string) {
        try {
            const isExist = await BankRepository.getTransferDetail(id);

            if(!isExist) throw new CustomError(StatusCodes.NOT_FOUND, 'transfer not found');

            await BankRepository.deleteTransfer(id);
        } catch(error: any) {
            throw error;
        }
    }
}