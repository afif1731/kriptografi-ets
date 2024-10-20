import Layout from '@/components/layout/layout'
import Navbar from '@/components/Navbar/navbar'
import Footer from '@/components/Footer/footer'
import { FormEvent, useState } from 'react'
import { Button, Card, Textarea, Input, Dialog, DialogHeader, DialogBody } from '@material-tailwind/react'
import Image from 'next/image'
import axios, { AxiosResponse } from 'axios'

import DoctorImg from '@/public/images/doctor.png'
import PsychiatristImg from '@/public/images/psychiatrist.png'
import { BackendAPIResponse } from '@/components/assets/model'

import { IoCloseSharp } from 'react-icons/io5';
import { doAES } from '@/components/utils'

interface IComplaintForm {
  name: string;
  address: string;
  phone: string;
  complaint: string;
}

interface IResponse {
  status: 'success' | 'error' | 'closed';
  header: string;
  message: string;
}

const aboutData = {
  message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu rhoncus nunc, efficitur rhoncus augue. In sed pretium massa. Mauris id risus ac purus dignissim fringilla. Morbi tincidunt odio ut justo hendrerit posuere. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum placerat erat nisi, sed lacinia ex semper non.'
}

const defaultResponse: IResponse = {
  status: 'closed',
  header: '',
  message: ''
}

export default function IndexPage() {
  const [address, setAddress] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [complaint, setComplaint] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formResponse, setFormResponse] = useState(defaultResponse);

  const handleDialog = (res: IResponse) => {
      if(res.status === 'closed' || !res) setDialogOpen(false);
      else setDialogOpen(true);
      setFormResponse(res);
  };

  async function handleSubmit(event: FormEvent) {
    try {
      event.preventDefault();
      const data: IComplaintForm = {
        name: doAES.encrypt(userName),
        phone: doAES.encrypt(phone),
        address: doAES.encrypt(address),
        complaint: doAES.encrypt(complaint)
      }

      const result: AxiosResponse<BackendAPIResponse> = await axios.post(
        `${process.env.NEXT_PUBLIC_BE_URL || 'http://localhost:4000'}/healthcare/complaint`,
        data
      );

      if(result.status == 201) {
        handleDialog({
          status: 'success',
          header: 'Thank you for registering!',
          message: `please do your payment in ${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/bank/${result.data.data?.id}`
        });

        setAddress('');
        setUserName('');
        setPhone('');
        setComplaint('');
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
    <Layout title='Home'>
      <main>
        <Navbar />

        <div className='min-h-screen h-auto'>
          <div id='about' className='px-[5%] lg:min-h-screen'>
              <div className=' md:pt-28 pt-24 pb-10'>
                  <h1 className=' ptm-h1 text-center md:px-[10%] px-[6%]'>Welcome to Crypto Health</h1>
              </div>

              <div className='flex flex-col-reverse lg:flex-row lg:gap-10 gap-5 justify-evenly lg:px-0 px-[10%]'>
                  <div className=' flex flex-col w-full'>
                      <div className=' lg:flex hidden flex-col lg:w-[90%] gap-3'>
                          <h3 className='ptm-h3'>Tentang Kami</h3>
                          <h5 className='ptm-h5'>Karena Keamanan dan Kesehatan anda adalah yang Nomor 1</h5>
                      </div>
                      <div className=' py-3 md:text-left text-center'>
                          <p className=' ptm-p'>{aboutData.message}</p>
                      </div>
                  </div>
                  <div className='w-[50%] h-auto rounded-2xl'>
                    <Image src={DoctorImg} alt='Doctor Image' width={512} height={512}></Image>
                  </div>
              </div>
          </div>

          <div id='daftar' className='h-auto pt-5 pb-10 px-[5%] bg-[#DFDFDF] rounded-t-[3rem]'>
            <div className=' text-center'>
                <h1 className=' ptm-h2 px-[6%]'>Punya Keluhan?</h1>
                <p className=' ptm-p4 md:px-[10%] px-[5%] pt-8'>Sampaikan keluhan anda dan dapatkan jawaban dokter Hanya dalam waktu 1 Jam!</p>
            </div>

            <div className='flex flex-row justify-around text-left pt-10'>
              <div className='w-auto h-full rounded-2xl'>
                <Image src={PsychiatristImg} alt='Doctor Image' width={450} height={450}></Image>
              </div>
              <Card color='transparent' shadow={false}>
                <form className='mt-4 mb-2 w-96 max-w-screen-lg sm:w-96 bg-white rounded-2xl p-5' onSubmit={handleSubmit}>
                  <div className='mb-1 flex flex-col gap-3 text-black'>
                    <p>Nama Lengkap</p>
                    <Input label='nama' variant='outlined' value={userName as string} onChange={(e) => setUserName(e.target.value)} crossOrigin={undefined}></Input>
                    
                    <p>Alamat</p>
                    <Input label='alamat' className='px-2' value={address as string} onChange={(e) => setAddress(e.target.value)} crossOrigin={undefined}></Input>
                    
                    <p>Nomor Telepon</p>
                    <Input label='no. telp' className='px-2' value={phone as string} onChange={(e) => setPhone(e.target.value)} crossOrigin={undefined}></Input>

                    <p>Keluhan</p>
                    <Textarea label='keluhan' className='px-2' value={complaint as string} onChange={(e) => setComplaint(e.target.value)} />
                    
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
        </div>
        
        <Footer />
      </main>
    </Layout>
  )
}
