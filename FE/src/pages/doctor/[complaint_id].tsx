import { useRouter } from 'next/router';
import Layout from '@/components/layout/layout';
import Navbar from '@/components/Navbar/navbar';
import { FormEvent, useEffect, useState } from 'react';

import axios, { AxiosResponse } from 'axios'
import { BackendAPIResponse } from '@/components/assets/model'
import { Button, Card, Input, Select, Dialog, DialogHeader, DialogBody, Option } from '@material-tailwind/react'

import { IoCloseSharp } from 'react-icons/io5';
import { doAES } from '@/components/utils';

enum ComplaintStatus {
    UNSOLVED = 'UNSOLVED',
    SOLVED = 'SOLVED',
    PARTIAL = 'PARTIAL'
}

interface IComplaintDetail {
    id: string;
    name: string;
    phone: string;
    address: string;
    complaint: string;
    status: ComplaintStatus;
    diagnose?: string;
    doctor_msg?: string;
    medicine_id?: string;
    created_at?: string;
    updated_at?: string;
    medicine?: {
        id: string;
        name: string;
        price: number;
        img_link: string;
        description?: string;
        created_at: string;
        updated_at: string;
    }
}

interface IReqBody {
    status?: ComplaintStatus | undefined;
    diagnose?: string | undefined;
    doctor_msg?: string | undefined;
    medicine_id?: string | undefined;
}

interface IResponse {
    status: 'success' | 'error' | 'closed';
    header: string;
    message: string;
}

  const defaultResponse: IResponse = {
    status: 'closed',
    header: '',
    message: ''
  }

