import { ICreateComplaint, IPatchComplaint } from '../model';
import prisma from '../config/prisma';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const HealthCareRepository = {
    async getComplaintList() {
        return await prisma.complaint.findMany({
            select: {
                id: true,
                status: true,
                name: true
            },
            orderBy: {
                created_at: 'asc'
            }
        });
    },

    async getComplaintById(complaint_id: string) {
        return await prisma.complaint.findFirst({
            where: { id: complaint_id },
            include: {
                medicine: true
            }
        })
    },

    async createComplaint(data: ICreateComplaint) {
        return await prisma.complaint.create({
            data: {
                name: data.name,
                phone: data.phone,
                address: data.address,
                complaint: data.complaint
            },
            select: {
                id: true
            }
        });
    },

    async updateComplaint(complaint_id: string, data: IPatchComplaint) {
        return await prisma.complaint.update({
            where: { id: complaint_id },
            data: {
                status: data.status || undefined,
                diagnose: data.diagnose || undefined,
                doctor_msg: data.doctor_msg || undefined,
                medicine_id: data.medicine_id || undefined
            }
        });
    },

    async deleteComplaint(id: string) {
        await prisma.complaint.delete({
            where: { id }
        });
    },

    async getMedicineList() {
        return await prisma.medicine.findMany({
            select: {
                id: true,
                name: true,
                img_link: true
            },
            orderBy: {
                name: 'asc'
            }
        })
    },

    async getMedicineDetail(id: string) {
        return await prisma.medicine.findFirst({
            where: { id }
        });
    }
}