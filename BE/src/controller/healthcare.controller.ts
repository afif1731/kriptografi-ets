import { type NextFunction, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CustomResponse} from '../middleware';
import { type IPatchComplaint, type ICreateComplaint } from '../model';
import { HealthCareService } from '../service';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const HealthCareController = {
    async createComplaint(request: Request, response: Response, next: NextFunction) {
        try {
            const data = await HealthCareService.createComplaint(request.body as ICreateComplaint);

            const result = new CustomResponse(StatusCodes.CREATED, 'create complaint successfully', data);

            return response.status(result.code).json(result.toJSON());
        } catch (error: any) {
            return next(error);
          }
    },

    async getComplaintList(request: Request, response: Response, next: NextFunction) {
        try {
            const data = await HealthCareService.getComplaintList();

            const result = new CustomResponse(StatusCodes.OK, 'get complaint list success', data);

            return response.status(result.code).json(result.toJSON());
        } catch (error: any) {
            return next(error);
          }
    },

    async getComplaintById(request: Request, response: Response, next: NextFunction) {
        try {
            const data = await HealthCareService.getComplaintById(request.params.complaint_id);

            const result = new CustomResponse(StatusCodes.OK, 'get complaint by id success', data);

            return response.status(result.code).json(result.toJSON());
        } catch (error: any) {
            return next(error);
          }
    },

    async updateComplaint(request: Request, response: Response, next: NextFunction) {
        try {
            const data = await HealthCareService.updateComplaint(request.params.complaint_id, request.body as IPatchComplaint);

            const result = new CustomResponse(StatusCodes.OK, 'complaint updated successfully', data);

            return response.status(result.code).json(result.toJSON());
        } catch (error: any) {
            return next(error);
          }
    },

    async deleteComplaint(request: Request, response: Response, next: NextFunction) {
        try {
            await HealthCareService.deleteComplaint(request.params.complaint_id);

            const result = new CustomResponse(StatusCodes.OK, 'complaint deleted successfully');

            return response.status(result.code).json(result.toJSON());
        } catch (error: any) {
            return next(error);
          }
    },

    async getMedicineList(request: Request, response: Response, next: NextFunction) {
        try {
            const data = await HealthCareService.getMedicineList();

            const result = new CustomResponse(StatusCodes.OK, 'get medicine list success', data);

            return response.status(result.code).json(result.toJSON());
        } catch (error: any) {
            return next(error);
          }
    },

    async getMedicineById(request: Request, response: Response, next: NextFunction) {
        try {
            const data = await HealthCareService.getMedicineDetail(request.params.medicine_id);

            const result = new CustomResponse(StatusCodes.OK, 'get medicine by id success', data);

            return response.status(result.code).json(result.toJSON());
        } catch (error: any) {
            return next(error);
          }
    }
}