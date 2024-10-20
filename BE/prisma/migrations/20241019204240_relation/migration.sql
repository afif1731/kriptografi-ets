-- AddForeignKey
ALTER TABLE "Complaint" ADD CONSTRAINT "Complaint_medicine_id_fkey" FOREIGN KEY ("medicine_id") REFERENCES "Medicine"("id") ON DELETE SET NULL ON UPDATE CASCADE;
