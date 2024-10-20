import { useRouter } from 'next/router';
import Layout from '@/components/layout/layout';
import Navbar from '@/components/Navbar/navbar';
import { useEffect, useState } from 'react';

import axios, { AxiosResponse } from 'axios'
import { BackendAPIResponse } from '@/components/assets/model'
import { doRsa } from '@/components/utils';

enum PaymentStatus {
    PAID = 'PAID',
    PENDING = 'PENDING',
    FAILED = 'FAILED',
    CANCELED = 'CANCELED'
}

interface ITransferDetail {
    id: string;
    order_id: string;
    gross_amount: string;
    card_number: string;
    card_month_expire: string;
    card_year_expire: string;
    payment_status: PaymentStatus;
    card_cvc: string;
    transfer_msg: string;
    created_at: string;
    updated_at: string;
}

export default function DoctorComplaintPage() {
    const router = useRouter();
    const [transferDetail, setTransferDetail] = useState<ITransferDetail | null>(null);

    const payment_id = router.query.payment_id;

    useEffect(() => {
        let ignore = false;
        async function getDetail() {
            const abortController = new AbortController();
            try {
                setTransferDetail(null);
                const result: AxiosResponse<BackendAPIResponse> = await axios.get(
                    `${process.env.NEXT_PUBLIC_BE_URL || 'http://localhost:4000'}/bank/transfer/${router.query.payment_id}`, {
                        signal: abortController.signal
                    }
                );
                if(!ignore) {
                    if(result.status === 200) {
                        const getData = result.data.data as ITransferDetail;
                        let newData = getData;
                        newData.card_number = doRsa.decrypt(getData.card_number);
                        setTransferDetail(newData);
                    } else {
                        setTransferDetail(null);
                    }
                }
            } catch(error: any) {
                console.log(error);
                setTransferDetail(null);
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
            transferDetail === null
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
            <Layout title='Payment Detail'>
                <main>
                    <Navbar />

                    <div className='min-h-screen h-auto px-[3%] pt-16 bg-white'>
                        <div className='flex flex-row justify-between pt-6 pb-3'>
                            <h3 className='ptm-h3 text-left text-black font-bold'>{`Payment ID: ${payment_id}`}</h3>
                            <div className='flex h-full items-center justify-center'>
                                {
                                    transferDetail.payment_status === 'PAID'
                                    ?
                                    <span className=' bg-green-900 text-white font-bold ptm-p3 py-3 px-5 rounded-xl'>{transferDetail.payment_status}</span>
                                    :
                                    transferDetail.payment_status === 'PENDING'
                                    ?
                                    <span className=' bg-yellow-900 text-white font-bold ptm-p3 py-3 px-5 rounded-xl'>{transferDetail.payment_status}</span>
                                    :
                                    <span className=' bg-red-900 text-white font-bold ptm-p3 py-3 px-5 rounded-xl'>{transferDetail.payment_status}</span>
                                }
                            </div>
                        </div>
                        <div className=' flex flex-row items-start gap-1'>
                            <div className=' rounded-xl bg-blue-gray-50 m-1 w-full p-3'>
                                <h4 className='ptm-h4 text-gray-900 text-center py-3'>Detail Pembayaran</h4>
                                <div className='bg-blue-gray-100 rounded-xl mx-[10%] p-3'>
                                    <table className=' text-left text-black ptm-p3 w-full border border-transparent border-separate border-spacing-5'>
                                        <tbody>
                                            <tr>
                                                <th className=' w-[30%]'>Order Id</th>
                                                <th className='w-auto pr-5'>:</th>
                                                <th className=' w-[70%]'>{transferDetail.order_id}</th>
                                            </tr>
                                            <tr>
                                                <th className=' w-[30%]'>Jumlah Pembayaran</th>
                                                <th className='w-auto pr-5'>:</th>
                                                <th className=' w-[70%]'>{transferDetail.gross_amount}</th>
                                            </tr>
                                            <tr>
                                                <th className=' w-[30%]'>Nomor Kartu</th>
                                                <th className='w-auto pr-5'>:</th>
                                                <th className=' w-[70%]'>{transferDetail.card_number}</th>
                                            </tr>
                                            <tr>
                                                <th className=' w-[30%]'>Waktu Pembayaran</th>
                                                <th className='w-auto pr-5'>:</th>
                                                <th className=' w-[70%]'>{transferDetail.created_at}</th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </Layout>
        }
        </>
    )
}