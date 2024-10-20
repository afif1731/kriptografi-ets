import { ComplaintStatus } from '@prisma/client';

export interface IPatchComplaint {
    status?: ComplaintStatus;
    diagnose?: string;
    doctor_msg?: string;
    medicine_id?: string;
}