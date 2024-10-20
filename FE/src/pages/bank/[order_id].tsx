import Layout from '@/components/layout/layout';
import Navbar from '@/components/Navbar/navbar';

import { Button, Card, Input, Dialog, DialogHeader, DialogBody } from '@material-tailwind/react'
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import axios, { AxiosResponse } from 'axios'
import { BackendAPIResponse } from '@/components/assets/model'
import { IoCloseSharp } from 'react-icons/io5';
import { doRsa, signatureKeyGenerator } from '@/components/utils';

interface IResponse {
    status: 'success' | 'error' | 'closed';
    header: string;
    message: string;
}

interface IReqBody {
    order_id: string;
    gross_amount: string;
    card_number: string;
    card_month_expire: string;
    card_year_expire: string;
    card_cvc: string;
    signature_key: string;
    transfer_msg: string;
}

const defaultResponse: IResponse = {
    status: 'closed',
    header: '',
    message: ''
}

export default function BankIndexPage() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [formResponse, setFormResponse] = useState(defaultResponse);
    const [cardNumber, setCardNumber] = useState<string>('');
    const [cardMonth, setCardMonth] = useState<string>('');
    const [cardYear, setCardYear] = useState<string>('');
    const [cardCvc, setCardCvc] = useState<string>('');
    
    const router = useRouter();
    const grossAmount = '100000';
    const content = signatureKeyGenerator(cardNumber, cardMonth, cardYear, cardCvc, grossAmount, router.query.order_id as string);
    const encryptContent = doRsa.encrypt(content);
    const encryptCardNumber = doRsa.encrypt(cardNumber);
    const encryptedCardMonth = doRsa.encrypt(cardMonth);
    const encryptedCardYear = doRsa.encrypt(cardYear);
    const encryptedCardCvc = doRsa.encrypt(cardCvc);

    const handleDialog = (res: IResponse) => {
        if(res.status === 'closed' || !res) setDialogOpen(false);
        else setDialogOpen(true);
        setFormResponse(res);
    };

    async function handleSubmit(event: FormEvent) {
        try {
            event.preventDefault();

            const data: IReqBody = {
                order_id: (router.query.order_id as string),
                gross_amount: grossAmount,
                card_number: encryptCardNumber,
                card_month_expire: encryptedCardMonth,
                card_year_expire: encryptedCardYear,
                card_cvc: encryptedCardCvc,
                signature_key: encryptContent,
                transfer_msg: 'payment for complaint'
            }

            const result: AxiosResponse<BackendAPIResponse> = await axios.post(
                `${process.env.NEXT_PUBLIC_BE_URL || 'http://localhost:4000'}/bank/transfer`,
                data
            );

            if(result.status === 201) {
                handleDialog({
                    status: 'success',
                    header: 'payment successful',
                    message: 'please kindly wait while our doctor checked your form'
                });

                setCardNumber('');
                setCardMonth('');
                setCardYear('');
                setCardCvc('');
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

    return (
        <Layout title='Payment'>
            <main>
                <Navbar />
                <div className='min-h-screen w-full h-screen bg-white px-[20%] py-20'>
                    <h3 className='ptm-h3 text-black font-bold text-center'>Pembayaran</h3>

                    <div className='flex justify-center items-center rounded-xl m-1 p-3'>
                        <Card color='transparent' shadow={false}>
                            <form className='mt-4 mb-2 w-96 max-w-screen-lg sm:w-96 bg-white shadow-lg shadow-black/10 rounded-2xl p-5' onSubmit={handleSubmit}>
                                <div className='mb-1 flex flex-col gap-3 text-black'>
                                    <p>Card Number</p>
                                    <Input label='card number' variant='outlined' value={cardNumber as string} onChange={(e) => setCardNumber(e.target.value)} crossOrigin={undefined}></Input>
                                    
                                    <p>Card Month Expire</p>
                                    <Input label='card month' className='px-2' value={cardMonth as string} onChange={(e) => setCardMonth(e.target.value)} crossOrigin={undefined}></Input>

                                    <p>Card Year Expire</p>
                                    <Input label='card year' className='px-2' value={cardYear as string} onChange={(e) => setCardYear(e.target.value)} crossOrigin={undefined}></Input>

                                    <p>Card CVC</p>
                                    <Input label='card cvc' className='px-2' value={cardCvc as string} onChange={(e) => setCardCvc(e.target.value)} crossOrigin={undefined}></Input>
                                    
                                    <Button className='flex mt-6 w-full' fullWidth type='submit'>
                                    <span className=' w-full text-center text-white'>Kirim</span>
                                    </Button>
                                </div>
                            </form>
                        </Card>
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
                </div>
            </main>
        </Layout>
    )
}