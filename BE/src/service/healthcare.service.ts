import { HealthCareRepository } from '../repository';
import { ICreateComplaint, IPatchComplaint } from '../model';
import { CustomError } from '../middleware';
import { StatusCodes } from 'http-status-codes';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const HealthCareService = {
    async createComplaint(data: ICreateComplaint) {
        try {
            const result = await HealthCareRepository.createComplaint(data);

            return result;
        } catch(error: any) {
            throw error;
        }
    },

    async getComplaintList() {
        try {
            const result = await HealthCareRepository.getComplaintList();

            return result;
        } catch(error: any) {
            throw error;
        }
    },

    async getComplaintById(id: string) {
        try {
            const result = await HealthCareRepository.getComplaintById(id);

            if(!result) throw new CustomError(StatusCodes.NOT_FOUND, 'complaint not found');

            return result
        } catch(error: any) {
            throw error;
        }
    },

    async updateComplaint(id: string, data: IPatchComplaint) {
        try {
            const isExist = await HealthCareRepository.getComplaintById(id);

            if(!isExist) throw new CustomError(StatusCodes.NOT_FOUND, 'complaint not found');

            if(data.medicine_id) {
                const medicine = await HealthCareRepository.getMedicineDetail(data.medicine_id);

                if(!medicine) throw new CustomError(StatusCodes.BAD_REQUEST, 'medicine does not exist')
            }

            const result = await HealthCareRepository.updateComplaint(id, data);

            return result;
        } catch(error: any) {
            throw error;
        }
    },

    async deleteComplaint(id: string) {
        try {
            const isExist = await HealthCareRepository.getComplaintById(id);

            if(!isExist) throw new CustomError(StatusCodes.NOT_FOUND, 'complaint not found');

            await HealthCareRepository.deleteComplaint(id);
        } catch(error: any) {
            throw error;
        } 
    },

    async getMedicineList() {
        try {
            const result = await HealthCareRepository.getMedicineList();

            return result;
        } catch(error: any) {
            throw error;
        }
    },

    async getMedicineDetail(id: string) {
        try {
            const result = await HealthCareRepository.getMedicineDetail(id);

            if(!result) throw new CustomError(StatusCodes.NOT_FOUND, 'medicine not found');

            return result;
        } catch(error: any) {
            throw error;
        }
    }
}