export default function DoctorComplaintPage() {
    const router = useRouter();
    const [complaintDetail, setComplaintDetail] = useState<IComplaintDetail | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [diagnose, setDiagnose] = useState<string | undefined>(undefined);
    const [doctorMsg, setDoctorMsg] = useState<string | undefined>(undefined);
    const [updatedStatus, setUpdatedStatus] = useState<ComplaintStatus | undefined>(undefined);
    const [selectMedicine, setSelectMedicine] = useState<string | undefined>(undefined);
    const [formResponse, setFormResponse] = useState(defaultResponse);

    const complaint_id = router.query.complaint_id;

    const handleDialog = (res: IResponse) => {
        if(res.status === 'closed' || !res) setDialogOpen(false);
        else setDialogOpen(true);
        setFormResponse(res);
    };

    async function handleSubmit(event: FormEvent) {
        try {
            event.preventDefault();
            const data: IReqBody = {
                status: updatedStatus,
                diagnose: diagnose,
                doctor_msg: doctorMsg,
                medicine_id: selectMedicine
            }

            const result: AxiosResponse<BackendAPIResponse> = await axios.patch(
                `${process.env.NEXT_PUBLIC_BE_URL || 'http://localhost:4000'}/healthcare/complaint/${router.query.complaint_id}/`,
                data
            );

            if(result.status === 200) {
                handleDialog({
                    status: 'success',
                    header: 'Complaint had been updated',
                    message: 'please kindly check if there are any mistake left'
                });

                setUpdatedStatus(undefined);
                setDiagnose(undefined);
                setDoctorMsg(undefined);
                setSelectMedicine(undefined);
            } else {
                handleDialog({
                    status: 'error',
                    header: 'failed to send your form',
                    message: result.data?.message || ''
                });
            }
        } catch(error: any) {
            handleDialog({
              status: 'error',
              header: 'failed to send your form',
              message: String(error)
            });
          }
    }

    useEffect(() => {
        let ignore = false;
        async function getDetail() {
            const abortController = new AbortController();
            try {
                setComplaintDetail(null);
                const result: AxiosResponse<BackendAPIResponse> = await axios.get(
                    `${process.env.NEXT_PUBLIC_BE_URL || 'http://localhost:4000'}/healthcare/complaint/${router.query.complaint_id}`, {
                        signal: abortController.signal
                    }
                );
                if(!ignore) {
                    if(result.status === 200) {
                        const getData = result.data.data as IComplaintDetail;
                        let newData = getData;
                        newData.name = doAES.decrypt(getData.name);
                        newData.address = doAES.decrypt(getData.address);
                        newData.phone = doAES.decrypt(getData.phone);
                        newData.complaint = doAES.decrypt(getData.complaint);
                        setComplaintDetail(newData);
                    } else {
                        setComplaintDetail(null);
                    }
                }
            } catch(error: any) {
                console.log(error);
                setComplaintDetail(null);
            }
        }

        getDetail();
        return () => {
            ignore = true;
        }
    }, [router.query]);

    return (
        <>
        {
            complaintDetail === null
            ?
            <Layout title='Not Found'>
                <main>
                    <Navbar />
                    <div className='min-h-screen w-full h-screen bg-white'>
                        <div className='flex flex-col w-full h-full justify-center items-center text-center'>
                            <h1 className='ptm-h1 font-extrabold'>404</h1>
                            <p className='ptm-h4'>Page Not Found</p>
                        </div>
                    </div>
                </main>
            </Layout>
            :
            <Layout title='Complaint Detail'>
                <main>
                    <Navbar />

                    <div className='min-h-screen h-auto px-[3%] pt-16 bg-white'>
                        <div className='flex flex-row justify-between pt-6 pb-3'>
                            <h3 className='ptm-h3 text-left text-black font-bold'>{`Complaint ID: ${complaint_id}`}</h3>
                            <div className='flex h-full items-center justify-center'>
                                {
                                    complaintDetail.status === 'SOLVED'
                                    ?
                                    <span className=' bg-green-900 text-white font-bold ptm-p3 py-3 px-5 rounded-xl'>{complaintDetail.status}</span>
                                    :
                                    complaintDetail.status === 'PARTIAL'
                                    ?
                                    <span className=' bg-yellow-900 text-white font-bold ptm-p3 py-3 px-5 rounded-xl'>{complaintDetail.status}</span>
                                    :
                                    <span className=' bg-red-900 text-white font-bold ptm-p3 py-3 px-5 rounded-xl'>{complaintDetail.status}</span>
                                }
                            </div>
                        </div>
                        <div className=' flex flex-row items-start gap-1'>
                            <div className=' rounded-xl bg-blue-gray-50 m-1 w-[70%] p-3'>
                                <h4 className='ptm-h4 text-gray-900 text-center py-3'>Identitas Pasien</h4>
                                <div className='bg-blue-gray-100 rounded-xl mx-[10%] p-3'>
                                    <table className=' text-left text-black ptm-p3 w-full border border-transparent border-separate border-spacing-5'>
                                        <tbody>
                                            <tr>
                                                <th className=' w-[30%]'>Nama</th>
                                                <th className='w-auto pr-5'>:</th>
                                                <th className=' w-[70%]'>{complaintDetail.name}</th>
                                            </tr>
                                            <tr>
                                                <th className=' w-[30%]'>No. Telp</th>
                                                <th className='w-auto pr-5'>:</th>
                                                <th className=' w-[70%]'>{complaintDetail.phone}</th>
                                            </tr>
                                            <tr>
                                                <th className=' w-[30%]'>Alamat</th>
                                                <th className='w-auto pr-5'>:</th>
                                                <th className=' w-[70%]'>{complaintDetail.address}</th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <h4 className='ptm-h4 text-gray-900 text-center pt-5 pb-3'>Komplain</h4>
                                <div className='bg-blue-gray-100 rounded-xl mx-[10%] p-3'>
                                    <p className=' ptm-p3'>{complaintDetail.complaint}</p>
                                </div>

                                <h4 className='ptm-h4 text-gray-900 text-center pt-5 pb-3'>Respon Dokter</h4>
                                <div className='bg-blue-gray-100 rounded-xl mx-[10%] p-3'>
                                    <table className=' text-left text-black ptm-p3 w-full border border-transparent border-separate border-spacing-5'>
                                        <tbody>
                                            <tr>
                                                <th className=' w-[30%]'>Diagnosis</th>
                                                <th className='w-auto pr-5'>:</th>
                                                <th className=' w-[70%]'>{complaintDetail.diagnose || '-'}</th>
                                            </tr>
                                            <tr>
                                                <th className=' w-[30%]'>Pesan Dokter</th>
                                                <th className='w-auto pr-5'>:</th>
                                                <th className=' w-[70%]'>{complaintDetail.doctor_msg || '-'}</th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <h4 className='ptm-h4 text-gray-900 text-center pt-5 pb-3'>Saran Obat</h4>
                                <div className='flex flex-row bg-blue-gray-100 rounded-xl mx-[10%] p-3 gap-3'>
                                    {
                                        complaintDetail.medicine &&
                                        <>
                                        <img src={complaintDetail.medicine.img_link} alt={complaintDetail.medicine.name} className='w-[250px] h-auto rounded-xl object-cover'></img>
                                        <div className=' flex items-center'>
                                            <table className=' text-left text-black ptm-p3 w-full items-start border border-transparent border-separate border-spacing-5'>
                                                <tbody>
                                                    <tr>
                                                        <th className=' w-[30%]'>Nama</th>
                                                        <th className='w-auto pr-5'>:</th>
                                                        <th className=' w-[70%]'>{complaintDetail.medicine.name}</th>
                                                    </tr>
                                                    <tr>
                                                        <th className=' w-[30%]'>Harga</th>
                                                        <th className='w-auto pr-5'>:</th>
                                                        <th className=' w-[70%]'>{`Rp ${complaintDetail.medicine.price}`}</th>
                                                    </tr>
                                                    <tr>
                                                        <th className=' w-[30%]'>Deskripsi</th>
                                                        <th className='w-auto pr-5 items-start'>:</th>
                                                        <th className=' w-[70%]'>{complaintDetail.medicine.description || '-'}</th>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        </>
                                    }
                                </div>
                            </div>

                            <div className=' flex flex-col justify-start gap-3 w-[30%]'>
                                <div className=' rounded-xl bg-blue-gray-50 m-1 p-3'>
                                    <Card color='transparent' shadow={false}>
                                        <form className='mt-4 mb-2 w-96 max-w-screen-lg sm:w-96 bg-white rounded-2xl p-5' onSubmit={handleSubmit}>
                                        <div className='mb-1 flex flex-col gap-3 text-black'>
                                            <p>Diagnosis</p>
                                            <Input label='diagnosis' variant='outlined' value={diagnose as string} onChange={(e) => setDiagnose(e.target.value)} crossOrigin={undefined}></Input>
                                            
                                            <p>Pesan Dokter</p>
                                            <Input label='pesan dokter' className='px-2' value={doctorMsg as string} onChange={(e) => setDoctorMsg(e.target.value)} crossOrigin={undefined}></Input>
                                            
                                            <p>Status</p>
                                            <Select label='status diagnosis' value={updatedStatus} onChange={(e) => setUpdatedStatus(e as ComplaintStatus)}>
                                                <Option value={ComplaintStatus.PARTIAL}>{ComplaintStatus.PARTIAL}</Option>
                                                <Option value={ComplaintStatus.SOLVED}>{ComplaintStatus.SOLVED}</Option>
                                                <Option value={ComplaintStatus.UNSOLVED}>{ComplaintStatus.UNSOLVED}</Option>
                                            </Select>
                                            
                                            <Button className='flex mt-6 w-full' fullWidth type='submit'>
                                            <span className=' w-full text-center text-white'>Kirim</span>
                                            </Button>
                                        </div>
                                        </form>
                                    </Card>
                                </div>

                                <div className=' rounded-xl bg-blue-gray-50 m-1 p-3'>
                                    <h4 className='ptm-h4 text-gray-900 text-center py-3'>Pilih Obat</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Dialog
                            open= {dialogOpen}
                            size='lg'
                            handler={handleDialog}
                            className=' bg-white min-h-[40vh] rounded-2xl'
                        >
                            <div className='h-full min-h-[40vh] items-start rounded-2xl px-8'>
                                <div className='flex flex-row justify-between items-start'>
                                    <DialogHeader className='flex text-black w-[80%]'>
                                        <p className='lg:ptm-h2 ptm-h4'>
                                            {
                                                formResponse.header
                                            }
                                        </p>
                                    </DialogHeader>
                                    <button onClick={() => handleDialog(defaultResponse)} className='p-5'>
                                        <IoCloseSharp className=' text-black size-16' />
                                    </button>
                                </div>
                                <DialogBody className=' text-black text-left'>
                                    <p className='ptm-p4'>
                                        {
                                            formResponse.message
                                        }
                                    </p>
                                </DialogBody>
                            </div>
                        </Dialog>
                    </div>
                </main>
            </Layout>
        }
        </>
    )
}