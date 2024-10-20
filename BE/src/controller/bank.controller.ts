import { type NextFunction, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CustomResponse} from '../middleware';
import { type ICreateTransfer } from '../model';
import { BankService } from '../service';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BankController = {
    async createTransfer(request: Request, response: Response, next: NextFunction) {
        try {
            await BankService.createTransfer(request.body as ICreateTransfer);

            const result = new CustomResponse(StatusCodes.CREATED, 'create transfer successfully');

            return response.status(result.code).json(result.toJSON());
        } catch (error: any) {
            return next(error);
          }
    },

    async getTransferList(request: Request, response: Response, next: NextFunction) {
        try {
            const data = await BankService.getTransferList();

            const result = new CustomResponse(StatusCodes.OK, 'get medicine list success', data);

            return response.status(result.code).json(result.toJSON());
        } catch (error: any) {
            return next(error);
          }
    },

    async getTransferById(request: Request, response: Response, next: NextFunction) {
        try {
            const data = await BankService.getTransferDetail(request.params.transfer_id);

            const result = new CustomResponse(StatusCodes.OK, 'get medicine detail success', data);

            return response.status(result.code).json(result.toJSON());
        } catch (error: any) {
            return next(error);
          }
    },

    async deleteTransfer(request: Request, response: Response, next: NextFunction) {
        try {
            await BankService.deleteTransfer(request.params.transfer_id);

            const result = new CustomResponse(StatusCodes.OK, 'delete transfer successfully');

            return response.status(result.code).json(result.toJSON());
        } catch (error: any) {
            return next(error);
          }
    }
}